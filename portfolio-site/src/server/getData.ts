"use server";

import { db } from "./db";

export async function getSessionTokenBySessionToken(token: string | undefined) {

    if (token == undefined) { return ''; }

    const sessionToken = await db.session.findUnique({
        where: {
          sessionToken: token,
        },
      })

    return sessionToken?.sessionToken;
}
