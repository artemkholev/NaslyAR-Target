import React, { ComponentProps } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";

type ButtonElementProps = ComponentProps<"button">;

export interface ButtonProps
  extends ButtonElementProps,
    VariantProps<typeof buttonStyles> {
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  buttonWrapperClassName?: string;
}

const buttonStyles = cva(
  "flex text-xs group flex-row gap-x-2 items-center justify-center disabled:!bg-gray-800",
  {
    variants: {
      buttonType: {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-black text-white hover:bg-gray-300",
        error: "bg-red-600 text-white hover:bg-red-700",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        info: "bg-sky-200 text-black hover:bg-sky-300",
        default: "bg-gray-400 text-white hover:bg-gray-500",
      },
      size: {
        default: "h-[38px]",
        sm: "h-8 !w-8",
        lg: "h-12",
        xl: "h-14",
        xxl: "h-16",
      },
      padding: {
        default: "px-5 py-2",
        sm: "px-3 py-2",
        lg: "px-5 py-3",
        xl: "px-5 py-4",
        xxl: "px-5 py-5",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        none: "rounded-none",
        full: "rounded-full",
      },
      isFullWidth: {
        true: "!w-full",
        false: "w-auto",
      },
    },
    compoundVariants: [{ buttonType: "primary", size: "default" }],
    defaultVariants: {
      buttonType: "primary",
      size: "default",
      rounded: "default",
      padding: "default",
      isFullWidth: false,
    },
  }
);

function Button({
  label,
  buttonType,
  rounded,
  padding,
  size,
  isFullWidth,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <div className={buttonProps.buttonWrapperClassName}>
      <button
        className={clsx(
          className,
          buttonStyles({
            buttonType,
            rounded,
            padding,
            size,
            isFullWidth,
          })
        )}
        type="button"
        {...buttonProps}
      >
        {buttonProps.icon && <div>{buttonProps.icon}</div>}
        {!!label && <label className="cursor-pointer">{label}</label>}
        {buttonProps.rightIcon && <div>{buttonProps.rightIcon}</div>}
      </button>
    </div>
  );
}

export default Button;
