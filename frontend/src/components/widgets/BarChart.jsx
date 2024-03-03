import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      // Check if a chart instance already exists
      if (chartRef.current !== null) {
        // If a chart instance already exists, destroy it
        chartRef.current.destroy();
      }

      // Extract dates and attendance values
      const dates = data.map((item) => item.date);
      const attendances = data.map((item) => item.attendance);

      // Get the canvas element
      const ctx = document.getElementById("attendanceChart").getContext("2d");

      // Create the bar chart
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Attendance",
              data: attendances,
              backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color for bars
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <div>
      {/* Apply Tailwind CSS classes to adjust canvas size */}
      <canvas
        id="attendanceChart"
        className="w-full h-64 md:h-96 lg:h-128"
        // Adjust the width and height as needed
        width="800"
        height="400"
      ></canvas>
    </div>
  );
};

export default BarChart;
