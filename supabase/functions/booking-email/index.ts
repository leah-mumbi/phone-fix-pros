// Edge Function: booking-email
// Sends booking details via Resend API to the configured recipient.
// Configure environment variables in Supabase:
// - RESEND_API_KEY: your Resend API key
// - BOOKINGS_TO_EMAIL: recipient email (defaults to mumbileah254@gmail.com)
// Usage: supabase.functions.invoke("booking-email", { body: { ...booking } })
// Deno runtime
Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const payload = await req.json();

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const toEmail = Deno.env.get("BOOKINGS_TO_EMAIL") ?? "mumbileah254@gmail.com";

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const {
      tracking_id = "",
      customer_name = "",
      customer_phone = "",
      customer_email = "",
      service_type = "",
      device_model = "",
      issue_description = "",
      booking_date = "",
    } = payload || {};

    const lines = [
      `Tracking ID: ${tracking_id}`,
      `Name: ${customer_name}`,
      `Phone: ${customer_phone}`,
      `Email: ${customer_email || "-"}`,
      `Service: ${service_type}`,
      `Device: ${device_model}`,
      `Issue: ${issue_description}`,
      `Preferred Date: ${booking_date}`,
    ];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bookings <notifications@phone-fix-pros.local>",
        to: [toEmail],
        subject: `New Repair Booking: ${tracking_id}`,
        text: lines.join("\n"),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: "Email send failed", details: errText }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Unexpected error", details: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
