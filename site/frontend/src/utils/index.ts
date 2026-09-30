/** Data w formacie "3 czerwca 2024" */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
