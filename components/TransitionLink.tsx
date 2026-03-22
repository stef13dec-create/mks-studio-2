"use client";

import { useTransition } from "./TransitionProvider";
import { ReactNode } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export default function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
  const { navigate } = useTransition();
  
  return (
    <a 
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
