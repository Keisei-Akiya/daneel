import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { desc } from "void/db";
import { db } from "void/db";
import { kv } from "void/kv";
import { conversations } from "@schema";
import { generateChat } from "@daneel/backend";

export const app = new Hono()
  .basePath("/api")
  .get("/ping", (c) => c.json({ ok: true }))
  .get("/conversations", async (c) =>
    c.json(await db.select().from(conversations).orderBy(desc(conversations.createdAt)).limit(50)),
  )
  .get("/session/:id", async (c) => c.json(await kv.get(`session:${c.req.param("id")}`)))
  .get("/chat", (c) =>
    streamSSE(c, async (stream) => {
      for await (const chunk of generateChat(c.req.query("q") ?? "hi")) {
        await stream.writeSSE({ data: JSON.stringify(chunk) });
      }
    }),
  );
export type AppType = typeof app;
