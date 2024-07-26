import AdminPanel from "./adminPanel";

export default async function AdminPage() {
    return (
      <main className="flex items-center justify-center">
        <div>
            {<AdminPanel/>}
        </div>
      </main>
    );
}
