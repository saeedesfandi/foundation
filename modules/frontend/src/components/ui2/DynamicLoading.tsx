import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

export function DynamicLoading({fullscreen, className}: { fullscreen?: boolean, className?: string }) {
    const customClassName = `${fullscreen && "h-[70vh]"}`;

    return (
        <div className={cn(
            `flex items-center justify-center gap-2 ${customClassName}`,
            className
        )}>
            {/*<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>*/}
            <Loader2 className="animate-spin text-primary"/>
            <div className="text-medium text-primary">Loading...</div>
        </div>
    );
}
