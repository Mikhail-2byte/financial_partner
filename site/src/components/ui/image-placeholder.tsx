import * as React from "react";
import { ImageIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const placeholderVariants = cva(
  "relative flex flex-col items-center justify-center overflow-hidden border-2 border-dashed border-brand-200 bg-brand-50/70 text-brand-700",
  {
    variants: {
      ratio: {
        square: "aspect-square",
        portrait: "aspect-[4/5]",
        landscape: "aspect-[16/9]",
        wide: "aspect-[3/2]",
      },
      shape: {
        rect: "rounded-2xl",
        circle: "rounded-full",
      },
      size: {
        sm: "p-2",
        md: "p-5",
        lg: "p-8",
      },
    },
    defaultVariants: { ratio: "square", shape: "rect", size: "md" },
  },
);

export interface ImagePlaceholderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof placeholderVariants> {
  /** Что за картинка — пойдёт в aria-label и подпись в md/lg */
  label: string;
  /** Подсказка, что изобразить. Скрыта на size="sm" */
  hint?: string;
  /** Рекомендованный размер, напр. "400×400 px". Скрыт на size="sm" */
  dimensions?: string;
  /** Контент поверх иконки (например, initials в Team). Перекрывает иконку. */
  fallback?: React.ReactNode;
}

export function ImagePlaceholder({
  className,
  ratio,
  shape,
  size,
  label,
  hint,
  dimensions,
  fallback,
  ...props
}: ImagePlaceholderProps) {
  const isSmall = size === "sm";
  return (
    <div
      role="img"
      aria-label={`Заглушка изображения: ${label}`}
      className={cn(placeholderVariants({ ratio, shape, size }), className)}
      {...props}
    >
      {fallback ?? (
        <ImageIcon
          aria-hidden
          className={cn(
            "text-brand-300",
            isSmall ? "size-5" : size === "lg" ? "size-10" : "size-7",
          )}
        />
      )}
      {!isSmall && (
        <div className="mt-3 flex flex-col items-center gap-1 max-w-[24ch]">
          <span className="font-display font-bold text-sm md:text-base text-brand-700 leading-tight">
            {label}
          </span>
          {hint && (
            <span className="text-xs text-muted leading-snug">{hint}</span>
          )}
          {dimensions && (
            <span className="text-[10px] uppercase tracking-wider text-brand-400/80 font-semibold">
              {dimensions}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
