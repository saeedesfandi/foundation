"use client";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {DynamicIcon} from "lucide-react/dynamic";

export default function DynamicAlert(
    {icon, title, description}:
    { icon: string, title: string, description: string }
) {

    return (
        <Alert>
            {/* @ts-expect-error fixme */}
            <DynamicIcon name={icon} className="h-4 w-4"/>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
}
