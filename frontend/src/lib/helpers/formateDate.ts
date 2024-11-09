export function formatDate(timestamp: string): string {
  const date = new Date(parseInt(timestamp, 10)); // Ensuring base 10 parsing
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
