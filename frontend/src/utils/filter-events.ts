import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const query = text.trim().toLocaleLowerCase("tr-TR");
  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(query) ||
      e.description.toLocaleLowerCase("tr-TR").includes(query),
  );
}

export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}
