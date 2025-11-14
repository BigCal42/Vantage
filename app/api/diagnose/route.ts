import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json()

    if (!projectId) {
      return new Response('Project ID required', { status: 400 })
    }

    const supabase = await createClient()

    // Fetch project context
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (projectError || !project) {
      return new Response('Project not found', { status: 404 })
    }

    // Fetch recent health metrics
    const { data: metrics } = await supabase
      .from('health_metrics')
      .select('*')
      .eq('project_id', projectId)
      .order('recorded_at', { ascending: false })
      .limit(10)

    // Fetch active risks
    const { data: risks } = await supabase
      .from('risks')
      .select('*')
      .eq('project_id', projectId)
      .eq('status', 'open')
      .order('detected_at', { ascending: false })

    // Create streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const context = {
          project: project.name,
          healthScore: project.health_score,
          recentMetrics: metrics ?? [],
          activeRisks: risks ?? [],
        }

        // Stream AI diagnosis (stub implementation)
        // In production, this would use Vercel AI SDK or OpenAI streaming API
        const diagnosis = `Analyzing ${context.project}...

Health Score: ${context.healthScore}/100
${context.healthScore >= 80 ? '✓ Project is healthy' : context.healthScore >= 60 ? '⚠ Project needs attention' : '✗ Project at risk'}

Active Risks: ${context.activeRisks.length}
${context.activeRisks.length > 0 ? '⚠ Immediate action required' : '✓ No critical risks detected'}

Recent Trends:
${context.recentMetrics.length > 0 ? '• Health metrics stable' : '• Insufficient data for trend analysis'}

Recommendations:
1. Monitor health score weekly
2. Address ${context.activeRisks.length} open risk${context.activeRisks.length !== 1 ? 's' : ''}
3. Review stakeholder engagement

Analysis complete.`

        // Stream the response in chunks
        const chunks = diagnosis.split('\n')
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(chunk + '\n'))
          await new Promise(resolve => setTimeout(resolve, 50)) // Simulate streaming delay
        }

        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Diagnosis error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

