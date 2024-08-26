"use client";
interface FilterButtonProps {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick }) => {
  return (
    <button className="bg-orange-500 text-white py-2 px-4 rounded" onClick={onClick}>
      Filtrar
    </button>
  );
};

export default FilterButton;
