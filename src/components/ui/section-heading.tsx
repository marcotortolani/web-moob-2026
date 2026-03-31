import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string | React.ReactNode;
  description?: string;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label = "SOMOS",
  title,
  description,
  className,
  titleClassName,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-1", align === "center" && "items-center text-center", className)}>
      {label && (
        <span className="text-white text-sm font-normal tracking-widest uppercase">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "text-[38px] leading-tight font-extrabold text-mint italic",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-white/80 text-sm leading-relaxed mt-1 max-w-prose">
          <span className="font-bold text-mint">{description.split(".")[0]}.</span>
          {description.includes(".") && (
            <span>{description.substring(description.indexOf(".") + 1)}</span>
          )}
        </p>
      )}
    </div>
  );
}
