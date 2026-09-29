/** Data w formacie "3 czerwca 2024" */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Miesiąc i rok w formacie "Styczeń 2025" */
export function formatMonth(date: string) {
  const s = new Date(date).toLocaleDateString("pl-PL", { month: "long", year: "numeric" });
  // "styczeń 2025" -> "Styczeń 2025" (Node zwraca mianownik dla miesiąca bez dnia)
  return s.charAt(0).toUpperCase() + s.slice(1);
}
