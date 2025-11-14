import { NextRequest, NextResponse } from 'next/server'
import { seedDemoProject } from '@/lib/demo/seed'

export async function POST(request: NextRequest) {
  try {
    // Get user ID from auth if available (for future multi-user support)
    // For now, we'll seed for anonymous/demo users
    const { userId } = await request.json().catch(() => ({ userId: undefined }))

    const result = await seedDemoProject(userId)

    return NextResponse.json({
      success: true,
      message: 'Demo project seeded successfully',
      data: result,
    })
  } catch (error) {
    console.error('Demo seeding error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to seed demo project',
      },
      { status: 500 }
    )
  }
}

