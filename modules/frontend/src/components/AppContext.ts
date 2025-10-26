"use client";

import {createContext, useContext} from "react";
import { Settings } from "@/types/settings";
import { Profile } from "@/types/profile";

interface AppContextType {
    settings: Settings | null;
    profile: Profile | null;
    setSettings: (settings: Settings | null) => void;
    setProfile: (profile: Profile | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
}

export default AppContext;

