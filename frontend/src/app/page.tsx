import { DailyLogCard } from "@/components/DailyLogCard";
import { LogInput } from "@/components/LogInput";
import { Sparkles } from "lucide-react";
import { getWorkLogs } from "@/lib/api";

// This is a Server Component
export default async function Home() {
  let logs: any[] = [];
  try {
    logs = await getWorkLogs();
  } catch (e) {
    console.error("Failed to fetch logs:", e);
    // Fallback to empty or error state if needed
  }

  // Sort logs by ID desc or Date desc
  logs.sort((a, b) => b.id - a.id);

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">WorkLog AI</h1>
          </div>
          <div className="text-sm text-zinc-400">
            Evan's Workspace
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* Left Column: Recent Logs */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Work Logs</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300">View All</button>
            </div>

            <div className="space-y-6">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <DailyLogCard key={log.id} log={log} />
                ))
              ) : (
                <div className="rounded-2xl border border-white/5 bg-zinc-900/30 p-8 text-center text-zinc-500">
                  No work logs generated yet. Submit some logs and generate a daily report!
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Input & Actions */}
          <div className="space-y-8">
            <div className="sticky top-24 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">New Entry</h2>
                <LogInput />
                <p className="text-xs text-zinc-500">
                  AI will analyze your text and automatically format it into the Work Log structure.
                </p>
              </div>

              {/* Stats Placeholder */}
              <div className="rounded-2xl border border-white/5 bg-zinc-900/30 p-6">
                <h3 className="mb-4 text-sm font-medium text-zinc-400">Weekly Progress</h3>
                <div className="flex items-end gap-2 h-24">
                  {[40, 70, 30, 85, 50, 60, 20].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-indigo-600/20 hover:bg-indigo-500/40 transition-colors" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
