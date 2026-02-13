function Tab({ label, active }) {
  return (
    <button
      className={`px-5 py-2 rounded-lg text-sm font-medium ${
        active ? "bg-blue-100 text-blue-600" : "bg-white text-gray-600 shadow"
      }`}
    >
      {label}
    </button>
  );
}
export default Tab;
