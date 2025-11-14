import { createClient } from '@/lib/supabase/server'

export interface DemoProjectData {
  projectId: string
  healthMetrics: number
  risks: number
  stakeholders: number
}

/**
 * Seeds demo project data for the current user
 * Creates a sample project with health metrics, risks, and stakeholders
 */
export async function seedDemoProject(userId?: string): Promise<DemoProjectData> {
  const supabase = await createClient()

  // Create demo project
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .insert({
      name: 'Epic EHR Implementation - Demo',
      description: 'Enterprise-wide Electronic Health Record system implementation (Demo Project)',
      health_score: 87.3,
      budget_velocity: 15.2,
      timeline_confidence: 73.0,
    })
    .select()
    .single()

  if (projectError || !project) {
    throw new Error(`Failed to create demo project: ${projectError?.message ?? 'Unknown error'}`)
  }

  // Create health metrics
  const healthMetrics = []
  for (let i = 0; i < 12; i++) {
    const daysAgo = 12 - i
    const recordedAt = new Date()
    recordedAt.setDate(recordedAt.getDate() - daysAgo)
    
    healthMetrics.push({
      project_id: project.id,
      health_score: 87.3 + (Math.random() * 5 - 2.5),
      budget_velocity: 15.2 + (Math.random() * 3 - 1.5),
      resource_gaps: Math.floor(Math.random() * 5),
      vendor_risks: Math.floor(Math.random() * 3),
      recorded_at: recordedAt.toISOString(),
    })
  }

  const { error: metricsError } = await supabase
    .from('health_metrics')
    .insert(healthMetrics)

  if (metricsError) {
    console.error('Failed to create health metrics:', metricsError)
  }

  // Create risks
  const risks = [
    {
      project_id: project.id,
      title: 'Vendor Resource Constraint',
      description: 'Epic implementation team showing 23% increase in timeline estimates',
      severity: 'high',
      probability: 0.68,
      impact_score: 2400000.00,
      status: 'open',
    },
    {
      project_id: project.id,
      title: 'Budget Velocity Increase',
      description: 'Spending 15% faster than planned, consuming contingency buffer',
      severity: 'medium',
      probability: 0.75,
      impact_score: 320000.00,
      status: 'open',
    },
  ]

  const { error: risksError } = await supabase
    .from('risks')
    .insert(risks)

  if (risksError) {
    console.error('Failed to create risks:', risksError)
  }

  // Create stakeholders
  const stakeholders = [
    {
      project_id: project.id,
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer',
      email: 'schen@demo.org',
      engagement_score: 92,
      sentiment: 'positive',
    },
    {
      project_id: project.id,
      name: 'Michael Torres',
      role: 'CFO',
      email: 'mtorres@demo.org',
      engagement_score: 78,
      sentiment: 'neutral',
    },
    {
      project_id: project.id,
      name: 'James Wilson',
      role: 'CIO',
      email: 'jwilson@demo.org',
      engagement_score: 95,
      sentiment: 'positive',
    },
  ]

  const { error: stakeholdersError } = await supabase
    .from('stakeholders')
    .insert(stakeholders)

  if (stakeholdersError) {
    console.error('Failed to create stakeholders:', stakeholdersError)
  }

  return {
    projectId: project.id,
    healthMetrics: healthMetrics.length,
    risks: risks.length,
    stakeholders: stakeholders.length,
  }
}

