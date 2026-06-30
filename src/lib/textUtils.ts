export type TextBlock =
  | { type: "paragraph"; content: string }
  | { type: "list"; items: string[]; ordered: boolean };

export function processBody(body: string): TextBlock[] {
  if (!body || !body.trim()) return [];

  const segments = body.split(/\n{2,}/);

  return segments
    .map(segment => {
      const trimmed = segment.trim();
      if (!trimmed) return null;

      const lines = trimmed.split("\n");
      const nonEmptyLines = lines.filter(l => l.trim().length > 0);

      if (nonEmptyLines.length === 0) return null;

      const unorderedMatch = nonEmptyLines.every(l => /^\s*[-*]\s+/.test(l));
      const orderedMatch = nonEmptyLines.every(l => /^\s*\d+[.)]\s+/.test(l));

      if (unorderedMatch || orderedMatch) {
        const items = nonEmptyLines.map(l =>
          l.trim().replace(/^[-*]\s+|\d+[.)]\s+/, ""),
        );
        return { type: "list" as const, items, ordered: orderedMatch };
      }

      return { type: "paragraph" as const, content: trimmed };
    })
    .filter(Boolean) as TextBlock[];
}
