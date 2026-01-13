import { useContext } from "react";
import { todoContext } from "../context/todoContext";

function TodoSearch() {
  const { searchTerm, setSearchTerm } = useContext(todoContext);

  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 mt-3 mb-4 border rounded-md border-gray-400"
    />
  );
}

export default TodoSearch;
