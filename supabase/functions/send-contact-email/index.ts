import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Contact email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, service, message }: ContactFormRequest = await req.json();

    console.log("Processing contact form submission for:", email);

    // Send notification email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Fleetory <onboarding@resend.dev>",
      to: ["fleetory@outlook.com"],
      subject: "New Contact Form Submission - Call Back Request",
      html: `
        <h2>New Call Back Request</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service Required:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
        </div>
        <p><strong>Action Required:</strong> Please call back this customer within 2 hours during business hours.</p>
      `,
    });

    console.log("Business notification sent:", businessEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Fleetory <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your call back request - Fleetory",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">Thank you for contacting Fleetory!</h1>
          <p>Hello ${firstName},</p>
          <p>We have received your request for a call back regarding <strong>${service}</strong>.</p>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>What happens next?</h3>
            <p>✅ One of our specialist agents will call you back within <strong>2 hours</strong> during business hours</p>
            <p>✅ We'll discuss your requirements and provide a tailored solution</p>
            <p>✅ You'll receive a competitive quote for your delivery needs</p>
          </div>

          <div style="background: #e6fffa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Need immediate assistance?</h4>
            <p>📞 Emergency line: <strong>+44 7539868853</strong></p>
            <p>💬 WhatsApp: <a href="https://wa.me/447352288232">+44 7352288232</a></p>
          </div>

          <p>Thank you for choosing Fleetory for your logistics needs.</p>
          <p>Best regards,<br>The Fleetory Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          <p style="font-size: 12px; color: #718096;">
            Fleetory - Your trusted logistics partner<br>
            Available 24/7, 365 days a year
          </p>
        </div>
      `,
    });

    console.log("Customer confirmation sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        businessEmail: businessEmailResponse,
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);