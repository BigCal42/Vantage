-- Insert demo project
insert into public.projects (name, description, health_score, budget_velocity, timeline_confidence)
values (
  'Epic EHR Implementation - Mayo Clinic',
  'Enterprise-wide Electronic Health Record system implementation across 47 facilities',
  87.3,
  15.2,
  73.0
) returning id;

-- Get the project ID (replace with actual UUID after running above)
-- For demo, we'll use a fixed UUID
insert into public.health_metrics (project_id, health_score, budget_velocity, resource_gaps, vendor_risks)
select 
  p.id,
  87.3 + (random() * 5 - 2.5),
  15.2 + (random() * 3 - 1.5),
  floor(random() * 5)::integer,
  floor(random() * 3)::integer
from public.projects p
limit 1;

-- Insert sample risks
insert into public.risks (project_id, title, description, severity, probability, impact_score)
select 
  p.id,
  'Vendor Resource Constraint',
  'Epic implementation team showing 23% increase in timeline estimates, suggesting capacity issues',
  'high',
  0.68,
  2400000.00
from public.projects p
limit 1;

-- Insert sample decisions
insert into public.decisions (project_id, title, description, urgency, impact_score)
select 
  p.id,
  'Accelerate Phase 3 Go-Live',
  'Option to move Phase 3 deployment forward by 6 weeks to capture $2.4M in annual savings',
  'high',
  2400000.00
from public.projects p
limit 1;

-- Insert stakeholders
insert into public.stakeholders (project_id, name, role, email, engagement_score, sentiment)
select 
  p.id,
  name,
  role,
  email,
  engagement,
  sentiment
from public.projects p
cross join (
  values
    ('Dr. Sarah Chen', 'Chief Medical Officer', 'schen@mayo.edu', 92, 'positive'),
    ('Michael Torres', 'CFO', 'mtorres@mayo.edu', 78, 'neutral'),
    ('James Wilson', 'CIO', 'jwilson@mayo.edu', 95, 'positive')
) as s(name, role, email, engagement, sentiment)
limit 3;

