import {apiFetch} from "../client";
import {Settings} from "@/types/core/Settings";

export async function getSettings(filters?: {
    key?: string;
    enabled?: boolean;
    page?: number;
    page_size?: number;
}): Promise<{ count: number; next: string | null; previous: string | null; results: Settings[] }> {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    return apiFetch(`settings/?${params}`, {method: "GET"});
}

export async function getSetting(settingId: string): Promise<Settings> {
    return apiFetch(`settings/${settingId}/`, {method: "GET"});
}

export async function createSystemSetting(data: {
    key: string;
    value: Record<string, any>;
}): Promise<Settings> {
    return apiFetch("settings/", {
        method: "POST",
        body: JSON.stringify(data),
    });
}

export async function updateSettings(settingId: string, data: Partial<Settings>): Promise<Settings> {
    return apiFetch(`settings/${settingId}/`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export async function deleteSystemSetting(settingId: string): Promise<void> {
    return apiFetch(`settings/${settingId}/`, {method: "DELETE"});
}

