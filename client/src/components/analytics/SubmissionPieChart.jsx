"use client"

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const COLORS = {
  Pending: "#FFBB28", // Yellow
  Accepted: "#00C49F", // Green
  Rejected: "#FF8042", // Orange
}

export default function SubmissionPieChart({ data }) {
  // Transform data for Recharts: [{ name: "Status", value: count }]
  const chartData = Object.keys(data).map((status) => ({
    name: status,
    value: data[status],
  }))

  return (
    <Card className="w-full max-w-xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-2xl border border-purple-700 backdrop-blur-sm bg-opacity-80">
      <CardHeader className="pb-4">
        <CardTitle className="text-3xl font-bold text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-md">
          Submission Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="py-6">
        {chartData.every((item) => item.value === 0) ? (
          <div className="text-center text-gray-400 py-10 text-xl">No submissions to display yet.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} stroke={COLORS[entry.name]} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(222.2 84% 4.9%)",
                  borderColor: "hsl(217.2 32.6% 17.5%)",
                  color: "hsl(210 20% 98%)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
                itemStyle={{ color: "hsl(210 20% 98%)" }}
                labelStyle={{ color: "hsl(210 20% 98%)", fontWeight: "bold" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }}>{`${value}: ${entry.payload.value}`}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
