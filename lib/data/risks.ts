import { createClient } from '@/lib/supabase/server'

export interface RiskRecord {
  id: string
  project_id: string
  title: string
  description: string | null
  severity: 'low' | 'medium' | 'high' | 'critical'
  probability: number | null
  impact_score: number | null
  status: 'open' | 'monitoring' | 'mitigated' | 'closed'
  detected_at: string
  mitigated_at: string | null
}

export interface ActionRecord {
  id: string
  project_id: string
  risk_id: string | null
  title: string
  description: string | null
  action_type: 'email' | 'calendar' | 'slack' | 'jira'
  success_rate: number | null
  cost: number | null
  status: 'suggested' | 'approved' | 'executing' | 'completed' | 'failed'
  executed_at: string | null
  created_at: string
}

export async function getRisks(projectId?: string): Promise<RiskRecord[]> {
  const supabase = await createClient()
  let query = supabase
    .from('risks')
    .select('*')
    .order('detected_at', { ascending: false })

  if (projectId) {
    query = query.eq('project_id', projectId)
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to fetch risks: ${error.message}`)
  }

  return data ?? []
}

export async function getActionsByRisk(riskId: string): Promise<ActionRecord[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('actions')
    .select('*')
    .eq('risk_id', riskId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch actions for risk ${riskId}: ${error.message}`)
  }

  return data ?? []
}

