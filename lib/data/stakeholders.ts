import { createClient } from '@/lib/supabase/server'

export interface StakeholderRecord {
  id: string
  project_id: string
  name: string
  role: string
  email: string | null
  engagement_score: number | null
  sentiment: 'positive' | 'neutral' | 'negative' | null
  last_interaction: string | null
}

export interface BriefingRecord {
  id: string
  project_id: string
  stakeholder_id: string
  content: string
  format: 'email' | 'pdf' | 'pptx'
  sent_at: string
  opened_at: string | null
  read_duration: number | null
}

export async function getStakeholders(projectId?: string): Promise<StakeholderRecord[]> {
  const supabase = await createClient()
  let query = supabase.from('stakeholders').select('*').order('name', { ascending: true })
  if (projectId) {
    query = query.eq('project_id', projectId)
  }
  const { data, error } = await query
  if (error) throw new Error(`Failed to load stakeholders: ${error.message}`)
  return data ?? []
}

export async function getRecentBriefings(limit = 10): Promise<BriefingRecord[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('briefings')
    .select('*')
    .order('sent_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(`Failed to load briefings: ${error.message}`)
  return data ?? []
}

