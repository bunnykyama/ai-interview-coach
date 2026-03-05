import { Button } from "@/components/ui/button";
import { Code2, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { downloadSourceCode } from "../utils/downloadSourceCode";

interface DownloadCodeButtonProps {
  variant?: "card" | "inline";
  className?: string;
}

export function DownloadCodeButton({
  variant = "inline",
  className = "",
}: DownloadCodeButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadSourceCode();
    } finally {
      setIsDownloading(false);
    }
  }

  if (variant === "card") {
    return (
      <div className="bg-white rounded-xl p-5 border border-blue-200/80 shadow-xs flex flex-col items-center text-center gap-3 hover:shadow-card transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
          <Code2 className="w-5 h-5 text-indigo-700" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">
            Source Code (ZIP)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Download the full app source code
          </p>
        </div>
        <Button
          data-ocid="downloads.source_code.button"
          size="sm"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full bg-brand-gradient hover:opacity-90 text-white btn-glow transition-all text-xs font-medium disabled:opacity-70"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
              Preparing...
            </>
          ) : (
            <>
              <Download className="w-3 h-3 mr-1.5" />
              Download ZIP
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      data-ocid="dashboard.download_source.button"
      variant="outline"
      onClick={handleDownload}
      disabled={isDownloading}
      className={`border-border text-foreground hover:bg-secondary transition-all text-sm font-medium disabled:opacity-70 ${className}`}
    >
      {isDownloading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Preparing...
        </>
      ) : (
        <>
          <Code2 className="w-4 h-4 mr-2" />
          Download Source
        </>
      )}
    </Button>
  );
}
