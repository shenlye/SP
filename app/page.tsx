export default async function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_20%_25%,rgba(168,85,247,0.18),transparent_30%)]" />

        <section className="relative mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl items-start px-6 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20">
          <div className="w-full max-w-5xl">
            <p className="mb-4 text-sm font-medium tracking-[0.08em] text-muted uppercase sm:text-base">
              You&apos;re reading
            </p>

            <h1 className="font-display max-w-3xl text-2xl leading-[1.15] text-foreground sm:text-4xl md:text-[3.25rem]">
              Save Point
            </h1>

            <p className="mt-3 text-lg font-semibold text-foreground sm:text-xl">
              Personal notes on code, tools, and quiet internet things.
            </p>

            <div className="mt-7 max-w-5xl">
              <h2 className="text-xl font-semibold leading-tight text-foreground sm:text-3xl">
                Latest: Building a blog that stays simple, readable, and easy to maintain
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
                I want this homepage to stay calm and readable, but still leave
                room for a few playful UI experiments. This featured card is the
                first one.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
