import Image from "next/image";

type AuthShowcaseProps = {
  title: string;
  text: string;
};

export function AuthShowcase({ title, text }: AuthShowcaseProps) {
  return (
    <aside className="relative flex min-h-72 flex-col overflow-hidden rounded-3xl bg-blue-50/70 ring-1 ring-blue-950/8 sm:min-h-80 lg:min-h-full">
      <div className="relative z-10 p-7 sm:p-9 lg:p-12">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-900/60">
          Acolher Aparecida
        </p>
        <h1 className="mt-3 max-w-md text-3xl font-bold leading-[1.08] tracking-tight text-blue-950 sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h1>
        <p className="mt-4 max-w-sm text-base text-blue-950/70 sm:text-lg">
          {text}
        </p>
      </div>

      <div className="pointer-events-none relative mt-auto h-40 sm:h-52 lg:h-80">
        <Image
          src="/santuario-cta.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain object-bottom"
          priority
        />
      </div>
    </aside>
  );
}
