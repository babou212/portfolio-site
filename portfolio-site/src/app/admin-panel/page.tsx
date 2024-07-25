import { getServerSession } from "next-auth/next";

import { authOptions } from "~/server/auth";
import { redirect } from "next/navigation";

import AdminPanel from "./adminPanel";

async function ReturnUnAuthorizedAccess() {
    const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/api/auth/signin');
  }
};

export default function AdminPage() {
    return (
      <main className="">
        <div>
            <ReturnUnAuthorizedAccess />
            <AdminPanel/>
        </div>
      </main>
    );
}
