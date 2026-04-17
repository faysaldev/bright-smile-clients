"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/src/lib/utils";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  to?: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, href, to, ...props }, ref) => {
    const pathname = usePathname();
    const target = href || to || "/";
    const isActive = pathname === target || (target !== "/" && pathname?.startsWith(target));

    return (
      <Link
        ref={ref}
        href={target}
        className={cn(
          className,
          isActive && activeClassName
        )}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
