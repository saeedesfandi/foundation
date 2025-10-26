"use client";

import {useState} from "react";
import {getSettings} from "@/lib/api/settings";
import {getProfile} from "@/lib/api/profile";
import {Settings} from "@/types/settings";
import {Profile} from "@/types/profile";

export function useAppProvider() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isAppLoading, setIsAppLoading] = useState(true);  // FIXME
    const [appError, setAppError] = useState<string | null>(null);

    const fetchAppData = async () => {
        setIsAppLoading(true);
        setAppError(null);
        try {
            const settingsData = await getSettings();
            setSettings(settingsData);

            if (settings) {
                try {
                    // TODO
                } catch (error) {
                    console.error("Failed:", error);
                    setAppError("Failed");
                }
            }
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setAppError("Failed to load user profile");
        } finally {
            setIsAppLoading(false);
        }
    };

    return {
        settings,
        profile,
        isAppLoading,
        appError,
        setSettings,
        setProfile,
        fetchAppData,
    };
}
