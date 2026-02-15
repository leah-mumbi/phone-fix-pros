Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  try {
    const payload = await req.json();
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing RESEND_API_KEY" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    const {
      tracking_id = "",
      customer_email = "",
      status = "",
      device_model = "",
      technician_notes = "",
    } = payload || {};
    if (!customer_email) {
      return new Response(JSON.stringify({ ok: true, skipped: "no customer email" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    const lines = [
      `Tracking ID: ${tracking_id}`,
      `Device: ${device_model}`,
      `Status: ${status}`,
      technician_notes ? `Notes: ${technician_notes}` : "",
    ].filter(Boolean);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nzuri Mobiles <notifications@phone-fix-pros.local>",
        to: [customer_email],
        subject: `Repair Status Update: ${tracking_id}`,
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
