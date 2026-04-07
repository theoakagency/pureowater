import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Notify Joseph
    await resend.emails.send({
      from: 'Pure O Water <contact@pureowater.com>',
      to: process.env.JOSEPH_EMAIL as string,
      replyTo: email,
      subject: `Contact Form: ${subject || 'General Inquiry'} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0d2b4e;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Contact Form Message</h1>
            <p style="color:#00c9e4;margin:6px 0 0;font-size:14px;">pureowater.com</p>
          </div>
          <div style="padding:32px;background:#f4f7fa;">
            <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;">
              <tr style="background:#e8f6fb;">
                <td colspan="2" style="padding:12px 16px;font-weight:bold;color:#0d2b4e;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Sender Details</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#5a7080;font-size:14px;width:30%;">Name</td>
                <td style="padding:10px 16px;font-size:14px;font-weight:600;">${name}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:10px 16px;color:#5a7080;font-size:14px;">Email</td>
                <td style="padding:10px 16px;font-size:14px;">
                  <a href="mailto:${email}" style="color:#1e90d6;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 16px;color:#5a7080;font-size:14px;">Phone</td>
                <td style="padding:10px 16px;font-size:14px;">
                  ${phone ? `<a href="tel:${phone}" style="color:#1e90d6;">${phone}</a>` : '<span style="color:#aaa;">Not provided</span>'}
                </td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:10px 16px;color:#5a7080;font-size:14px;">Subject</td>
                <td style="padding:10px 16px;font-size:14px;">${subject || 'General Inquiry'}</td>
              </tr>
              <tr style="background:#e8f6fb;">
                <td colspan="2" style="padding:12px 16px;font-weight:bold;color:#0d2b4e;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Message</td>
              </tr>
              <tr>
                <td colspan="2" style="padding:16px;font-size:14px;line-height:1.7;color:#1a2a3a;">
                  ${message.replace(/\n/g, '<br/>')}
                </td>
              </tr>
            </table>
            <div style="margin-top:20px;text-align:center;">
              <a href="mailto:${email}" style="display:inline-block;background:#1e90d6;color:#fff;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;font-size:14px;">
                Reply to ${name} →
              </a>
            </div>
          </div>
        </div>
      `,
    })

    // Auto-reply to sender
    await resend.emails.send({
      from: 'Pure O Water <hello@pureowater.com>',
      to: email,
      subject: `We received your message, ${name}!`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0d2b4e;padding:24px 32px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:22px;">Thanks for reaching out, ${name}!</h1>
            <p style="color:#00c9e4;margin:8px 0 0;font-size:14px;">We'll be in touch within 1 business day</p>
          </div>
          <div style="padding:32px;">
            <p style="color:#1a2a3a;font-size:15px;line-height:1.7;">
              We received your message and will get back to you within <strong>1 business day</strong>.
              In the meantime, if you need immediate assistance, give us a call:
            </p>
            <div style="text-align:center;margin:24px 0;">
              <a href="tel:+18445227000" style="display:inline-block;background:#0d2b4e;color:#fff;padding:14px 28px;border-radius:8px;font-weight:700;text-decoration:none;font-size:16px;">
                (844) 522-7000
              </a>
            </div>
            <div style="background:#e8f6fb;border-radius:10px;padding:16px 20px;margin-top:16px;">
              <p style="margin:0;font-size:13px;color:#5a7080;"><strong style="color:#0d2b4e;">Your message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
            </div>
            <p style="color:#5a7080;font-size:13px;margin-top:20px;line-height:1.6;">
              — The Pure O Water Team<br/>
              <em>Small Enough To Care. Big Enough To Deliver.</em>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
