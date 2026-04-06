import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

type OrderRow = {
  id: number
  createdAt: Date
  status: string
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  city: string
  zip: string
  waterType: string
  bottleSize: string
  bottlesPerDelivery: string
  frequency: string
  needsCooler: string
  notes: string
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const where: Record<string, unknown> = {}
  if (status && status !== 'all') where.status = status

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  }) as OrderRow[]

  const csvHeaders = [
    'ID', 'Date', 'Status', 'First Name', 'Last Name', 'Phone', 'Email',
    'Address', 'City', 'Zip', 'Water Type', 'Bottle Size',
    'Bottles/Delivery', 'Frequency', 'Cooler Needed', 'Notes',
  ]

  const rows = orders.map((o) => [
    o.id,
    new Date(o.createdAt).toLocaleDateString('en-US'),
    o.status,
    o.firstName,
    o.lastName,
    o.phone,
    o.email,
    o.address,
    o.city,
    o.zip,
    o.waterType,
    o.bottleSize,
    o.bottlesPerDelivery,
    o.frequency,
    o.needsCooler,
    o.notes,
  ])

  const csv = [csvHeaders, ...rows]
    .map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    )
    .join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="pureowater-orders-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  })
}
