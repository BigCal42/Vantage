import { MissionControlShell } from '@/components/mission-control-shell'
import { getProjects, getHealthMetrics } from '@/lib/data/projects'
import { getStakeholders, getRecentBriefings } from '@/lib/data/stakeholders'
import type { StakeholderProfile } from '@/components/executive-briefing-engine'

function deriveFocusAreas(role: string): string[] {
  if (/finance|cfo/i.test(role)) return ['Budget', 'ROI', 'Cash Flow']
  if (/cio|technology|it/i.test(role)) return ['Architecture', 'Security', 'Integration']
  if (/ceo|operations/i.test(role)) return ['Timeline', 'Risk', 'Strategic Impact']
  return ['Timeline', 'Risk', 'Performance']
}

function derivePreferredFormat(role: string): StakeholderProfile['preferredFormat'] {
  if (/cfo/i.test(role)) return 'summary'
  if (/cio|cto/i.test(role)) return 'detailed'
  return 'visual'
}

export default async function VantagePage() {
  const projects = await getProjects()
  const primaryProject = projects[0] ?? null

  const [healthMetrics, stakeholders, briefings] = await Promise.all([
    primaryProject ? getHealthMetrics(primaryProject.id, 12) : Promise.resolve([]),
    getStakeholders(primaryProject?.id),
    getRecentBriefings(20),
  ])

  const stakeholdersWithMeta: StakeholderProfile[] = stakeholders.map(stakeholder => {
    const avatar = stakeholder.name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase()

    const lastBriefing = briefings.find(briefing => briefing.stakeholder_id === stakeholder.id)?.sent_at

    return {
      id: stakeholder.id,
      name: stakeholder.name,
      role: stakeholder.role,
      avatar,
      focusAreas: deriveFocusAreas(stakeholder.role),
      preferredFormat: derivePreferredFormat(stakeholder.role),
      lastBriefing: lastBriefing ?? stakeholder.last_interaction ?? 'No briefings yet',
    }
  })

  return (
    <MissionControlShell
      project={primaryProject}
      healthMetrics={healthMetrics}
      stakeholders={stakeholdersWithMeta}
    />
  )
}
