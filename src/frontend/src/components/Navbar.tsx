import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-ocid="navbar.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="navbar.logo.link"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
                stroke="currentColor"
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
            <span className="font-display font-semibold text-foreground text-[15px] tracking-tight hidden sm:block">
              AI Interview Coach
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3">
            <Link
              to="/signin"
              data-ocid="navbar.signin.link"
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              Sign In
            </Link>
            <Link to="/signup" data-ocid="navbar.signup.link">
              <Button
                size="sm"
                className="bg-brand-gradient hover:opacity-90 text-white shadow-sm btn-glow transition-all duration-200 font-medium"
              >
                Sign Up Free
              </Button>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              role="img"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <title>{mobileOpen ? "Close menu" : "Open menu"}</title>
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-border bg-white/95 backdrop-blur-md animate-fade-in-up">
            <div className="flex flex-col gap-2">
              <Link
                to="/signin"
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-brand-gradient hover:opacity-90 text-white font-medium">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
