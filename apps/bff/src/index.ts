import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import { generateChat } from '@daneel/backend'

export const app = new Hono()
  .basePath('/api')
  .get('/ping', (c) => c.json({ ok: true }))
  .get('/chat', (c) =>
    streamSSE(c, async (stream) => {
      for await (const chunk of generateChat(c.req.query('q') ?? 'hi')) {
        await stream.writeSSE({ data: JSON.stringify(chunk) })
      }
    }),
  )
export type AppType = typeof app
