export default function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-border bg-secondary/40">
      <div className="container py-10 md:py-14">
        <h1 className="font-display">{title}</h1>
        {subtitle && <div className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</div>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
