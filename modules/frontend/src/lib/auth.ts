import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            authorization: {
                // params: {
                //     prompt: "login",
                // },
            },
        }),
        // CredentialsProvider({
        //     name: "Django JWT",
        //     credentials: {},
        //     async authorize(credentials, req) {
        //         console.log('authorize *******')
        //         const res = await fetch(`${process.env.APP_PUBLIC_API_URL}/core/login/google/`, {
        //             method: "POST",
        //             headers: {"Content-Type": "application/json"},
        //             // @ts-expect-error fixme
        //             body: JSON.stringify({access_token: req.query?.access_token}),
        //         });
        //         const user = await res.json();
        //         if (res.ok && user) {
        //             return {...user, accessToken: user.access_token};
        //         }
        //         return null;
        //     },
        // }),
    ],
    // callbacks: {
    //     async jwt({token, user}: { token: any, user: any }) {
    //         console.log('jwt ***********')
    //         if (user) token.accessToken = user.accessToken;
    //         return token;
    //     },
    //     async session({session, token}: { session: any, token: any }) {
    //         console.log('session ********')
    //         session.accessToken = token.accessToken;
    //         return session;
    //     },
    // },
    callbacks: {
        async jwt({token, account}: { token: any, account: any }) {
            if (account) {
                const res = await fetch(`${process.env.APP_PUBLIC_API_URL}/core/login/google/`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({access_token: account.access_token}),
                });
                const data = await res.json();
                if (res.ok){
                    token.backData = data;
                }
                else throw new Error("Failed to authenticate with backend");
            }
            return token;
        },
        async session({session, token}: { session: any, token: any }) {
            session.backData = token.backData;
            session.accessToken = token.backData.access;
            return session;
        },
    },
    pages: {
        signIn: "/panel/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1h
    },
};

// @ts-expect-error fixme
export const {handlers, auth, signIn, signOut} = NextAuth(authOptions);
