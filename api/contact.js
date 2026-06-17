import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body;

    // Email to you
    const adminEmail = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "digitalcreater.jkf@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Admin Email:", adminEmail);

    // Auto Reply
    const autoReply = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Thank You for Contacting Us",
      html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for contacting us.</p>
        <p>We have received your message and will reply soon.</p>
        <br>
        <p>Tech Booster Team</p>
      `,
    });

    console.log("Auto Reply:", autoReply);

    return res.status(200).json({
      message: "Message sent successfully!",
    });

  } catch (error) {
    console.error("FULL ERROR:", error);

    return res.status(500).json({
      message: "Failed to send email",
      error: error.message,
    });
  }
}
