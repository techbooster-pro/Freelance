import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  try {
    const { name, email, message } = req.body;

    await resend.emails.send({
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

    return res.status(200).json({
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Resend Error:", error);

    return res.status(500).json({
      message: "Failed to send email",
    });
  }
}
