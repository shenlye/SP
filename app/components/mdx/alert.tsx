import { Icon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/app/lib/cn";

const alertVariants = cva(
  [
    "relative isolate mt-6 overflow-hidden border border-l-3 px-4 py-3 text-sm leading-7 text-foreground sm:text-base",
    "[background-color:color-mix(in_oklab,currentColor_7%,var(--color-surface))]",
    "[border-color:color-mix(in_oklab,currentColor_34%,var(--color-border))]",
    "[border-left-color:currentColor]",
    "[box-shadow:2px_2px_0_0_color-mix(in_oklab,currentColor_18%,transparent)]",
    "dark:[background-color:color-mix(in_oklab,currentColor_12%,var(--color-surface))]",
    "dark:[box-shadow:inset_0_1px_0_0_rgb(255_255_255_/_0.04),2px_2px_0_0_color-mix(in_oklab,currentColor_14%,transparent)]",
    "[&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
  ],
  {
    variants: {
      variant: {
        info: "text-brand",
        success: "text-(--ui-alert-success)",
        warning: "text-(--ui-alert-warning)",
        danger: "text-(--ui-alert-danger)",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>;

const alertMeta: Record<AlertVariant, { icon: string }> = {
  info: { icon: "lucide:info" },
  success: { icon: "lucide:circle-check" },
  warning: { icon: "lucide:triangle-alert" },
  danger: { icon: "lucide:circle-x" },
};

type AlertProps = ComponentPropsWithoutRef<"aside"> &
  VariantProps<typeof alertVariants> & {
    heading?: string;
  };

export function Alert({
  variant,
  heading,
  className,
  children,
  role,
  ...props
}: AlertProps) {
  const tone = variant ?? "info";
  const meta = alertMeta[tone];

  return (
    <aside
      role={role ?? (tone === "danger" ? "alert" : "note")}
      className={cn(alertVariants({ variant: tone }), className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-current opacity-30"
      />
      <div className="flex min-w-0 gap-3">
        <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center">
          <Icon icon={meta.icon} aria-hidden="true" className="size-3.5" />
        </span>

        <div className="min-w-0">
          {heading ? (
            <p className="mb-1 font-semibold text-foreground">{heading}</p>
          ) : null}
          <div className="text-foreground-soft">{children}</div>
        </div>
      </div>
    </aside>
  );
}
