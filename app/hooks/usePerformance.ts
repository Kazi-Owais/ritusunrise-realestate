'use client';

import { useEffect } from 'react';
import { optimizeImages, deferNonCritical } from '../utils/performance';

export function usePerformanceOptimization() {
  useEffect(() => {
    // Optimize images after initial render
    optimizeImages();
    
    // Handle browser idle time
    const idleCallback = (window as any).requestIdleCallback || 
      ((fn: () => void) => setTimeout(fn, 0));
    
    // Defer non-critical work
    const cleanup = () => {
      // Cleanup any observers or timers if needed
    };
    
    // Run deferred tasks
    const handleIdle = () => {
      // Example: Load non-critical resources
      const loadDeferredResources = () => {
        // Add any non-critical resources to load here
      };
      
      if ((window as any).requestIdleCallback) {
        (window as any).requestIdleCallback(loadDeferredResources, { timeout: 2000 });
      } else {
        setTimeout(loadDeferredResources, 0);
      }
    };
    
    // Run deferred tasks after the page is interactive
    if (document.readyState === 'complete') {
      handleIdle();
    } else {
      window.addEventListener('load', handleIdle);
    }
    
    // Cleanup on unmount
    return () => {
      cleanup();
      window.removeEventListener('load', handleIdle);
    };
  }, []);
}

// Hook to measure performance metrics
export function useMeasureInteraction() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceEventTiming' in window)) {
      return;
    }
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log slow interactions
        if (entry.entryType === 'event' && entry.duration > 100) {
          console.log('Slow interaction detected:', {
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
          });
        }
      }
    });
    
    // Observe all event timing entries
    observer.observe({
      type: 'event',
      buffered: true,
    });
    
    return () => observer.disconnect();
  }, []);
}
