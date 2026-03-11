'use client';

import { usePerformanceOptimization, useMeasureInteraction } from '../hooks/usePerformance';

export default function PerformanceOptimizer() {
  usePerformanceOptimization();
  useMeasureInteraction();
  return null;
}
