import logoUrl from "@/assets/logo.svg";

interface TraksLogoProps {
  className?: string;
  size?: number;
}

export function TraksLogo({ className = "h-7 w-7", size }: TraksLogoProps) {
  return (
    <img
      src={logoUrl}
      alt="TRAKS Logo"
      width={size ?? 32}
      height={size ?? 32}
      className={`inline-block rounded-md transition-transform hover:scale-105 ${className}`}
    />
  );
}
