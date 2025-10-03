"use client";

import { ButtonHTMLAttributes, forwardRef, useEffect, useState } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props you need
}

const cleanProps = (props: Record<string, any>): Record<string, any> => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    if (
      !key.startsWith('fdprocessedid') &&
      !key.startsWith('data-nimg') &&
      key !== 'cz-shortcut-listen' &&
      key !== 'suppresshydrationwarning' &&
      key !== 'data-qb-installed' &&
      key !== 'data-headlessui-state' &&
      key !== 'data-focus-visible-added' &&
      key !== 'aria-hidden' &&
      !key.startsWith('data-')
    ) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Only render the button on the client side to avoid hydration issues
    if (!isMounted) {
      return (
        <button
          ref={ref}
          className={className}
          style={{ visibility: 'hidden' }}
          aria-hidden="true"
        />
      );
    }

    return (
      <button
        ref={ref}
        className={className}
        {...cleanProps(props)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
