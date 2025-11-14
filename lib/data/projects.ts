import { createClient } from '@/lib/supabase/server'

export interface ProjectRecord {
  id: string
  name: string
  description: string | null
  health_score: number | null
  budget_velocity: number | null
  timeline_confidence: number | null
  created_at: string
  updated_at: string
}

export interface HealthMetricRecord {
  id: string
  project_id: string
  health_score: number
  budget_velocity: number | null
  resource_gaps: number | null
  vendor_risks: number | null
  recorded_at: string
}

export async function getProjects(): Promise<ProjectRecord[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('id,name,description,health_score,budget_velocity,timeline_confidence,created_at,updated_at')
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`)
  }

  return data ?? []
}

export async function getProjectById(id: string): Promise<ProjectRecord | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('id,name,description,health_score,budget_velocity,timeline_confidence,created_at,updated_at')
    .eq('id', id)
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(`Failed to fetch project ${id}: ${error.message}`)
  }

  return data ?? null
}

export async function getHealthMetrics(projectId: string, limit = 12): Promise<HealthMetricRecord[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('health_metrics')
    .select('id,project_id,health_score,budget_velocity,resource_gaps,vendor_risks,recorded_at')
    .eq('project_id', projectId)
    .order('recorded_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(`Failed to fetch health metrics for project ${projectId}: ${error.message}`)
  }

  return data ?? []
}

