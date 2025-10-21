import Image from "next/image";

type Logo = { src: string; alt: string; href: string };

export default function LogoCloud({ logos }: { logos: Logo[] }) {
  return (
    <div className="bg-surface-muted">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-sm font-medium text-brand-text/70 tracking-wide uppercase">
          Innovation Partners
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
          {logos.map((l) => (
            <a key={l.alt} href={l.href} className="flex justify-center">
              <Image
                src={l.src}
                alt={l.alt}
                width={160}
                height={64}
                className="h-10 w-auto opacity-80 hover:opacity-100 transition"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}