"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SliderNavigationProps {
    onPrev: () => void;
    onNext: () => void;
    isBeginning: boolean;
    isEnd: boolean;
    className?: string;
    // Custom colors for active/inactive states
    prevColors?: {
        active: string;
        inactive: string;
    };
    nextColors?: {
        active: string;
        inactive: string;
    };
}

export function SliderNavigation({
    onPrev,
    onNext,
    isBeginning,
    isEnd,
    className,
    prevColors = {
        active: "bg-zinc-900 text-white hover:bg-zinc-700 hover:text-white",
        inactive: "bg-zinc-400 text-zinc-800"
    },
    nextColors = {
        active: "bg-zinc-900 text-white hover:bg-zinc-700 hover:text-white",
        inactive: "bg-zinc-400 text-zinc-800"
    }
}: SliderNavigationProps) {
    return (
        <div className={cn("flex gap-2", className)}>
            <Button
                variant="ghost"
                size="icon"
                onClick={onPrev}
                disabled={isBeginning}
                className={cn(
                    "h-10 w-10 rounded-lg border-none transition-all",
                    isBeginning ? prevColors.inactive + " cursor-not-allowed" : prevColors.active + " cursor-pointer"
                )}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                disabled={isEnd}
                className={cn(
                    "h-10 w-10 rounded-lg border-none transition-all",
                    isEnd ? nextColors.inactive + " cursor-not-allowed" : nextColors.active + " cursor-pointer"
                )}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    );
}
