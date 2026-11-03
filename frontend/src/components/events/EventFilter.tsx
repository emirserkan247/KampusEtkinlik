import { CATEGORIES, type Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="arama">Etkinlik ara</label>
      <input
        type="search"
        id="arama"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <label htmlFor="kategori-filtre">Kategori</label>
      <select
        id="kategori-filtre"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as Category | "")}
      >
        <option value="">Tümü</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </form>
  );
}

export default EventFilter;
