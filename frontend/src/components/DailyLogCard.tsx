import { format } from "date-fns";
import { CheckCircle, Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkLog {
    id: number;
    date: string;
    todayWork: string;
    retrospective: string;
    tomorrowAction: string;
}

interface DailyLogCardProps {
    log: WorkLog;
}

export function DailyLogCard({ log }: DailyLogCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all hover:bg-zinc-900/70">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h3 className="text-xl font-semibold text-white">
                        {format(new Date(log.date), "MMMM d, yyyy")}
                    </h3>
                    <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-indigo-400">
                        Log #{log.id}
                    </span>
                </div>

                <div className="space-y-6">
                    <Section
                        icon={<FileText className="h-5 w-5 text-emerald-400" />}
                        title="Today's Work"
                        content={log.todayWork}
                    />

                    <Section
                        icon={<Clock className="h-5 w-5 text-amber-400" />}
                        title="Retrospective"
                        content={log.retrospective}
                    />

                    <Section
                        icon={<CheckCircle className="h-5 w-5 text-indigo-400" />}
                        title="Next Actions"
                        content={log.tomorrowAction}
                    />
                </div>
            </div>
        </div>
    );
}

function Section({ icon, title, content }: { icon: React.ReactNode; title: string; content: string }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                {icon}
                {title}
            </div>
            <p className="whitespace-pre-wrap leading-relaxed text-zinc-300 text-sm">
                {content || "No content recorded."}
            </p>
        </div>
    );
}
