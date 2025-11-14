#!/usr/bin/env node

/**
 * Connection Test Suite for Vantage
 * Tests GitHub, Vercel, and Supabase connections
 */

import { Octokit } from '@octokit/rest'
import { createClient } from '@supabase/supabase-js'

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

async function testGitHub() {
  log('\n🔍 Testing GitHub Connection...', 'cyan')
  
  try {
    const token = process.env.GITHUB_TOKEN
    
    if (!token) {
      log('⚠️  GITHUB_TOKEN not configured', 'yellow')
      log('   Please set GITHUB_TOKEN in your .env.local file', 'yellow')
      return false
    }

    const octokit = new Octokit({ auth: token })
    const { data } = await octokit.repos.get({
      owner: process.env.GITHUB_OWNER || 'BigCal42',
      repo: 'vantage'
    })
    
    log(`✅ GitHub: Connected to ${data.full_name}`, 'green')
    log(`   - Default Branch: ${data.default_branch}`, 'blue')
    log(`   - Private: ${data.private}`, 'blue')
    log(`   - Last Updated: ${new Date(data.updated_at).toLocaleString()}`, 'blue')
    return true
  } catch (error: any) {
    log('❌ GitHub: Connection failed', 'red')
    log(`   Error: ${error.message}`, 'red')
    return false
  }
}

async function testVercel() {
  log('\n🔍 Testing Vercel Connection...', 'cyan')
  
  try {
    const token = process.env.VERCEL_TOKEN
    
    if (!token) {
      log('⚠️  VERCEL_TOKEN not configured', 'yellow')
      log('   Please set VERCEL_TOKEN in your .env.local file', 'yellow')
      log('   Get token from: https://vercel.com/account/tokens', 'yellow')
      return false
    }

    const response = await fetch('https://api.vercel.com/v2/user', {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`)
    }
    
    const data = await response.json()
    log(`✅ Vercel: Authenticated as ${data.user.username || data.user.email}`, 'green')
    log(`   - User ID: ${data.user.uid}`, 'blue')
    
    // Try to get project info if PROJECT_ID is set
    const projectId = process.env.VERCEL_PROJECT_ID
    if (projectId) {
      const projectResponse = await fetch(`https://api.vercel.com/v9/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (projectResponse.ok) {
        const projectData = await projectResponse.json()
        log(`   - Project: ${projectData.name}`, 'blue')
      }
    }
    
    return true
  } catch (error: any) {
    log('❌ Vercel: Connection failed', 'red')
    log(`   Error: ${error.message}`, 'red')
    return false
  }
}

async function testSupabase() {
  log('\n🔍 Testing Supabase Connection...', 'cyan')
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      log('⚠️  Supabase credentials not configured', 'yellow')
      log('   Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY', 'yellow')
      log('   Get credentials from: https://app.supabase.com/project/_/settings/api', 'yellow')
      return false
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test connection by querying postgres meta
    const { data, error } = await supabase
      .from('_migrations')
      .select('*')
      .limit(1)
    
    // If table doesn't exist, that's okay - connection still works
    if (error && error.code !== 'PGRST116') {
      throw error
    }
    
    log('✅ Supabase: Connected successfully', 'green')
    log(`   - Project URL: ${supabaseUrl}`, 'blue')
    
    // Try to get database info
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_tables_info')
      .limit(5)
    
    if (!tablesError && tables) {
      log(`   - Tables: ${tables.length} found`, 'blue')
    }
    
    return true
  } catch (error: any) {
    log('❌ Supabase: Connection failed', 'red')
    log(`   Error: ${error.message}`, 'red')
    return false
  }
}

function testMCP() {
  log('\n🔍 Testing MCP Servers...', 'cyan')
  log('ℹ️  MCP servers must be configured in Cursor settings', 'blue')
  log('   Location: C:\\Users\\roryc\\AppData\\Roaming\\Cursor\\User\\settings.json', 'blue')
  log('\n   Expected MCP servers:', 'blue')
  log('   - github: @modelcontextprotocol/server-github', 'blue')
  log('   - filesystem: @modelcontextprotocol/server-filesystem', 'blue')
  log('   - fetch: @modelcontextprotocol/server-fetch', 'blue')
  log('   - postgres: @modelcontextprotocol/server-postgres (optional)', 'blue')
  log('\n   ⚠️  Restart Cursor after configuring MCP servers', 'yellow')
  return true
}

async function runAllTests() {
  log('━'.repeat(60), 'cyan')
  log('  VANTAGE CONNECTION TEST SUITE', 'cyan')
  log('━'.repeat(60), 'cyan')
  
  const results = await Promise.all([
    testGitHub(),
    testVercel(),
    testSupabase(),
  ])
  
  testMCP()
  
  log('\n' + '━'.repeat(60), 'cyan')
  const allPassed = results.every(r => r)
  
  if (allPassed) {
    log('✅ All configured services connected successfully!', 'green')
  } else {
    const passedCount = results.filter(r => r).length
    log(`⚠️  ${passedCount}/${results.length} services connected`, 'yellow')
    log('   Configure missing credentials in .env.local', 'yellow')
  }
  log('━'.repeat(60), 'cyan')
}

// Load environment variables
try {
  require('dotenv').config({ path: '.env.local' })
} catch (e) {
  // dotenv not available, use process.env
}

runAllTests().catch((error) => {
  log('\n❌ Test suite failed', 'red')
  log(`Error: ${error.message}`, 'red')
  process.exit(1)
})

