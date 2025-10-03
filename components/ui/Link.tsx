"use client";

import { forwardRef, useEffect, useState } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type BaseLinkProps = Omit<NextLinkProps, 'passHref' | 'legacyBehavior'> & {
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

// Separate the props that will be passed to NextLink vs native anchor
type NextLinkOnlyProps = Omit<BaseLinkProps, 'href'> & { href: string };
type AnchorOnlyProps = Omit<BaseLinkProps, 'href'> & { href?: string };

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

function isExternalHref(href: string | undefined): boolean {
  if (!href) return false;
  return (
    href.startsWith('http') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  );
}

export const Link = forwardRef<HTMLAnchorElement, BaseLinkProps>(
  ({ children, className = '', href = '#', ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);
    const isExternal = typeof href === 'string' && isExternalHref(href);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    // Separate props for NextLink and native anchor
    const { onClick, ...otherProps } = props;
    const commonProps = {
      ...cleanProps(otherProps),
      className,
      ref,
      onClick,
    };

    // Only render the link on the client side to avoid hydration issues
    if (!isMounted) {
      return (
        <a
          {...commonProps}
          style={{ visibility: 'hidden' }}
          aria-hidden="true"
          href={isExternal ? href : '#'}
        >
          {children}
        </a>
      );
    }

    if (isExternal) {
      return (
        <a
          {...commonProps}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    // For Next.js links, use the new Link component syntax
    return (
      <NextLink 
        href={href} 
        className={className}
        onClick={onClick}
        {...cleanProps(otherProps)}
        ref={ref}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';
