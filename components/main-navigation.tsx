'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Compass, GitCompare, Users, BarChart3, Stethoscope, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function MainNavigation() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: 'Mission Control', href: '/' },
    { icon: Compass, label: 'Discovery', href: '/discovery' },
    { icon: GitCompare, label: 'Scenarios', href: '/scenarios' },
    { icon: Users, label: 'Resources', href: '/resources' },
    { icon: BarChart3, label: 'PMO Dashboard', href: '/pmo' },
    { icon: Stethoscope, label: 'Diagnose', href: '/diagnose' }
  ]

  return (
    <div className={cn(
      "fixed left-0 top-16 bottom-0 border-r bg-card/80 backdrop-blur-xl transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 transition-all",
                    isActive && "bg-primary/10 text-primary border-l-4 border-primary",
                    !isActive && "hover:bg-muted",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </div>

        <div className="border-t p-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full justify-center"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
