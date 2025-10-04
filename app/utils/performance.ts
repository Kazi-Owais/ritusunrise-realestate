// Performance optimization utilities
export function createWorker() {
  if (typeof window === 'undefined') return null;
  
  const workerCode = `
    self.onmessage = function(e) {
      // Add your heavy computations here
      const result = { processed: true, timestamp: Date.now() };
      self.postMessage(result);
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  return new Worker(URL.createObjectURL(blob));
}

// Defer non-critical JavaScript
export function deferNonCritical(callback: () => void) {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(callback, { timeout: 2000 });
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(callback, 0);
  }
}

// Load third-party scripts with performance in mind
export function loadScript(
  src: string,
  options: {
    async?: boolean;
    defer?: boolean;
    onLoad?: () => void;
    onError?: (error: Event | string) => void;
  } = {}
) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async ?? true;
    script.defer = options.defer ?? true;
    
    script.onload = () => {
      options.onLoad?.();
      resolve();
    };
    
    script.onerror = (error) => {
      options.onError?.(error);
      reject(error);
    };
    
    // Add 'crossorigin' for better error handling
    if (!src.startsWith(window.location.origin)) {
      script.crossOrigin = 'anonymous';
    }
    
    document.body.appendChild(script);
  });
}

// Optimize images with lazy loading
export function optimizeImages() {
  if (typeof window === 'undefined') return;
  
  // Lazy load images that are not in the viewport
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '200px', // Start loading images 200px before they enter the viewport
  });

  images.forEach(img => imageObserver.observe(img));
}
