export type NotificationChannel = 'slack' | 'email'

export interface NotificationPayload {
  channel: NotificationChannel
  subject: string
  body: string
  metadata?: Record<string, unknown>
}

export interface NotificationAdapter {
  channel: NotificationChannel
  send: (payload: NotificationPayload) => Promise<void>
}

const slackAdapter: NotificationAdapter = {
  channel: 'slack',
  async send(payload) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[Mock Slack Notification]', payload.subject, payload.body)
    }
  },
}

const emailAdapter: NotificationAdapter = {
  channel: 'email',
  async send(payload) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[Mock Email Notification]', payload.subject, payload.body)
    }
  },
}

const adapters: NotificationAdapter[] = [slackAdapter, emailAdapter]

export async function sendNotification(payload: NotificationPayload) {
  const adapter = adapters.find(adapter => adapter.channel === payload.channel)
  if (!adapter) return
  await adapter.send(payload)
}

