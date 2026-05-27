import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";

  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username === process.env.USER_DEMO &&
    password === process.env.PASS_DEMO
  ) {
    const cookieStore = await cookies();

    cookieStore.set("demo_auth", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    redirect("/dashboard");
  }

  redirect("/?error=invalid-credentials");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const hasDemoCredentials = Boolean(
    process.env.USER_DEMO && process.env.PASS_DEMO,
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-12 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/30">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
            Login Page 3
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            Sign in with the demo credentials configured in your local
            environment.
          </p>
        </div>

        <form action={login} className="space-y-5">
          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/10 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-50 dark:focus:ring-zinc-50/10"
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-950 focus:ring-4 focus:ring-zinc-950/10 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-50 dark:focus:ring-zinc-50/10"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          {error === "invalid-credentials" ? (
            <p
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
              role="alert"
            >
              The username or password you entered is incorrect.
            </p>
          ) : null}

          {!hasDemoCredentials ? (
            <p
              className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200"
              role="status"
            >
              Demo credentials are not configured. Add USER_DEMO and PASS_DEMO
              to .env.local.
            </p>
          ) : null}

          <button
            className="w-full rounded-2xl bg-zinc-950 px-4 py-3 text-base font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-950/20 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-zinc-50/20"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
