// This worker will handle heavy computations off the main thread
self.onmessage = function(e) {
  // Add any heavy computations here that don't need to block the main thread
  // For example, sorting large arrays, complex calculations, etc.
  const result = performHeavyTask(e.data);
  self.postMessage(result);
};

function performHeavyTask(data) {
  // Example heavy task - replace with your actual heavy computations
  return { processed: true, timestamp: Date.now() };
}
