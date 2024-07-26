import { cookies } from "next/headers";
import AdminPanel from "./adminPanel";

import { getSessionTokenBySessionToken } from "../../server/getData";
import { redirect } from "next/navigation";

const cookieStore = cookies();
const cookieToken = cookieStore.get("authToken");

console.log("cookie token", cookieToken)

const sessionToken = getSessionTokenBySessionToken(cookieToken?.value);

console.log("session token ", sessionToken);

const isValid = await sessionToken == cookieToken?.value;

console.log(isValid);

// if (isValid == false) { redirect("/api/auth/login"); };

export default async function AdminPage() {
    return (
      <main className="">
        <div>
            {isValid && <AdminPanel/>}
        </div>
      </main>
    );
}
