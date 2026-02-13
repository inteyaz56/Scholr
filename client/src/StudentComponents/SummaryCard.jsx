function SummaryCard({ title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <p className="text-gray-600">{title}</p>
      <span className={`px-3 py-1 rounded-lg font-semibold ${colors[color]}`}>
        {value}
      </span>
    </div>
  );
}

export default SummaryCard;
