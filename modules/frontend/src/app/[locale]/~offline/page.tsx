import Image from "next/image";

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background p-6 text-center">
      <div className="relative h-32 w-32">
        <Image
          src="/icons/icon-192.png"
          alt="foundation"
          width={128}
          height={128}
          className="animate-pulse"
        />
      </div>
      <h1 className="text-2xl font-bold text-foreground">شما آفلاین هستید</h1>
      <p className="max-w-md text-muted-foreground">
        به اینترنت متصل شوید تا foundation دوباره در دسترس باشد.
      </p>
      <button
        onClick={() => location.reload()}
        className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        تلاش مجدد
      </button>
    </div>
  );
}
