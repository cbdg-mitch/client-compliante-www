import Image from "next/image";
import Link from "next/link";

export function PartnerCard(props: {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
}) {
  return (
    <div className="rounded-2xl bg-surface border border-surface-border shadow-card p-6 flex flex-col">
      <div className="flex items-center gap-4">
        <Image 
          src={props.logo} 
          alt={`${props.name} logo`} 
          width={48} 
          height={48} 
          className="h-12 w-12 object-contain" 
        />
        <div>
          <h3 className="text-lg font-semibold text-brand-primary">{props.name}</h3>
          <p className="text-sm text-brand-text/80">{props.tagline}</p>
        </div>
      </div>
      <div className="mt-6">
        <Link
          href={`/partners/${props.slug}`}
          className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold border border-brand-primary text-brand-primary hover:bg-brand-primary/10 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
