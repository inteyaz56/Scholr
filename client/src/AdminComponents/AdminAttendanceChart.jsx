import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminAttendanceChart = ({ data }) => {
  const chartData = data.map((item) => ({
    name: `${item.className} | ${item.subjectName}`,
    percentage: item.percentage,
  }));

  return (
    <div className="w-full h-[350px] bg-white border rounded-2xl p-4 shadow">
      <h2 className="text-lg font-bold mb-4">
        Attendance Percentage (Class-wise)
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-15}
            textAnchor="end"
          />
          <YAxis domain={[0, 100]} />
          <Tooltip />

          <Bar dataKey="percentage" radius={[6, 6, 0, 0]} fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminAttendanceChart;
