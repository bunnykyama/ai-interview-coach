import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  ChevronRight,
  Download,
  Eye,
  FileText,
  List,
  Mic,
  Star,
  Users,
} from "lucide-react";
import { DownloadCodeButton } from "../components/DownloadCodeButton";
import { FadeInSection } from "../components/FadeInSection";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useCountUp } from "../hooks/useCountUp";

// ─── Hero Section ──────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen pt-16 overflow-hidden hero-gradient">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(at 30% 20%, oklch(0.82 0.08 260 / 0.4) 0px, transparent 50%), radial-gradient(at 85% 15%, oklch(0.8 0.07 280 / 0.35) 0px, transparent 50%), radial-gradient(at 10% 70%, oklch(0.87 0.05 250 / 0.3) 0px, transparent 50%)",
        }}
      />
      <div className="absolute top-32 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-12 translate-x-24 pointer-events-none" />
      <div className="absolute bottom-16 left-0 w-80 h-80 bg-indigo-100/40 rounded-full blur-3xl translate-y-12 -translate-x-16 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              AI-Powered Interview Platform
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
              Practice Interviews{" "}
              <span className="gradient-text">with AI.</span>
              <br />
              Get Real-Time Feedback.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-[480px]">
              Improve your confidence, communication, and technical skills using
              voice + face analysis powered by AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/signup">
                <Button
                  data-ocid="hero.primary_button"
                  size="lg"
                  className="bg-brand-gradient hover:opacity-90 text-white shadow-lg btn-glow transition-all duration-200 font-medium text-base px-8 w-full sm:w-auto"
                >
                  Get Started Free
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Button
                data-ocid="hero.secondary_button"
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 font-medium text-base px-8 w-full sm:w-auto"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2"
                  role="img"
                  aria-label="Play video"
                >
                  <title>Play video</title>
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {(["P", "R", "A"] as const).map((initial, i) => (
                  <div
                    key={initial}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, oklch(${0.45 + i * 0.05} 0.2 ${260 + i * 15}), oklch(${0.55 + i * 0.03} 0.18 ${275 + i * 10}))`,
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span>{" "}
                students already practicing
              </div>
            </div>
          </div>

          {/* Right column - Animated illustration */}
          <div className="relative flex items-center justify-center lg:justify-end h-[500px]">
            {/* Main monitor/screen */}
            <div className="relative">
              <div className="w-72 h-52 rounded-2xl bg-white shadow-card-hover border border-border overflow-hidden">
                {/* Monitor top bar */}
                <div className="h-8 bg-secondary/80 flex items-center gap-2 px-3 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-muted-foreground mx-auto font-medium">
                    AI Interviewer
                  </span>
                </div>
                {/* Monitor content */}
                <div className="flex flex-col items-center justify-center h-[calc(100%-2rem)] gap-3 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                  {/* AI face */}
                  <div className="w-16 h-16 rounded-full bg-brand-gradient shadow-lg flex items-center justify-center animate-bounce-subtle">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      role="img"
                      aria-label="AI interviewer avatar"
                    >
                      <title>AI interviewer avatar</title>
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
                      <circle
                        cx="9"
                        cy="7"
                        r="0.5"
                        fill="white"
                        stroke="none"
                      />
                      <circle
                        cx="15"
                        cy="7"
                        r="0.5"
                        fill="white"
                        stroke="none"
                      />
                      <path d="M10 10 Q12 11.5 14 10" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-foreground">
                      Tell me about yourself
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      AI Interviewer is listening...
                    </p>
                  </div>
                  {/* Sound wave */}
                  <div className="flex items-center gap-0.5">
                    {[
                      "3a",
                      "5b",
                      "8c",
                      "6d",
                      "9e",
                      "7f",
                      "5g",
                      "8h",
                      "4i",
                      "6j",
                      "9k",
                      "5l",
                    ].map((key, i) => {
                      const heights = [3, 5, 8, 6, 9, 7, 5, 8, 4, 6, 9, 5];
                      const h = heights[i] ?? 5;
                      return (
                        <div
                          key={key}
                          className="w-1 rounded-full bg-primary/60"
                          style={{
                            height: `${h * 2}px`,
                            animation: `float ${0.5 + (i % 3) * 0.15}s ease-in-out infinite`,
                            animationDelay: `${i * 0.05}s`,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Student figure below monitor */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                  S
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Student
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-muted-foreground">
                      Microphone active
                    </span>
                  </div>
                </div>
                <div className="ml-2 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>

            {/* Floating score cards */}
            <div
              className="absolute -top-4 -left-6 glass-card rounded-xl p-3 shadow-card animate-float"
              style={{ zIndex: 10 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    role="img"
                    aria-label="Trending up"
                  >
                    <title>Trending up</title>
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Confidence
                  </p>
                  <p className="text-sm font-bold text-green-700">92%</p>
                </div>
              </div>
            </div>

            <div
              className="absolute top-16 -right-10 glass-card rounded-xl p-3 shadow-card animate-float-delayed"
              style={{ zIndex: 10 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    role="img"
                    aria-label="Chat bubble"
                  >
                    <title>Chat bubble</title>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Communication
                  </p>
                  <p className="text-sm font-bold text-blue-700">88%</p>
                </div>
              </div>
            </div>

            <div
              className="absolute -bottom-2 -left-4 glass-card rounded-xl p-3 shadow-card animate-float-slow"
              style={{ zIndex: 10 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                    role="img"
                    aria-label="Technical layers"
                  >
                    <title>Technical layers</title>
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Technical</p>
                  <p className="text-sm font-bold text-purple-700">85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ──────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Real-Time Voice Interview",
      description:
        "Talk naturally with AI-powered questions and get instant feedback on your responses.",
      points: [
        "AI asks smart questions",
        "Natural conversation flow",
        "Instant feedback",
      ],
      bgClass: "bg-blue-100",
      textClass: "text-blue-700",
      ocid: "features.card.1",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Body Language Analysis",
      description:
        "Advanced facial expression tracking monitors eye contact, confidence, and non-verbal cues.",
      points: [
        "Facial expression tracking",
        "Eye contact monitoring",
        "Confidence scoring",
      ],
      bgClass: "bg-purple-100",
      textClass: "text-purple-700",
      ocid: "features.card.2",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Performance Dashboard",
      description:
        "Get overall scores, detailed breakdowns, and personalized tips to improve faster.",
      points: [
        "Overall score tracking",
        "Detailed breakdown",
        "Personalized tips",
      ],
      bgClass: "bg-green-100",
      textClass: "text-green-700",
      ocid: "features.card.3",
    },
  ] as const;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Core Features
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Why AI Interview Coach?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A complete suite of tools designed to make you interview-ready with
            precision AI feedback.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <FadeInSection
              key={feature.ocid}
              delay={([0, 100, 200] as const)[i]}
            >
              <div
                data-ocid={feature.ocid}
                className="group relative bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bgClass} ${feature.textClass} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                <ul className="mt-auto space-y-2">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={feature.textClass}
                        role="img"
                        aria-label="Checkmark"
                      >
                        <title>Checkmark</title>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works Section ──────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: "1",
      title: "Choose Your Job Role",
      desc: "Select from 50+ job categories or add a custom role for tailored questions.",
      color: "from-blue-500 to-blue-600",
    },
    {
      num: "2",
      title: "Start Live AI Interview",
      desc: "Engage in a real-time voice interview with our intelligent AI interviewer.",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      num: "3",
      title: "Get Performance Analysis",
      desc: "Receive detailed scores for confidence, communication, and technical skills.",
      color: "from-violet-500 to-violet-600",
    },
    {
      num: "4",
      title: "Improve & Track Progress",
      desc: "Review feedback, practice again, and watch your scores improve over time.",
      color: "from-purple-500 to-purple-600",
    },
  ] as const;

  return (
    <section data-ocid="how-it-works.section" className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Simple Process
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            From setup to improvement in four straightforward steps.
          </p>
        </FadeInSection>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-300 via-violet-300 to-purple-300 opacity-60" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeInSection
                key={step.num}
                delay={([0, 100, 200, 300] as const)[i]}
              >
                <div className="flex flex-col items-center text-center group">
                  <div
                    className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} text-white font-display font-bold text-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 mb-6`}
                  >
                    {step.num}
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Counter ─────────────────────────────────────────────────────────
function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <div className="stat-counter font-display text-4xl sm:text-5xl font-extrabold text-white mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-blue-100 text-sm font-medium tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <section
      data-ocid="stats.section"
      className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <StatItem value={10000} suffix="+" label="Students" />
          <StatItem value={50000} suffix="+" label="Interviews Completed" />
          <StatItem value={95} suffix="%" label="Confidence Improvement" />
          <StatItem value={100} suffix="%" label="AI Powered" />
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer Intern",
      quote:
        "The AI feedback was incredibly accurate. I improved my confidence score by 40% in just 2 weeks! The voice analysis really helped me understand my communication gaps.",
      initials: "PS",
      gradient: "from-blue-500 to-indigo-600",
      ocid: "testimonials.card.1",
    },
    {
      name: "Rahul Verma",
      role: "Product Manager Aspirant",
      quote:
        "The body language analysis feature is mind-blowing. I didn't realize how much I was fidgeting during interviews. This platform literally transformed my interview style.",
      initials: "RV",
      gradient: "from-indigo-500 to-purple-600",
      ocid: "testimonials.card.2",
    },
    {
      name: "Aisha Khan",
      role: "MBA Student",
      quote:
        "This platform helped me crack my dream company interview. The STAR method guide is amazing! My structured answers impressed every interviewer I spoke with.",
      initials: "AK",
      gradient: "from-violet-500 to-pink-500",
      ocid: "testimonials.card.3",
    },
  ] as const;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Student Stories
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Real feedback from students who transformed their interview skills.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeInSection key={t.ocid} delay={([0, 100, 200] as const)[i]}>
              <div
                data-ocid={t.ocid}
                className="bg-white rounded-2xl p-6 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {(["s1", "s2", "s3", "s4", "s5"] as const).map((sk) => (
                    <Star
                      key={sk}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Free Tools Section ────────────────────────────────────────────────────
function FreeToolsSection() {
  const tools = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Resume Analyzer",
      desc: "Upload your resume and get AI-powered suggestions to make it stand out.",
      bgClass: "bg-blue-100",
      textClass: "text-blue-700",
      ocid: "tools.card.1",
      btnOcid: "tools.try_button.1",
    },
    {
      icon: <List className="w-6 h-6" />,
      title: "Common Questions",
      desc: "Access 500+ frequently asked interview questions with sample answers.",
      bgClass: "bg-green-100",
      textClass: "text-green-700",
      ocid: "tools.card.2",
      btnOcid: "tools.try_button.2",
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "STAR Method Guide",
      desc: "Learn the Situation-Task-Action-Result framework to structure your answers.",
      bgClass: "bg-yellow-100",
      textClass: "text-yellow-700",
      ocid: "tools.card.3",
      btnOcid: "tools.try_button.3",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "HR Mock Interview",
      desc: "Practice HR round questions with our conversational AI interviewer.",
      bgClass: "bg-purple-100",
      textClass: "text-purple-700",
      ocid: "tools.card.4",
      btnOcid: "tools.try_button.4",
    },
  ] as const;

  return (
    <section className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Free Resources
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Free Interview Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start practicing right away with our free collection of interview
            resources.
          </p>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <FadeInSection key={tool.ocid}>
              <div
                data-ocid={tool.ocid}
                className="bg-white rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${tool.bgClass} ${tool.textClass} flex items-center justify-center mb-4`}
                >
                  {tool.icon}
                </div>
                <h3 className="font-display font-bold text-foreground text-sm mb-2">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">
                  {tool.desc}
                </p>
                <Button
                  data-ocid={tool.btnOcid}
                  size="sm"
                  variant="outline"
                  className="w-full border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60 transition-all text-xs font-medium"
                >
                  Try Now
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Download Section ──────────────────────────────────────────────────────
function DownloadSection() {
  const downloads = [
    {
      title: "Interview Feedback PDF",
      desc: "Detailed feedback from your latest session",
      ocid: "downloads.button.1",
    },
    {
      title: "Confidence Report",
      desc: "Track your confidence trend over time",
      ocid: "downloads.button.2",
    },
    {
      title: "Performance Summary",
      desc: "Complete skills breakdown & improvement plan",
      ocid: "downloads.button.3",
    },
  ] as const;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-3xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                Download Your Report
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Export your performance data in multiple formats to share with
                mentors or track your journey.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {downloads.map((dl) => (
                <div
                  key={dl.ocid}
                  className="bg-white rounded-xl p-5 border border-blue-200/80 shadow-xs flex flex-col items-center text-center gap-3 hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Download className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {dl.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dl.desc}
                    </p>
                  </div>
                  <Button
                    data-ocid={dl.ocid}
                    size="sm"
                    className="w-full bg-brand-gradient hover:opacity-90 text-white btn-glow transition-all text-xs font-medium"
                  >
                    <Download className="w-3 h-3 mr-1.5" />
                    Download
                  </Button>
                </div>
              ))}
              {/* Source Code Download */}
              <DownloadCodeButton variant="card" />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─── Education Bot Section ─────────────────────────────────────────────────
function EducationBotSection() {
  return (
    <section className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Bot */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold w-fit">
                AI Study Companion
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Meet Your AI Study Companion
              </h2>

              <div className="flex gap-4 items-start">
                {/* Bot avatar */}
                <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce-subtle">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    role="img"
                    aria-label="AI bot avatar"
                  >
                    <title>AI bot avatar</title>
                    <rect x="3" y="8" width="18" height="13" rx="3" />
                    <circle cx="9" cy="14" r="1.5" fill="white" stroke="none" />
                    <circle
                      cx="15"
                      cy="14"
                      r="1.5"
                      fill="white"
                      stroke="none"
                    />
                    <path d="M9 10V7a3 3 0 0 1 6 0v3" strokeLinecap="round" />
                    <path d="M7 8h10" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Speech bubble */}
                <div className="relative bg-white rounded-2xl rounded-tl-sm p-5 border border-border shadow-card">
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    Hi! I&apos;m your{" "}
                    <span className="font-semibold text-primary">
                      AI Interview Coach Bot
                    </span>
                    . The Dashboard is your personal command center — track your
                    interview scores, review feedback, and follow your
                    improvement journey. Ready to level up?
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0s" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>

              <Link to="/dashboard" className="w-fit">
                <Button
                  data-ocid="bot.primary_button"
                  size="lg"
                  className="bg-brand-gradient hover:opacity-90 text-white shadow-lg btn-glow transition-all font-medium"
                >
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Right - Dashboard preview card */}
            <div className="bg-white rounded-2xl p-6 border border-border shadow-card-hover">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Your Dashboard
                  </p>
                  <p className="font-display font-bold text-foreground">
                    Performance Overview
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    {
                      label: "Total Interviews",
                      value: "12",
                      color: "bg-blue-50 border-blue-200",
                      text: "text-blue-700",
                    },
                    {
                      label: "Avg Score",
                      value: "87%",
                      color: "bg-green-50 border-green-200",
                      text: "text-green-700",
                    },
                    {
                      label: "Confidence",
                      value: "91%",
                      color: "bg-purple-50 border-purple-200",
                      text: "text-purple-700",
                    },
                    {
                      label: "Improvement",
                      value: "+23%",
                      color: "bg-orange-50 border-orange-200",
                      text: "text-orange-700",
                    },
                  ] as const
                ).map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.color} border rounded-xl p-4`}
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p
                      className={`font-display font-bold text-xl ${stat.text}`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              {/* Mini chart */}
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  Score Trend
                </p>
                <div className="flex items-end gap-2 h-16">
                  {(
                    [
                      { v: 45, k: "w1" },
                      { v: 58, k: "w2" },
                      { v: 62, k: "w3" },
                      { v: 71, k: "w4" },
                      { v: 75, k: "w5" },
                      { v: 82, k: "w6" },
                      { v: 87, k: "w7" },
                    ] as const
                  ).map(({ v, k }) => (
                    <div
                      key={k}
                      className="flex-1 rounded-sm bg-gradient-to-t from-primary/80 to-primary/30"
                      style={{ height: `${v}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────
function AboutSection() {
  const icons = [
    { emoji: "🧠", label: "AI Models" },
    { emoji: "🎙️", label: "Voice Analysis" },
    { emoji: "📊", label: "Performance" },
    { emoji: "🛡️", label: "Privacy" },
    { emoji: "⭐", label: "Excellence" },
    { emoji: "🎓", label: "Education" },
  ] as const;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            Our Mission
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground mb-6">
            About AI Interview Coach
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-12">
            AI Interview Coach uses advanced AI models to simulate realistic
            interviews and provide voice, vision, and performance analysis to
            help students crack their dream jobs. Built by educators and
            engineers who believe everyone deserves a fair shot at their dream
            career.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {icons.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-200 border border-border">
                  {item.emoji}
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─── Landing Page ──────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <FreeToolsSection />
        <DownloadSection />
        <EducationBotSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
