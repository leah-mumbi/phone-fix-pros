import { useState } from "react";
import Navigation from "@/components/Navigation";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Kitengela Town", "St Monica Road (M-squre Building)", "Kenya"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+254 728 981 575", "+254 740 847 880"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["nzurimobiles@gmail.com.", "mumbileah254@gmail.com.co.ke"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 8:00 AM - 9:00 PM", "Sat: 9:00 AM - 9:00 PM", "Sun: 9:00 AM - 8:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 pb-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or need help with your device? We're here for you. Reach out through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <info.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John James"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+254 700 000 000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Repair Inquiry"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your device issue or inquiry..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="flex flex-col">
              <h2 className="mb-6 text-2xl font-bold text-foreground">Find Us</h2>
              <div className="flex-1 overflow-hidden rounded-2xl border border-border">
                <iframe
                  src="https://www.google.com/maps?q=-1.4740,36.9610&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nzuri Mobiles Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">Have More Questions?</h2>
          <p className="mb-6 text-muted-foreground">
            Check out our frequently asked questions or chat with our support team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" size="lg">
              View FAQ
            </Button>
            <Button size="lg">Start Live Chat</Button>
          </div>
        </div>
      </section>

      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default Contact;
