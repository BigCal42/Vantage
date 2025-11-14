-- Migration: Fix security issue and add performance indexes
-- Fixes function search_path security issue and adds missing foreign key indexes

-- Fix handle_updated_at function security issue
-- Set search_path to immutable value to prevent search_path injection attacks
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Add missing indexes on foreign keys for better query performance
-- These indexes improve JOIN performance and foreign key constraint checks

-- Index on actions.risk_id for actions_risk_id_fkey
create index if not exists idx_actions_risk_id on public.actions(risk_id);

-- Index on briefings.stakeholder_id for briefings_stakeholder_id_fkey
create index if not exists idx_briefings_stakeholder_id on public.briefings(stakeholder_id);

