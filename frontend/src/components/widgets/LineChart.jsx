import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      if (chartRef.current !== null) {
        // If a chart instance already exists, destroy it
        chartRef.current.destroy();
      }

      // Extract student names and scores
      const studentNames = data.map((item) => item.name);
      const scores = data.map((item) => item.score);

      // Get the canvas element
      const ctx = document.getElementById("scoreChart").getContext("2d");

      // Create the polar area chart
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: studentNames,
          datasets: [
            {
              label: "Scores",
              data: scores,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)", // Red
                "rgba(54, 162, 235, 0.6)", // Blue
                "rgba(255, 206, 86, 0.6)", // Yellow
                "rgba(75, 192, 192, 0.6)", // Green
                "rgba(153, 102, 255, 0.6)", // Purple
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 100,
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
        id="scoreChart"
        className="w-full h-80 md:h-80 lg:h-128"
        // Adjust the width and height as needed
        width="800"
        height="400"
      ></canvas>
    </div>
  );
};

export default LineChart;
