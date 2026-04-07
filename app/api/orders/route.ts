import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await req.json()

    const {
      firstName, lastName, phone, email,
      address, city, zip,
      waterType, bottleSize, bottlesPerDelivery,
      needsCooler,
    } = body

    // Basic server-side validation
    if (!firstName || !lastName || !phone || !email || !address || !city || !zip) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Save to database
    const order = await prisma.order.create({
      data: {
        firstName, lastName, phone, email,
        address, city, zip,
        waterType, bottleSize, bottlesPerDelivery,
        needsCooler,
        status: 'new',
      },
    })

    // Send notification to Joseph
    await resend.emails.send({
      from: 'Pure O Water <orders@pureowater.com>',
      to: process.env.JOSEPH_EMAIL as string,
      subject: `New Order Request — ${firstName} ${lastName} (${city})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0d2b4e;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:22px;">New Order Request</h1>
            <p style="color:#00c9e4;margin:6px 0 0;font-size:14px;">Pure O Water — Order #${order.id}</p>
          </div>

          <div style="padding:32px;background:#f4f7fa;">
            <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;">
              <tr style="background:#e8f6fb;">
                <td colspan="2" style="padding:12px 16px;font-weight:bold;color:#0d2b4e;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Customer Info</td>
              </tr>
              <tr><td style="padding:10px 16px;color:#5a7080;font-size:14px;width:40%;">Name</td><td style="padding:10px 16px;font-size:14px;font-weight:600;">${firstName} ${lastName}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:10px 16px;color:#5a7080;font-size:14px;">Phone</td><td style="padding:10px 16px;font-size:14px;"><a href="tel:${phone}" style="color:#1e90d6;">${phone}</a></td></tr>
              <tr><td style="padding:10px 16px;color:#5a7080;font-size:14px;">Email</td><td style="padding:10px 16px;font-size:14px;"><a href="mailto:${email}" style="color:#1e90d6;">${email}</a></td></tr>
              <tr style="background:#fafafa;"><td style="padding:10px 16px;color:#5a7080;font-size:14px;">Address</td><td style="padding:10px 16px;font-size:14px;">${address}, ${city}, CA ${zip}</td></tr>

              <tr style="background:#e8f6fb;">
                <td colspan="2" style="padding:12px 16px;font-weight:bold;color:#0d2b4e;font-size:13px;text-transform:uppercase;letter-spacing:.05em;">Order Details</td>
              </tr>
              <tr><td style="padding:10px 16px;color:#5a7080;font-size:14px;">Water Type</td><td style="padding:10px 16px;font-size:14px;font-weight:600;">${waterType}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:10px 16px;color:#5a7080;font-size:14px;">Bottle Size</td><td style="padding:10px 16px;font-size:14px;">${bottleSize}</td></tr>
              <tr><td style="padding:10px 16px;color:#5a7080;font-size:14px;">First Delivery Qty</td><td style="padding:10px 16px;font-size:14px;">${bottlesPerDelivery}</td></tr>
              <tr style="background:#fafafa;"><td style="padding:10px 16px;color:#5a7080;font-size:14px;">Frequency</td><td style="padding:10px 16px;font-size:14px;">Every 2 weeks to start</td></tr>
              <tr><td style="padding:10px 16px;color:#5a7080;font-size:14px;">Cooler Needed</td><td style="padding:10px 16px;font-size:14px;">${needsCooler}</td></tr>
            </table>

            <div style="margin-top:24px;text-align:center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="display:inline-block;background:#1e90d6;color:#fff;padding:14px 28px;border-radius:8px;font-weight:700;text-decoration:none;font-size:15px;">
                View in Admin Dashboard →
              </a>
            </div>
          </div>
        </div>
      `,
    })

    // Send confirmation to customer
    await resend.emails.send({
      from: 'Pure O Water <hello@pureowater.com>',
      to: email,
      subject: `Your Pure O Water delivery request is confirmed!`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#0d2b4e;padding:24px 32px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:24px;">You're all set, ${firstName}!</h1>
            <p style="color:#00c9e4;margin:8px 0 0;font-size:15px;">Your first delivery is on us</p>
          </div>

          <div style="padding:32px;">
            <p style="color:#1a2a3a;font-size:15px;line-height:1.7;">
              Thanks for choosing Pure O Water! We received your delivery request and will contact you
              within <strong>1 business day</strong> to confirm your first delivery date.
            </p>

            <div style="background:#e8f6fb;border-radius:10px;padding:20px 24px;margin:24px 0;">
              <h3 style="color:#0d2b4e;margin:0 0 12px;font-size:15px;">Your order summary:</h3>
              <p style="margin:4px 0;font-size:14px;color:#1a2a3a;"><strong>${waterType}</strong> — ${bottleSize}</p>
              <p style="margin:4px 0;font-size:14px;color:#1a2a3a;">${bottlesPerDelivery} for your first delivery</p>
              <p style="margin:4px 0;font-size:14px;color:#1a2a3a;">Deliveries scheduled every 2 weeks to start</p>
              <p style="margin:4px 0;font-size:14px;color:#1a2a3a;">${address}, ${city}, CA ${zip}</p>
            </div>

            <p style="color:#5a7080;font-size:14px;line-height:1.7;">
              Questions? Call us anytime at <a href="tel:+18055227002" style="color:#1e90d6;font-weight:600;">(805) 522-7002</a>
              or reply to this email.
            </p>

            <p style="color:#1a2a3a;font-size:14px;margin-top:24px;">
              Welcome to the Pure O Water family!<br />
              <strong>— The Pure O Water Team</strong>
            </p>
          </div>

          <div style="background:#f4f7fa;padding:16px 32px;text-align:center;">
            <p style="color:#5a7080;font-size:12px;margin:0;">
              Pure O Water · (805) 522-7002 · Ventura County, CA<br />
              <em>Small Enough To Care. Big Enough To Deliver.</em>
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true, orderId: order.id })
  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET — fetch all orders (admin use)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  const where: Record<string, unknown> = {}
  if (status && status !== 'all') where.status = status
  if (search) {
    where.OR = [
      { firstName: { contains: search } },
      { lastName:  { contains: search } },
      { email:     { contains: search } },
      { city:      { contains: search } },
      { phone:     { contains: search } },
    ]
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(orders)
}
