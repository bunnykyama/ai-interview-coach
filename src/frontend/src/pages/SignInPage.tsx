import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

export function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!email.trim()) newErrors.email = "Email or username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate async
    await new Promise((r) => setTimeout(r, 600));

    // Store user name from email prefix
    const userName = email.includes("@") ? email.split("@")[0] : email;
    const displayName =
      userName.charAt(0).toUpperCase() +
      userName.slice(1).replace(/[._-]/g, " ");
    localStorage.setItem("userName", displayName);

    setIsLoading(false);
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-brand-gradient flex items-center justify-center shadow-sm">
              <svg
                width="20"
                height="20"
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
            <span className="font-display font-bold text-foreground">
              AI Interview Coach
            </span>
          </div>

          <h1 className="font-display text-2xl font-bold text-foreground mb-1">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Continue your interview preparation journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email/Username */}
            <div className="space-y-1.5">
              <Label
                htmlFor="signin-email"
                className="text-sm font-medium text-foreground"
              >
                Email or Username
              </Label>
              <Input
                id="signin-email"
                data-ocid="signin.email.input"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                aria-label="Email or username"
                aria-describedby={
                  errors.email ? "signin-email-error" : undefined
                }
              />
              {errors.email && (
                <p
                  id="signin-email-error"
                  className="text-xs text-destructive mt-1"
                  data-ocid="signin.email.error_state"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="signin-password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => {}}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="signin-password"
                  data-ocid="signin.password.input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  aria-label="Password"
                  aria-describedby={
                    errors.password ? "signin-password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  id="signin-password-error"
                  className="text-xs text-destructive mt-1"
                  data-ocid="signin.password.error_state"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <Checkbox
                id="remember-me"
                data-ocid="signin.remember_me.checkbox"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                aria-label="Remember me"
              />
              <Label
                htmlFor="remember-me"
                className="text-sm text-muted-foreground cursor-pointer select-none"
              >
                Remember me for 30 days
              </Label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="signin.submit_button"
              disabled={isLoading}
              className="w-full bg-brand-gradient hover:opacity-90 text-white shadow-sm btn-glow transition-all font-medium text-sm h-11"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 mr-2 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    role="img"
                    aria-label="Loading"
                  >
                    <title>Loading</title>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
              data-ocid="signin.signup.link"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs">
            Protected by AI Interview Coach Security
          </p>
        </div>
      </div>
    </div>
  );
}
