import { cn } from "@/src/lib/utils";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  ariaLabel: string;
  active?: boolean;
};

export default function ToolbarButton({
  disabled,
  onClick,
  ariaLabel,
  children,
  className,
  active,
  ...delegated
}: React.PropsWithChildren<Props>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center justify-between border-0 p-2 align-middle",
        className,
        active && "bg-gray-300",
      )}
      aria-label={ariaLabel}
      {...delegated}
    >
      {children}
    </button>
  );
}
