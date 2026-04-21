import Link from "next/link";
import clsx from "clsx";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

const shellClassName =
  "group/pressable relative isolate";

const baseLayerClassName =
  "pointer-events-none absolute inset-0 translate-x-0.5 translate-y-0.5 overflow-hidden rounded-none transition-colors duration-150";

const baseLayerOverlayClassName =
  "absolute inset-0 transition-opacity duration-150";

const interactiveClassName =
  "relative z-10 select-none transition-[background-color,color,border-color,box-shadow] duration-150 dark:[box-shadow:inset_0_1px_0_0_rgb(255_255_255_/_0.05),inset_1px_0_0_0_rgb(255_255_255_/_0.03),0_1px_0_0_rgb(0_0_0_/_0.18)] active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:inset_1px_1px_0_0_color-mix(in_oklab,var(--color-foreground)_22%,transparent)] dark:active:[box-shadow:inset_1px_1px_0_0_rgb(0_0_0_/_0.34),inset_-1px_-1px_0_0_rgb(255_255_255_/_0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const buttonElementClassName =
  "inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-50";

type ButtonFrameProps = {
  baseClassName?: string;
  baseOverlayClassName?: string;
  wrapperClassName?: string;
  children: ReactNode;
};

type ButtonBaseProps = {
  baseClassName?: string;
  baseOverlayClassName?: string;
  wrapperClassName?: string;
  children: ReactNode;
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: ComponentProps<typeof Link>["href"];
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

function ButtonFrame({
  children,
  wrapperClassName,
  baseClassName,
  baseOverlayClassName,
}: ButtonFrameProps) {
  return (
    <div
      className={clsx(
        shellClassName,
        wrapperClassName,
      )}
    >
      <div
        aria-hidden="true"
        className={clsx(
          baseLayerClassName,
          baseClassName,
        )}
      >
        {baseOverlayClassName ? (
          <div
            className={clsx(
              baseLayerOverlayClassName,
              baseOverlayClassName,
            )}
          />
        ) : null}
      </div>
      {children}
    </div>
  );
}

function isLinkButton(props: ButtonProps): props is ButtonAsLinkProps {
  return "href" in props && props.href !== undefined;
}

export function Button(props: ButtonProps) {
  if (isLinkButton(props)) {
    const {
      children,
      className,
      wrapperClassName,
      baseClassName,
      baseOverlayClassName,
      href,
      ...linkProps
    } = props;

    return (
      <ButtonFrame
        wrapperClassName={wrapperClassName}
        baseClassName={baseClassName}
        baseOverlayClassName={baseOverlayClassName}
      >
        <Link
          {...linkProps}
          href={href}
          className={clsx(
            interactiveClassName,
            className,
          )}
        >
          {children}
        </Link>
      </ButtonFrame>
    );
  }

  const {
    children,
    className,
    wrapperClassName,
    baseClassName,
    baseOverlayClassName,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <ButtonFrame
      wrapperClassName={wrapperClassName}
      baseClassName={baseClassName}
      baseOverlayClassName={baseOverlayClassName}
    >
      <button
        {...buttonProps}
        type={type}
        className={clsx(
          interactiveClassName,
          buttonElementClassName,
          className,
        )}
      >
        {children}
      </button>
    </ButtonFrame>
  );
}
