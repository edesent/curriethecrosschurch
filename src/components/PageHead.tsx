/** The dark band at the top of every inner page. */
export default function PageHead({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-night text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: "repeating-linear-gradient(-60deg, #fff 0 1px, transparent 1px 46px), repeating-linear-gradient(30deg, #fff 0 1px, transparent 1px 64px)" }}
      />
      <div className="wrap relative grid gap-10 py-16 md:py-24 lg:grid-cols-[1.25fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow text-amber">{eyebrow}</p>
          <h1 className="display mt-4 text-[clamp(3rem,9vw,6.5rem)]">{title}</h1>
          {children && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
