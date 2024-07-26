import { cookies } from "next/headers";
import AdminPanel from "./adminPanel";

import { getSessionTokenBySessionToken } from "../../server/getData";
import { redirect } from "next/navigation";

// const cookieStore = cookies();
// const cookieToken = cookieStore.get("authToken");
// const sessionToken = getSessionTokenBySessionToken(cookieToken?.value);
// const isValid = await sessionToken == cookieToken?.value;

// console.log(cookieToken?.value);

export default async function AdminPage() {
  // if (isValid == false) { redirect("/api/auth/login"); };

    return (
      <main className="">
        <div>
            {<AdminPanel/>}
        </div>
      </main>
    );
}
