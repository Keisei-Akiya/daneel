import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "daneel",
		compatibilityDate: "2026-11-23",
		entrypoint: "@tanstack/solid-start/server-entry",
	},
});
