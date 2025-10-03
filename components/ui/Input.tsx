"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useEffect, useState } from 'react';

type InputProps = (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>) & {
  as?: 'input' | 'textarea';
};

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

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className = '', as: Element = 'input', value = '', ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const baseClasses = 'w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition';

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const commonProps = {
      ...cleanProps(props as any),
      ref: ref as any,
      className: `${baseClasses} ${className}`,
      // Ensure we always have a defined value to avoid switching between controlled/uncontrolled
      value: value ?? ''
    };

    // Only render the input on the client side to avoid hydration issues
    if (!isMounted) {
      return (
        <Element
          {...commonProps}
          style={{ visibility: 'hidden' }}
          aria-hidden="true"
          value=""
          onChange={() => {}}
        />
      );
    }

    return Element === 'textarea' ? (
      <textarea {...commonProps as TextareaHTMLAttributes<HTMLTextAreaElement>} />
    ) : (
      <input {...commonProps as InputHTMLAttributes<HTMLInputElement>} />
    );
  }
);

Input.displayName = 'Input';
