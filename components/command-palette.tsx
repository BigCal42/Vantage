'use client'

import { useState, useEffect } from 'react'
import { Command } from 'cmdk'
import { Search, Zap, Target, Brain, TrendingUp, Users, Calendar, FileText, Settings, HelpCircle, ArrowRight, Sparkles } from 'lucide-react'

export function CommandPalette({ 
  open, 
  onOpenChange 
}: { 
  open: boolean
  onOpenChange: (open: boolean) => void 
}) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={onOpenChange}
      label="Command Menu"
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <div className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl">
        <div className="bg-card border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center border-b border-border/50 px-6 py-4">
            <Search className="size-5 text-muted-foreground mr-3" />
            <Command.Input 
              placeholder="Ask Vantage anything or search commands..." 
              className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-muted rounded">
              ESC
            </kbd>
          </div>

          {/* Commands List */}
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
              No results found. Try asking a question...
            </Command.Empty>

            {/* AI Actions */}
            <Command.Group heading="AI Intelligence" className="px-2 py-2">
              <CommandItem 
                icon={<Zap className="size-4 text-warning" />}
                title="Diagnose My Project"
                description="Run deep AI analysis to find hidden risks"
                shortcut="⌘D"
              />
              <CommandItem 
                icon={<Brain className="size-4 text-primary" />}
                title="Ask AI Assistant"
                description="Get instant answers about your project"
                shortcut="⌘A"
              />
              <CommandItem 
                icon={<Sparkles className="size-4 text-chart-4" />}
                title="Generate Scenarios"
                description="Model different futures for your project"
                shortcut="⌘S"
              />
            </Command.Group>

            {/* Quick Actions */}
            <Command.Group heading="Quick Actions" className="px-2 py-2">
              <CommandItem 
                icon={<Target className="size-4" />}
                title="View Decision Queue"
                description="See next 10 decisions prioritized"
              />
              <CommandItem 
                icon={<TrendingUp className="size-4" />}
                title="Resource Planner"
                description="Allocate team capacity and detect gaps"
              />
              <CommandItem 
                icon={<Users className="size-4" />}
                title="Stakeholder Map"
                description="Manage executive engagement"
              />
            </Command.Group>

            {/* Navigation */}
            <Command.Group heading="Navigate" className="px-2 py-2">
              <CommandItem 
                icon={<FileText className="size-4" />}
                title="Intelligence Feed"
                description="View all project events and insights"
                shortcut="⌘H"
              />
              <CommandItem 
                icon={<Calendar className="size-4" />}
                title="Timeline View"
                description="See critical path and dependencies"
              />
              <CommandItem 
                icon={<Settings className="size-4" />}
                title="Settings"
                description="Configure project parameters"
              />
            </Command.Group>
          </Command.List>

          {/* Footer */}
          <div className="border-t border-border/50 px-6 py-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>Type to search or ask questions</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">↵</kbd>
                select
              </span>
            </div>
          </div>
        </div>
      </div>
    </Command.Dialog>
  )
}

function CommandItem({ 
  icon, 
  title, 
  description, 
  shortcut 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  shortcut?: string 
}) {
  return (
    <Command.Item 
      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                 hover:bg-accent/50 aria-selected:bg-accent
                 transition-colors group"
    >
      <div className="flex items-center justify-center size-8 rounded-md bg-muted group-hover:bg-background">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground truncate">{description}</div>
      </div>
      {shortcut && (
        <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-muted rounded">
          {shortcut}
        </kbd>
      )}
      <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </Command.Item>
  )
}
