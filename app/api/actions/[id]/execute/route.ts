import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Update action status to executing
    const { data: action, error: fetchError } = await supabase
      .from('actions')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !action) {
      return NextResponse.json(
        { error: 'Action not found' },
        { status: 404 }
      )
    }

    // Update status to executing
    const { error: updateError } = await supabase
      .from('actions')
      .update({
        status: 'executing',
        executed_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update action' },
        { status: 500 }
      )
    }

    // Simulate action execution (in production, this would trigger actual integrations)
    // For now, we'll mark it as completed after a short delay
    setTimeout(async () => {
      await supabase
        .from('actions')
        .update({ status: 'completed' })
        .eq('id', id)
    }, 2000)

    return NextResponse.json({
      success: true,
      action: {
        ...action,
        status: 'executing',
        executed_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error executing action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

