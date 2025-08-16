import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  referenceNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  collectFrom: string;
  deliverTo: string;
  serviceType: string;
  description: string;
  pricing: any;
  bookingType: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Booking email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingEmailRequest = await req.json();
    console.log("Processing booking confirmation for:", bookingData.customerEmail);

    const {
      referenceNumber,
      customerName,
      customerEmail,
      customerPhone,
      collectFrom,
      deliverTo,
      serviceType,
      description,
      pricing,
      bookingType
    } = bookingData;

    // Send notification email to business
    const businessEmailResponse = await resend.emails.send({
      from: "Fleetory <onboarding@resend.dev>",
      to: ["fleetory@outlook.com"],
      subject: `New Booking Confirmation - ${referenceNumber}`,
      html: `
        <h2>New Booking Received</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Booking Reference: ${referenceNumber}</h3>
          <p><strong>Booking Type:</strong> ${bookingType}</p>
          <p><strong>Service Type:</strong> ${serviceType}</p>
          
          <h4>Customer Details:</h4>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
          
          <h4>Delivery Details:</h4>
          <p><strong>Collect From:</strong> ${collectFrom}</p>
          <p><strong>Deliver To:</strong> ${deliverTo}</p>
          <p><strong>Description:</strong> ${description}</p>
          
          ${pricing ? `
          <h4>Pricing:</h4>
          <p><strong>Distance:</strong> ${pricing.distance || 'N/A'}</p>
          <p><strong>Estimated Price:</strong> £${pricing.estimatedPrice || 'TBC'}</p>
          ` : ''}
        </div>
        <p><strong>Action Required:</strong> Please allocate this booking to a driver and contact the customer to confirm collection details.</p>
      `,
    });

    console.log("Business notification sent:", businessEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Fleetory <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `Booking Confirmation - ${referenceNumber} - Fleetory`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a365d;">Booking Confirmed!</h1>
          <p>Hello ${customerName},</p>
          <p>Thank you for choosing Fleetory. Your booking has been successfully submitted.</p>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Booking Details</h3>
            <p><strong>Reference Number:</strong> ${referenceNumber}</p>
            <p><strong>Service Type:</strong> ${serviceType}</p>
            <p><strong>Collection Address:</strong> ${collectFrom}</p>
            <p><strong>Delivery Address:</strong> ${deliverTo}</p>
            <p><strong>Description:</strong> ${description}</p>
            ${pricing ? `<p><strong>Estimated Price:</strong> £${pricing.estimatedPrice || 'TBC'}</p>` : ''}
          </div>

          <div style="background: #e6fffa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>What happens next?</h4>
            <p>✅ One of our agents will call you to confirm collection details</p>
            <p>✅ We'll allocate a suitable driver for your delivery</p>
            <p>✅ You'll receive tracking information once collection begins</p>
            ${bookingType === 'same-day' ? '<p>🚚 <strong>Same-day delivery:</strong> Collection will be arranged within hours</p>' : ''}
          </div>

          <div style="background: #fff5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4>Need to make changes?</h4>
            <p>📞 Call us: <strong>+44 7539868853</strong></p>
            <p>💬 WhatsApp: <a href="https://wa.me/447352288232">+44 7352288232</a></p>
            <p>✉️ Email: <strong>fleetory@outlook.com</strong></p>
            <p>Please quote your reference number: <strong>${referenceNumber}</strong></p>
          </div>

          <p>Thank you for trusting Fleetory with your delivery.</p>
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
    console.error("Error in send-booking-email function:", error);
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