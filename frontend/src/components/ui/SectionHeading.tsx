/**
 * Shared section header: heading on the left, description (and an optional action) on the right.
 * Stacks on small screens.
 */
export default function SectionHeading({
  id,
  title,
  children,
  action,
  tone = "light",
  className = "",
}: {
  id?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <h2 id={id} className={`t-h2 max-w-[18ch] lg:col-span-7 lg:max-w-[22ch] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end lg:text-right">
        <p className={`max-w-[44ch] text-[16px] leading-relaxed ${dark ? "text-fog" : "text-ink-3"}`}>{children}</p>
        {action}
      </div>
    </div>
  );
}
