"use client";

import { AlertCircle, PackageX, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusViewProps {
  type: "error" | "empty";
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function StatusView({ type, title, message, onRetry, className }: StatusViewProps) {
  const isError = type === "error";

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-20 px-4 text-center rounded-[2rem] bg-[#ECEEF0]/50 border-2 border-dashed border-zinc-200",
      className
    )}>
      <div className={cn(
        "mb-6 flex h-20 w-20 items-center justify-center rounded-full",
        isError ? "bg-red-50 text-red-500" : "bg-zinc-100 text-[#4A69E2]"
      )}>
        {isError ? (
          <AlertCircle className="h-10 w-10" />
        ) : (
          <PackageX className="h-10 w-10" />
        )}
      </div>

      <h3 className="text-xl font-black uppercase tracking-tight text-zinc-600">
        {title || (isError ? "Something went wrong" : "No results found")}
      </h3>

      <p className="mt-2 max-w-xs text-sm font-medium text-zinc-500">
        {message || (isError
          ? "We couldn't load the latest drops. It might be a temporary connection issue."
          : "We couldn't find anything here right now.")}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-8 flex items-center gap-2 rounded-xl bg-zinc-900 px-8 py-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-zinc-800"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  );
}
