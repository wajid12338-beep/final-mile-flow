import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AccountRequestEmail {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Account request email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, businessName, email, phone }: AccountRequestEmail = await req.json();

    console.log("Processing account request for:", email);

    // Send notification email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Fleetory <onboarding@resend.dev>",
      to: ["fleetory@outlook.com"],
      subject: "New Business Account Request",
      html: `
        <h2>New Business Account Request</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Contact Details:</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>
        <p><strong>Action Required:</strong> Please review this account request and contact the customer to set up their business account.</p>
      `,
    });

    console.log("Business notification sent:", businessEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Fleetory <onboarding@resend.dev>",
      to: [email],
      subject: "Account Request Received - Fleetory",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">Account Request Received!</h1>
          <p>Hello ${firstName},</p>
          <p>Thank you for your interest in setting up a business account with Fleetory.</p>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Request Details</h3>
            <p><strong>Business Name:</strong> ${businessName}</p>
            <p><strong>Contact Email:</strong> ${email}</p>
            <p><strong>Contact Phone:</strong> ${phone}</p>
          </div>

          <div style="background: #e6fffa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>What happens next?</h4>
            <p>✅ Our team will review your application</p>
            <p>✅ We'll contact you within 24 hours to discuss your account setup</p>
            <p>✅ You'll receive account details and payment terms</p>
            <p>✅ Start enjoying preferential rates and extended payment terms</p>
          </div>

          <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Account Benefits</h4>
            <p>🏢 <strong>Business Rates:</strong> Competitive pricing for regular customers</p>
            <p>💳 <strong>Credit Terms:</strong> Extended payment options available</p>
            <p>📊 <strong>Reporting:</strong> Monthly delivery reports and analytics</p>
            <p>🚀 <strong>Priority Service:</strong> Faster booking and dedicated support</p>
          </div>

          <div style="background: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Questions?</h4>
            <p>📞 Call us: <strong>+44 7539868853</strong></p>
            <p>💬 WhatsApp: <a href="https://wa.me/447352288232">+44 7352288232</a></p>
            <p>✉️ Email: <strong>fleetory@outlook.com</strong></p>
          </div>

          <p>We look forward to working with ${businessName}!</p>
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
    console.error("Error in send-account-request-email function:", error);
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