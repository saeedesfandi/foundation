"use client";

import {ReactNode, useEffect} from "react";
import {DynamicLoading} from "@/components/ui2/DynamicLoading";
import {useAppProvider} from "@/hooks/app-provider";
import AppContext from "@/components/AppContext";
import DynamicError from "@/components/ui2/DynamicError";

export function AppProvider({children}: { children: ReactNode }) {
    const {
        settings,
        profile,
        isAppLoading,
        appError,
        setSettings,
        setProfile,
        fetchAppData,
    } = useAppProvider();

    useEffect(() => {
        void fetchAppData();
    }, []);

    if (isAppLoading) return <DynamicLoading fullscreen={true}/>;
    if (appError) return <DynamicError description={appError}/>;
    if (!settings) return <DynamicError description="Settings not loaded."/>;

    return (
        <AppContext.Provider
            value={{
                settings,
                profile,
                setSettings,
                setProfile,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
