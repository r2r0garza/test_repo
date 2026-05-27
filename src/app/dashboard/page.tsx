import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("demo_auth")?.value === "authenticated";

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-12 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-xl shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/30">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
          Demo access granted
        </p>
        <h1 className="text-3xl font-bold tracking-tight">You are signed in</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          The login page was bypassed with the demo credentials from your local
          environment.
        </p>
      </section>
    </main>
  );
}
