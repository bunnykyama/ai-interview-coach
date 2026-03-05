import JSZip from "jszip";

// Import all source files as raw text using Vite's ?raw suffix
import appRaw from "../App.tsx?raw";
import backendDtsRaw from "../backend.d.ts?raw";
import backendRaw from "../backend.ts?raw";
import fadeInSectionRaw from "../components/FadeInSection.tsx?raw";
import footerRaw from "../components/Footer.tsx?raw";
import navbarRaw from "../components/Navbar.tsx?raw";
import configRaw from "../config.ts?raw";
import useMobileRaw from "../hooks/use-mobile.tsx?raw";
import useActorRaw from "../hooks/useActor.ts?raw";
import useCountUpRaw from "../hooks/useCountUp.ts?raw";
import useFadeInRaw from "../hooks/useFadeIn.ts?raw";
import useInternetIdentityRaw from "../hooks/useInternetIdentity.ts?raw";
import useQueriesRaw from "../hooks/useQueries.ts?raw";
import mainRaw from "../main.tsx?raw";
import dashboardPageRaw from "../pages/DashboardPage.tsx?raw";
import landingPageRaw from "../pages/LandingPage.tsx?raw";
import signInPageRaw from "../pages/SignInPage.tsx?raw";
import signUpPageRaw from "../pages/SignUpPage.tsx?raw";

export async function downloadSourceCode(): Promise<void> {
  const zip = new JSZip();

  // Root frontend config files
  const frontend = zip.folder("ai-interview-coach");
  if (!frontend) return;

  const src = frontend.folder("src");
  if (!src) return;

  const pages = src.folder("pages");
  const components = src.folder("components");
  const hooks = src.folder("hooks");
  const utils = src.folder("utils");

  if (!pages || !components || !hooks || !utils) return;

  // src root
  src.file("App.tsx", appRaw);
  src.file("main.tsx", mainRaw);
  src.file("backend.d.ts", backendDtsRaw);
  src.file("backend.ts", backendRaw);
  src.file("config.ts", configRaw);

  // pages
  pages.file("LandingPage.tsx", landingPageRaw);
  pages.file("SignUpPage.tsx", signUpPageRaw);
  pages.file("SignInPage.tsx", signInPageRaw);
  pages.file("DashboardPage.tsx", dashboardPageRaw);

  // components
  components.file("Navbar.tsx", navbarRaw);
  components.file("Footer.tsx", footerRaw);
  components.file("FadeInSection.tsx", fadeInSectionRaw);

  // hooks
  hooks.file("useQueries.ts", useQueriesRaw);
  hooks.file("useActor.ts", useActorRaw);
  hooks.file("useInternetIdentity.ts", useInternetIdentityRaw);
  hooks.file("useCountUp.ts", useCountUpRaw);
  hooks.file("useFadeIn.ts", useFadeInRaw);
  hooks.file("use-mobile.tsx", useMobileRaw);

  // README
  frontend.file(
    "README.md",
    `# AI Interview Coach — Source Code

This is the source code for the AI Interview Coach application, built on the Internet Computer using Caffeine AI.

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Vite
- **Backend**: Motoko (Internet Computer)
- **UI**: shadcn/ui, Radix UI, Lucide Icons
- **Routing**: TanStack Router
- **State**: TanStack Query

## Project Structure
\`\`\`
src/
  App.tsx                  # Root router setup
  main.tsx                 # Entry point
  backend.d.ts             # Backend type definitions
  backend.ts               # Backend actor bindings
  config.ts                # App configuration
  pages/
    LandingPage.tsx         # Landing page (hero, features, stats, etc.)
    SignUpPage.tsx           # Sign up with OTP timer
    SignInPage.tsx           # Sign in
    DashboardPage.tsx        # User dashboard with stats & interviews
  components/
    Navbar.tsx              # Top navigation bar
    Footer.tsx              # Site footer
    FadeInSection.tsx       # Scroll-triggered fade-in wrapper
  hooks/
    useQueries.ts           # TanStack Query hooks for backend calls
    useActor.ts             # ICP actor hook
    useInternetIdentity.ts  # Internet Identity authentication
    useCountUp.ts           # Animated number counter hook
    useFadeIn.ts            # Intersection observer fade-in hook
    use-mobile.tsx          # Mobile breakpoint detection hook
\`\`\`

## Getting Started
This app was generated with [Caffeine AI](https://caffeine.ai) and runs on the Internet Computer Protocol (ICP).
`,
  );

  // Generate and download
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ai-interview-coach-source.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
