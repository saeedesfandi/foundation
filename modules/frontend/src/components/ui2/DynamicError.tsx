"use client";

import {AlertCircle} from "lucide-react"
import {Alert, AlertDescription, AlertTitle,} from "@/components/ui/alert"

export default function DynamicError({description}: { description: string }) {

    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4"/>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {description}
            </AlertDescription>
        </Alert>
    );
}
