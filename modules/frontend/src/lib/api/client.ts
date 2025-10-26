import {getSession, signOut} from "next-auth/react";

const BASE_URL = process.env.APP_PUBLIC_API_URL || "https://foundation.deepland.ir/backend/api/";


export async function apiFetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    const session = await getSession();
    const headers = new Headers(options.headers || {});

    /* @ts-expect-error fixme */
    const token = session?.accessToken;
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    } else {
        console.warn("No access token found in session");
        await signOut({redirectTo: "/panel/login", redirect: true});
        throw new Error("Unauthorized - Logged out");
    }

    headers.set("Content-Type", "application/json");

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        await signOut({redirectTo: "/panel/login", redirect: true});
        throw new Error("Unauthorized - Logged out");
    }

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${await response.text()}`);
    }

    if (response.status === 204 || response.status === 205) {
        return null;
    }

    return response.json();
}
