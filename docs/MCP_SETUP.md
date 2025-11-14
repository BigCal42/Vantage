# MCP Server Configuration for Vantage

This guide explains how to configure Model Context Protocol (MCP) servers in Cursor to enable seamless integration with GitHub, Vercel, and Supabase.

## What are MCP Servers?

MCP (Model Context Protocol) servers allow AI assistants in Cursor to directly interact with external services like GitHub repositories, databases, and APIs. This enables the AI to:

- Read and search your GitHub repository
- Access local files in your workspace
- Query your Supabase database
- Fetch data from external APIs

## Configuration Location

MCP servers are configured in Cursor's settings file:

**Windows:**
```
C:\Users\roryc\AppData\Roaming\Cursor\User\settings.json
```

**macOS:**
```
~/Library/Application Support/Cursor/User/settings.json
```

**Linux:**
```
~/.config/Cursor/User/settings.json
```

## Required Configuration

Add the following to your Cursor `settings.json` file:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_token_here"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\roryc\\Desktop\\Vantage"
      ]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
      ]
    }
  }
}
```

## Setting Up Each MCP Server

### 1. GitHub MCP Server

**Purpose:** Access GitHub repository, issues, PRs, and code

**Setup:**
1. Create a GitHub Personal Access Token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo`, `read:org`, `read:user`
   - Copy the token

2. Add token to `settings.json`:
   ```json
   "env": {
     "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
   }
   ```

### 2. Filesystem MCP Server

**Purpose:** Access local project files

**Setup:**
1. Update the path in `settings.json` to your workspace:
   - Windows: `C:\\Users\\roryc\\Desktop\\Vantage`
   - macOS/Linux: `/Users/username/Desktop/Vantage`

**Note:** Use double backslashes (`\\`) for Windows paths in JSON.

### 3. Fetch MCP Server

**Purpose:** Make HTTP requests to external APIs (Vercel, etc.)

**Setup:**
1. No additional configuration required
2. Optionally restrict origins:
   ```json
   "env": {
     "ALLOWED_ORIGINS": "https://api.vercel.com,https://*.supabase.co"
   }
   ```

### 4. Postgres MCP Server (Optional but Recommended)

**Purpose:** Direct database access for Supabase

**Setup:**
1. Get your Supabase connection string:
   - Go to https://app.supabase.com/project/_/settings/database
   - Copy the "Connection string" under "Connection pooling"
   - Replace `[YOUR-PASSWORD]` with your database password

2. Update the connection string in `settings.json`:
   ```json
   "args": [
     "-y",
     "@modelcontextprotocol/server-postgres",
     "postgresql://postgres:your_password@db.your-project-ref.supabase.co:5432/postgres"
   ]
   ```

## Installing MCP Server Packages

The MCP servers will be automatically installed via `npx` when Cursor starts. However, you can pre-install them globally:

```bash
npm install -g @modelcontextprotocol/server-github
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-fetch
npm install -g @modelcontextprotocol/server-postgres
```

## Verifying MCP Server Configuration

After configuring MCP servers:

1. **Restart Cursor completely** (close and reopen)
2. Check the Cursor status bar - you should see MCP indicators
3. Use the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for "MCP"
4. You should see available MCP tools and resources

## Testing MCP Connections

You can verify that MCP servers are working by asking the AI assistant questions like:

- "What files are in my repository?"
- "Show me the latest commits on GitHub"
- "Query my Supabase database for table information"
- "Fetch data from the Vercel API"

## Troubleshooting

### MCP Servers Not Appearing

1. **Check settings.json syntax:** Ensure valid JSON (no trailing commas, proper quotes)
2. **Restart Cursor:** MCP servers load on startup
3. **Check Node.js:** Ensure Node.js 18+ is installed (`node --version`)
4. **Check npx:** Verify npx works (`npx --version`)

### GitHub MCP Server Not Working

- Verify token has correct permissions
- Ensure token hasn't expired
- Check that token is in quotes in settings.json

### Postgres MCP Server Connection Failed

- Verify connection string is correct
- Check database password
- Ensure Supabase project is active
- Try direct connection string instead of pooler

### Filesystem MCP Server Path Issues

- Use absolute paths
- Windows: Use double backslashes (`\\`) or forward slashes (`/`)
- Verify the directory exists

## Security Best Practices

1. **Never commit settings.json to version control**
2. **Restrict GitHub token scopes** to only what's needed
3. **Use database connection pooling** for better security
4. **Rotate credentials regularly**
5. **Use read-only database users** when possible

## Additional MCP Servers

You can add more MCP servers as needed:

- **Sequential Thinking:** Enhanced AI reasoning
  ```json
  "sequential-thinking": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
  }
  ```

- **Memory:** Persistent memory for the AI
  ```json
  "memory": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"]
  }
  ```

## Learn More

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol)
- [Cursor MCP Guide](https://docs.cursor.com/context/model-context-protocol)

