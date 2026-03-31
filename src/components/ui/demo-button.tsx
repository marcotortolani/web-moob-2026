import { cn } from "@/lib/utils";

interface DemoButtonProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DemoButton({ href, className, children = "VER DEMO" }: DemoButtonProps) {
  const base =
    "inline-flex items-center justify-center bg-mint text-black font-display text-xl lg:text-2xl tracking-wider px-8 py-3 rounded-full hover:bg-mint/90 transition-colors";

  if (href) {
    return (
      <a href={href} className={cn(base, className)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn(base, className)}>
      {children}
    </button>
  );
}
