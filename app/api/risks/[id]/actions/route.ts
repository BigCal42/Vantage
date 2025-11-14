import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const actionSchema = z.object({
  projectId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  actionType: z.enum(['email', 'calendar', 'slack', 'jira']),
  successRate: z.number().min(0).max(100).optional(),
  cost: z.number().optional(),
  status: z.enum(['suggested', 'approved', 'executing', 'completed', 'failed']).optional(),
  executedAt: z.string().datetime().optional(),
})

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const payload = actionSchema.parse(await request.json())
    const supabase = await createClient()
    const params = await context.params

    const { error } = await supabase.from('actions').insert({
      project_id: payload.projectId,
      risk_id: params.id,
      title: payload.title,
      description: payload.description ?? null,
      action_type: payload.actionType,
      success_rate: payload.successRate ?? null,
      cost: payload.cost ?? null,
      status: payload.status ?? 'suggested',
      executed_at: payload.executedAt ?? null,
    })

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid payload', issues: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create action', detail: (error as Error).message },
      { status: 500 }
    )
  }
}

