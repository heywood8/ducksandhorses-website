// Simple reading time utility (~200 words per minute baseline)
export interface ReadingTimeResult {
  words: number;
  minutes: number; // rounded up minutes
  exactMinutes: number; // raw minutes (float)
}

export function readingTime(text: string, wpm = 200): ReadingTimeResult {
  const words = (text.match(/\b\w+\b/g) || []).length;
  const exactMinutes = words / wpm;
  const minutes = Math.max(1, Math.ceil(exactMinutes));
  return { words, minutes, exactMinutes };
}
