import { createFileRoute } from "@tanstack/solid-router";
import { app } from "@daneel/bff";

const forward = ({ request }: { request: Request }) => app.fetch(request);

export const Route = createFileRoute("/api/$")({
  server: { handlers: { GET: forward, POST: forward } },
});
