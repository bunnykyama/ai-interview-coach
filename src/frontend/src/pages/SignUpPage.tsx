import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSaveUserProfile } from "../hooks/useQueries";

interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUpPage() {
  const navigate = useNavigate();
  const { mutateAsync: saveProfile, isPending } = useSaveUserProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown timer
  useEffect(() => {
    if (otpTimer > 0) {
      timerRef.current = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [otpTimer]);

  function handleSendOtp() {
    if (!mobile.match(/^\+?[\d\s\-()]{7,15}$/)) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Please enter a valid mobile number",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, mobile: undefined }));
    setOtpSent(true);
    setOtpTimer(60);
  }

  function handleResendOtp() {
    setOtpTimer(60);
    setOtp("");
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email";
    if (!mobile.match(/^\+?[\d\s\-()]{7,15}$/))
      newErrors.mobile = "Please enter a valid mobile number";
    if (otpSent && otp.length !== 6)
      newErrors.otp = "Please enter the 6-digit OTP";
    if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    try {
      await saveProfile({ displayName: fullName, email });
      localStorage.setItem("userName", fullName);
      navigate({ to: "/dashboard" });
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or proceed as guest.",
      );
      // Fallback: navigate anyway
      localStorage.setItem("userName", fullName);
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
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
            Create Your Account
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Start your interview prep journey today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-foreground"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                data-ocid="signup.name.input"
                type="text"
                placeholder="Priya Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
                className={
                  errors.fullName
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                aria-label="Full name"
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
              />
              {errors.fullName && (
                <p
                  id="fullName-error"
                  className="text-xs text-destructive mt-1"
                  data-ocid="signup.name.error_state"
                >
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                data-ocid="signup.email.input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
                aria-label="Email address"
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-xs text-destructive mt-1"
                  data-ocid="signup.email.error_state"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Mobile + OTP send */}
            <div className="space-y-1.5">
              <Label
                htmlFor="mobile"
                className="text-sm font-medium text-foreground"
              >
                Mobile Number
              </Label>
              <div className="flex gap-2">
                <Input
                  id="mobile"
                  data-ocid="signup.mobile.input"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  autoComplete="tel"
                  className={`flex-1 ${errors.mobile ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  aria-label="Mobile number"
                  aria-describedby={errors.mobile ? "mobile-error" : undefined}
                />
                <Button
                  type="button"
                  data-ocid="signup.send_otp.button"
                  onClick={handleSendOtp}
                  disabled={otpTimer > 0}
                  size="sm"
                  className="bg-brand-gradient hover:opacity-90 text-white text-xs font-medium whitespace-nowrap disabled:opacity-60"
                >
                  {otpTimer > 0 ? `${otpTimer}s` : "Send OTP"}
                </Button>
              </div>
              {errors.mobile && (
                <p
                  id="mobile-error"
                  className="text-xs text-destructive mt-1"
                  data-ocid="signup.mobile.error_state"
                >
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* OTP Field */}
            {otpSent && (
              <div className="space-y-1.5 animate-fade-in-up">
                <Label
                  htmlFor="otp"
                  className="text-sm font-medium text-foreground"
                >
                  Enter OTP
                </Label>
                <Input
                  id="otp"
                  data-ocid="signup.otp.input"
                  type="text"
                  inputMode="numeric"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  className={
                    errors.otp
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }
                  aria-label="One-time password"
                  aria-describedby={errors.otp ? "otp-error" : undefined}
                />
                {errors.otp && (
                  <p
                    id="otp-error"
                    className="text-xs text-destructive mt-1"
                    data-ocid="signup.otp.error_state"
                  >
                    {errors.otp}
                  </p>
                )}
                <div className="flex items-center justify-between mt-1">
                  {otpTimer > 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Resend OTP in{" "}
                      <span className="font-semibold text-primary">
                        {otpTimer}s
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-xs text-primary font-medium hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  data-ocid="signup.password.input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  aria-label="Password"
                  aria-describedby={
                    errors.password ? "password-error" : undefined
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
                  id="password-error"
                  className="text-xs text-destructive mt-1"
                  data-ocid="signup.password.error_state"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  data-ocid="signup.confirm_password.input"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  className={`pr-10 ${errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  aria-label="Confirm password"
                  aria-describedby={
                    errors.confirmPassword
                      ? "confirm-password-error"
                      : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirm-password-error"
                  className="text-xs text-destructive mt-1"
                  data-ocid="signup.confirm_password.error_state"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit error */}
            {submitError && (
              <div
                className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-xs text-destructive"
                data-ocid="signup.error_state"
              >
                {submitError}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              data-ocid="signup.submit_button"
              disabled={isPending}
              className="w-full bg-brand-gradient hover:opacity-90 text-white shadow-sm btn-glow transition-all font-medium text-sm h-11 mt-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-5">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-primary font-medium hover:underline"
              data-ocid="signup.signin.link"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
