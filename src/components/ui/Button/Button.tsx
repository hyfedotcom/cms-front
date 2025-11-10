import type { Button as ButtonType } from "src/lib/types/ui/button";
import { getLinkKind } from "src/hooks/getLinkKind";
import Link from "next/link";
import clsx from "clsx";

export function Button({ data }: { data: ButtonType }) {
  const { color, label, link, type, variant } = data;

  const external = getLinkKind(link);

  // базовые стили
  const baseClasses = `group cursor-pointer w-full md:w-max inline-flex items-center gap-4 uppercase text-[16px] md:text-[20px] font-bold  transition-opacity duration-200
  hover:opacity-90 ${
    type === "default"
      ? "px-15 py-4.25 justify-center"
      : "py-2 pl-5 pr-2 justify-between"
  } rounded-full`;

  const colorClasses = {
    primary:
      variant === "outline"
        ? "bg-transparent text-primary"
        : "bg-primary text-white",
    white:
      variant === "outline"
        ? "bg-transparent text-white"
        : "bg-white text-primary",
    gradient:
      variant === "outline"
        ? "bg-transparent text-primary"
        : "bg-gradient-to-r from-[#01809C] to-[#12D7BE] text-white",
  }[color];

  const outlineStyle =
    variant === "outline" ? { boxShadow: "inset 0 0 0 2px currentColor" } : {};

  // обводка
  const variantClasses = {
    solid: "",
    outline: "bg-transparent",
  }[variant];

  // иконка
  const icon =
    type === "arrow-bottom" ? (
      <span
        id={type}
        className={clsx(
          "w-12 h-12 flex items-center justify-center rounded-full overflow-hidden",
          color === "primary" && variant === "solid"
            ? "text-primary bg-white"
            : color === "white" && variant === "solid"
            ? "text-white bg-primary"
            : color === "primary" && variant === "outline"
            ? "text-white bg-primary"
            : color === "white" && variant === "outline"
            ? "text-primary bg-white"
            : "text-primary bg-white"
        )}
      >
        <span className="rotate-90 -translate-y-[137%] group-hover:translate-y-[137%]  duration-150 flex gap-5">
          <svg
            width="25"
            height="16"
            viewBox="0 0 25 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7071 7.23406C25.0976 7.62458 25.0976 8.25774 24.7071 8.64827L18.3431 15.0122C17.9526 15.4028 17.3195 15.4028 16.9289 15.0122C16.5384 14.6217 16.5384 13.9885 16.9289 13.598L22.5858 7.94116L16.9289 2.28431C16.5384 1.89378 16.5384 1.26062 16.9289 0.870094C17.3195 0.47957 17.9526 0.47957 18.3431 0.870094L24.7071 7.23406ZM24 7.94116V8.94116H0V7.94116V6.94116H24V7.94116Z"
              className="fill-current"
            />
          </svg>
          <svg
            width="25"
            height="16"
            viewBox="0 0 25 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7071 7.23406C25.0976 7.62458 25.0976 8.25774 24.7071 8.64827L18.3431 15.0122C17.9526 15.4028 17.3195 15.4028 16.9289 15.0122C16.5384 14.6217 16.5384 13.9885 16.9289 13.598L22.5858 7.94116L16.9289 2.28431C16.5384 1.89378 16.5384 1.26062 16.9289 0.870094C17.3195 0.47957 17.9526 0.47957 18.3431 0.870094L24.7071 7.23406ZM24 7.94116V8.94116H0V7.94116V6.94116H24V7.94116Z"
              className="fill-current"
            />
          </svg>
        </span>
      </span>
    ) : type === "arrow-right" ? (
      <span
        className={clsx(
          "w-12 h-12 flex items-center justify-center rounded-full overflow-hidden",
          color === "primary"
            ? "text-primary bg-white"
            : color === "white"
            ? "text-white bg-primary"
            : "text-primary bg-white"
        )}
      >
        <span className="-translate-x-[32%] group-hover:translate-x-[32%] duration-150 flex gap-5">
          <svg
            width="25"
            height="16"
            viewBox="0 0 25 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7071 7.23406C25.0976 7.62458 25.0976 8.25774 24.7071 8.64827L18.3431 15.0122C17.9526 15.4028 17.3195 15.4028 16.9289 15.0122C16.5384 14.6217 16.5384 13.9885 16.9289 13.598L22.5858 7.94116L16.9289 2.28431C16.5384 1.89378 16.5384 1.26062 16.9289 0.870094C17.3195 0.47957 17.9526 0.47957 18.3431 0.870094L24.7071 7.23406ZM24 7.94116V8.94116H0V7.94116V6.94116H24V7.94116Z"
              className="fill-current"
            />
          </svg>
          <svg
            width="25"
            height="16"
            viewBox="0 0 25 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.7071 7.23406C25.0976 7.62458 25.0976 8.25774 24.7071 8.64827L18.3431 15.0122C17.9526 15.4028 17.3195 15.4028 16.9289 15.0122C16.5384 14.6217 16.5384 13.9885 16.9289 13.598L22.5858 7.94116L16.9289 2.28431C16.5384 1.89378 16.5384 1.26062 16.9289 0.870094C17.3195 0.47957 17.9526 0.47957 18.3431 0.870094L24.7071 7.23406ZM24 7.94116V8.94116H0V7.94116V6.94116H24V7.94116Z"
              className="fill-current"
            />
          </svg>
        </span>
      </span>
    ) : null;

  const content = (
    <>
      {label}
      {icon}
    </>
  );

  const classes = clsx(baseClasses, colorClasses, variantClasses);

  return external === "external" ? (
    <a
      id={external}
      className={classes}
      style={outlineStyle}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  ) : external === "anchor" ? (
    <a id={external} href={link} style={outlineStyle} className={classes}>
      {content}
    </a>
  ) : (
    <Link id={external} style={outlineStyle} className={classes} href={link}>
      {content}
    </Link>
  );
}
