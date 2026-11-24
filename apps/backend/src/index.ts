import type { ChatChunk } from '@daneel/contracts'
export async function* generateChat(prompt: string): AsyncGenerator<ChatChunk> {
  for (let i = 0; i < 5; i++) {
    await new Promise((r) => setTimeout(r, 400))
    yield { index: i, text: `${prompt}-${i}` }
  }
}
