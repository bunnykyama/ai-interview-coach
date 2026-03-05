import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  Camera,
  Download,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PlayCircle,
  Settings,
  Star,
  TrendingUp,
  Video,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import type { InterviewSession } from "../backend.d";
import { DownloadCodeButton } from "../components/DownloadCodeButton";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetDashboardStats,
  useGetInterviewSessions,
} from "../hooks/useQueries";

// ─── Sidebar ──────────────────────────────────────────────────────────────
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  onLogout: () => void;
}

function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  onLogout,
}: SidebarProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "sidebar.dashboard.link",
    },
    {
      id: "interviews",
      label: "Interviews",
      icon: Video,
      ocid: "sidebar.interviews.link",
    },
    {
      id: "reports",
      label: "Reports",
      icon: BarChart3,
      ocid: "sidebar.reports.link",
    },
    { id: "tools", label: "Tools", icon: Wrench, ocid: "sidebar.tools.link" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      ocid: "sidebar.settings.link",
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            role="img"
            aria-label="AI Interview Coach logo"
          >
            <title>AI Interview Coach logo</title>
            <path d="M12 2a10 10 0 0 0-7.743 16.33L3 22l3.67-1.257A10 10 0 1 0 12 2z" />
            <path
              d="M8 12h.01M12 12h.01M16 12h.01"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-display font-semibold text-foreground text-sm">
          AI Interview Coach
        </span>
        {/* Close button (mobile) */}
        <button
          type="button"
          className="ml-auto lg:hidden p-1 hover:bg-secondary rounded-md transition-colors"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              type="button"
              key={item.id}
              data-ocid={item.ocid}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          type="button"
          data-ocid="sidebar.logout.button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-56 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 flex-shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40" aria-hidden="true">
          <button
            type="button"
            className="absolute inset-0 w-full bg-black/40 backdrop-blur-sm cursor-default"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            tabIndex={-1}
          />
          <aside className="relative z-50 w-64 h-full bg-sidebar border-r border-sidebar-border">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}

// ─── Stats Cards ──────────────────────────────────────────────────────────
function StatsCards() {
  const { data: stats, isLoading } = useGetDashboardStats();

  const cards = [
    {
      label: "Total Interviews",
      value: stats ? Number(stats.totalInterviews).toString() : "—",
      icon: Camera,
      color: "blue",
      bgClass: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-500",
      textClass: "text-blue-700",
      ocid: "dashboard.stats.card.1",
    },
    {
      label: "Avg Score",
      value: stats ? `${Number(stats.averageScore)}%` : "—",
      icon: Star,
      color: "green",
      bgClass: "bg-green-50 border-green-200",
      iconBg: "bg-green-500",
      textClass: "text-green-700",
      ocid: "dashboard.stats.card.2",
    },
    {
      label: "Confidence Level",
      value: stats ? `${Number(stats.averageConfidence)}%` : "—",
      icon: TrendingUp,
      color: "purple",
      bgClass: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-500",
      textClass: "text-purple-700",
      ocid: "dashboard.stats.card.3",
    },
    {
      label: "Improvement Rate",
      value: stats ? `+${Number(stats.improvementRate)}%` : "—",
      icon: BarChart3,
      color: "orange",
      bgClass: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-500",
      textClass: "text-orange-700",
      ocid: "dashboard.stats.card.4",
    },
  ];

  if (isLoading) {
    return (
      <div
        data-ocid="dashboard.stats.loading_state"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {(["sk1", "sk2", "sk3", "sk4"] as const).map((k) => (
          <div
            key={k}
            className="bg-white rounded-xl p-5 border border-border shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-24 skeleton" />
              <Skeleton className="w-9 h-9 rounded-lg skeleton" />
            </div>
            <Skeleton className="h-7 w-16 skeleton" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.ocid}
            data-ocid={card.ocid}
            className={`${card.bgClass} border rounded-xl p-5 shadow-xs`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-muted-foreground">
                {card.label}
              </p>
              <div
                className={`w-9 h-9 rounded-lg ${card.iconBg} flex items-center justify-center`}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className={`font-display text-2xl font-bold ${card.textClass}`}>
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Format date from bigint timestamp ────────────────────────────────────
function formatTimestamp(ts: bigint): string {
  // Timestamp is in nanoseconds (ICP) or milliseconds
  const ms = ts > BigInt(1e15) ? Number(ts / BigInt(1e6)) : Number(ts);
  if (ms === 0) return "—";
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ScoreBadge({ score }: { score: bigint }) {
  const n = Number(score);
  const colorClass =
    n >= 80
      ? "bg-green-100 text-green-700"
      : n >= 60
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${colorClass}`}
    >
      {n}%
    </span>
  );
}

// ─── Recent Interviews ────────────────────────────────────────────────────
function RecentInterviews() {
  const { data: sessions, isLoading } = useGetInterviewSessions();

  // Sort by timestamp descending, take top 5
  const sorted = sessions
    ? [...sessions]
        .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
        .slice(0, 5)
    : [];

  if (isLoading) {
    return (
      <div
        data-ocid="dashboard.interviews.table"
        className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden"
      >
        <div className="p-5 border-b border-border">
          <Skeleton className="h-5 w-40 skeleton" />
        </div>
        <div className="p-4 space-y-3">
          {(["r1", "r2", "r3"] as const).map((k) => (
            <Skeleton key={k} className="h-12 w-full skeleton rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div
        data-ocid="dashboard.interviews.table"
        className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden"
      >
        <div className="p-5 border-b border-border">
          <h3 className="font-display font-bold text-foreground">
            Recent Interviews
          </h3>
        </div>
        <div
          data-ocid="dashboard.interviews.empty_state"
          className="flex flex-col items-center justify-center py-16 px-6 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Video className="w-7 h-7 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground mb-2">
            No interviews yet
          </h4>
          <p className="text-sm text-muted-foreground max-w-xs mb-4">
            Start your first AI interview to see your performance data here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      data-ocid="dashboard.interviews.table"
      className="bg-white rounded-2xl border border-border shadow-xs overflow-hidden"
    >
      <div className="p-5 border-b border-border flex items-center justify-between">
        <h3 className="font-display font-bold text-foreground">
          Recent Interviews
        </h3>
        <span className="text-xs text-muted-foreground">
          {sorted.length} sessions
        </span>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left text-xs font-semibold text-muted-foreground px-5 py-3">
                Job Role
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">
                Date
              </th>
              <th className="text-center text-xs font-semibold text-muted-foreground px-3 py-3">
                Overall
              </th>
              <th className="text-center text-xs font-semibold text-muted-foreground px-3 py-3">
                Confidence
              </th>
              <th className="text-center text-xs font-semibold text-muted-foreground px-3 py-3">
                Comms
              </th>
              <th className="text-center text-xs font-semibold text-muted-foreground px-3 py-3">
                Technical
              </th>
              <th className="text-left text-xs font-semibold text-muted-foreground px-3 py-3">
                Feedback
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((session: InterviewSession, i) => (
              <tr
                key={`session-${session.jobRole}-${String(session.timestamp)}-${i}`}
                data-ocid={`dashboard.interview.row.${i + 1}`}
                className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Video className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
                      {session.jobRole}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3.5 text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimestamp(session.timestamp)}
                </td>
                <td className="px-3 py-3.5 text-center">
                  <ScoreBadge score={session.overallScore} />
                </td>
                <td className="px-3 py-3.5 text-center">
                  <ScoreBadge score={session.confidenceScore} />
                </td>
                <td className="px-3 py-3.5 text-center">
                  <ScoreBadge score={session.communicationScore} />
                </td>
                <td className="px-3 py-3.5 text-center">
                  <ScoreBadge score={session.technicalScore} />
                </td>
                <td className="px-3 py-3.5">
                  <p className="text-xs text-muted-foreground truncate max-w-[160px]">
                    {session.feedback}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-border">
        {sorted.map((session: InterviewSession, i) => (
          <div
            key={`m-session-${session.jobRole}-${String(session.timestamp)}-${i}`}
            data-ocid={`dashboard.interview.row.${i + 1}`}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Video className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {session.jobRole}
                </span>
              </div>
              <ScoreBadge score={session.overallScore} />
            </div>
            <div className="flex gap-2 flex-wrap ml-9">
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(session.timestamp)}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                Conf:{" "}
                <span className="font-medium text-foreground">
                  {Number(session.confidenceScore)}%
                </span>
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">
                Tech:{" "}
                <span className="font-medium text-foreground">
                  {Number(session.technicalScore)}%
                </span>
              </span>
            </div>
            {session.feedback && (
              <p className="text-xs text-muted-foreground mt-2 ml-9 line-clamp-2">
                {session.feedback}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Education Bot Widget ─────────────────────────────────────────────────
function BotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat bubble */}
      {open && (
        <div
          data-ocid="bot.panel"
          className="w-72 bg-white rounded-2xl shadow-2xl border border-border p-4 animate-fade-in-up"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-gradient flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  AI Coach Bot
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] text-muted-foreground">
                    Online
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close bot chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-secondary/60 rounded-xl p-3">
            <p className="text-xs text-foreground/85 leading-relaxed">
              Need help? I can guide you through your dashboard features! Try
              starting a new interview or checking your latest reports.
            </p>
          </div>
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs border-primary/30 text-primary hover:bg-primary/5"
            >
              View Reports
            </Button>
            <Button
              size="sm"
              className="flex-1 text-xs bg-brand-gradient hover:opacity-90 text-white"
            >
              Start Interview
            </Button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        data-ocid="bot.toggle.button"
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full bg-brand-gradient shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center animate-pulse-glow"
        aria-label="Toggle AI bot chat"
      >
        {open ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
}

// ─── Dashboard Main ────────────────────────────────────────────────────────
export function DashboardPage() {
  const navigate = useNavigate();
  const { clear } = useInternetIdentity();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const rawName = localStorage.getItem("userName") ?? "Student";
  const userName = rawName || "Student";

  // Get avatar initials
  const initials = userName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  function handleLogout() {
    clear();
    localStorage.removeItem("userName");
    navigate({ to: "/" });
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-border px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger (mobile) */}
            <button
              type="button"
              data-ocid="dashboard.menu.toggle"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-bold text-foreground text-sm sm:text-base">
                Welcome back, <span className="gradient-text">{userName}!</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Here&apos;s your interview performance overview.
              </p>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {initials || "S"}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-foreground">
                {userName}
              </p>
              <p className="text-[10px] text-muted-foreground">Student</p>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Stats */}
          <StatsCards />

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3">
            <Button
              data-ocid="dashboard.start_interview.button"
              className="bg-brand-gradient hover:opacity-90 text-white shadow-sm btn-glow transition-all font-medium text-sm"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Start New Interview
            </Button>
            <Button
              data-ocid="dashboard.view_reports.button"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60 transition-all text-sm font-medium"
              onClick={() => setActiveTab("reports")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Reports
            </Button>
            <Button
              data-ocid="dashboard.download_report.button"
              variant="outline"
              className="border-border text-foreground hover:bg-secondary transition-all text-sm font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <DownloadCodeButton variant="inline" />
          </div>

          {/* Recent Interviews */}
          <RecentInterviews />

          {/* Bottom CTA for empty sessions */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-foreground mb-1">
                Ready to practice?
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose a job role and start a live AI interview session today.
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button className="bg-brand-gradient hover:opacity-90 text-white shadow-sm btn-glow transition-all text-sm font-medium">
                <PlayCircle className="w-4 h-4 mr-2" />
                Practice Now
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Floating bot widget */}
      <BotWidget />
    </div>
  );
}
