import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const healthMetricSchema = z.object({
  healthScore: z.number().min(0).max(100),
  budgetVelocity: z.number().optional(),
  resourceGaps: z.number().int().optional(),
  vendorRisks: z.number().int().optional(),
  recordedAt: z.string().datetime().optional(),
})

async function upsertHealthMetric(projectId: string, input: z.infer<typeof healthMetricSchema>) {
  const supabase = await createClient()
  const payload = {
    project_id: projectId,
    health_score: input.healthScore,
    budget_velocity: input.budgetVelocity ?? null,
    resource_gaps: input.resourceGaps ?? null,
    vendor_risks: input.vendorRisks ?? null,
    recorded_at: input.recordedAt ?? new Date().toISOString(),
  }

  const { error } = await supabase.from('health_metrics').insert(payload)

  if (error) {
    throw new Error(error.message)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const parsed = healthMetricSchema.parse(await request.json())
    await upsertHealthMetric(id, parsed)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid payload', issues: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to store health metric', detail: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return POST(request, { params })
}

