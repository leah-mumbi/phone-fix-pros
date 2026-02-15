import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const formSchema = z.object({
  service_type: z.string().min(1, { message: "Please select a service type" }),
  device_model: z.string().trim().min(2, { message: "Device model must be at least 2 characters" }).max(100, { message: "Device model must be less than 100 characters" }),
  issue_description: z.string().trim().min(10, { message: "Please provide at least 10 characters describing the issue" }).max(1000, { message: "Description must be less than 1000 characters" }),
  booking_date: z.date({ required_error: "Please select a booking date" }),
  customer_name: z.string().trim().min(2, { message: "Please enter your name" }).max(80, { message: "Name must be less than 80 characters" }),
  customer_phone: z.string().trim().min(7, { message: "Please enter a valid phone" }).max(20, { message: "Phone too long" }),
  customer_email: z.string().trim().email({ message: "Invalid email address" }).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const serviceTypes = [
  { value: "screen_repair", label: "Screen Repair" },
  { value: "battery_replacement", label: "Battery Replacement" },
  { value: "water_damage", label: "Water Damage Repair" },
  { value: "charging_port", label: "Charging Port Repair" },
  { value: "software_issues", label: "Software Issues" },
  { value: "other", label: "Other Repairs" },
];

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const preselectedServiceTitle = (location.state as any)?.service ?? "";

  const mapTitleToValue = (title: string) => {
    const t = title.toLowerCase().trim();
    if (!t) return "";
    // try exact or partial matches against labels
    const found = serviceTypes.find((s) => {
      const label = s.label.toLowerCase();
      return label === t || label.includes(t) || t.includes(label) || label.split(" ")[0] === t.split(" ")[0];
    });
    return found ? found.value : "";
  };

  const initialService = useMemo(() => mapTitleToValue(preselectedServiceTitle), [preselectedServiceTitle]);

  const normalizePhone = (raw: string) => {
    const s = raw.replace(/\D/g, "");
    if (s.startsWith("0") && s.length >= 10) return `254${s.slice(1)}`;
    if (s.startsWith("254")) return s;
    if (s.startsWith("2540")) return s.replace(/^2540/, "254");
    if (s.startsWith("7")) return `254${s}`;
    return s;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_type: initialService,
      device_model: "",
      issue_description: "",
      booking_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      customer_name: "",
      customer_phone: "",
      customer_email: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to book a repair service.",
        });
        return;
      }

      // Insert booking
      const { data: inserted, error: insertError } = await supabase
        .from("repair_bookings")
        .insert({
          user_id: user.id,
          service_type: values.service_type,
          device_model: values.device_model,
          issue_description: values.issue_description,
          booking_date: values.booking_date.toISOString(),
          status: "pending",
          customer_name: values.customer_name,
          customer_phone: normalizePhone(values.customer_phone),
          customer_email: values.customer_email || null,
        })
        .select()
        .limit(1);

      if (insertError) {
        throw insertError;
      }

      const booking = inserted?.[0];
      if (booking) {
        await supabase.functions.invoke("booking-email", {
          body: {
            tracking_id: booking.tracking_id,
            customer_name: values.customer_name,
            customer_phone: normalizePhone(values.customer_phone),
            customer_email: values.customer_email || "",
            service_type: values.service_type,
            device_model: values.device_model,
            issue_description: values.issue_description,
            booking_date: values.booking_date.toISOString(),
          },
        });
      }

      toast({
        title: "Booking submitted successfully!",
        description: "We'll contact you soon to confirm your repair appointment.",
      });

      form.reset();
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "There was an error submitting your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the type of repair service you need
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="device_model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Model</FormLabel>
              <FormControl>
                <Input placeholder="e.g., iPhone 14 Pro, Samsung Galaxy S23" {...field} />
              </FormControl>
              <FormDescription>
                Enter your device brand and model
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="issue_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the issue with your device..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide detailed information about the problem
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="booking_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preferred Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select your preferred appointment date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Booking Request"
          )}
        </Button>
      </form>
    </Form>
  );
}
