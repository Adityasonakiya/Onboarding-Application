import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const PieChart3D = ({ data }) => {
  const chartRef = useRef(null);
  const labelContainerRef = useRef(null);

  useLayoutEffect(() => {
    // Create chart instance
    const chart = am4core.create(chartRef.current, am4charts.PieChart3D);

    // Disable amCharts branding (requires a commercial license)
    chart.logo.disabled = true;

    // Configure chart
    chart.hiddenState.properties.opacity = 0; // Initial animation
    chart.innerRadius = am4core.percent(0); // Regular pie chart
    chart.depth = 20; // Adds slice thickness for 3D effect
    chart.angle = 30; // Tilt the pie chart for better 3D perspective

    // Add data and assign colors consistently
    chart.data = data.labels.map((label, index) => ({
      category: label,
      value: data.values[index],
    })).filter(d => d.value > 0); // Exclude values that are 0

    // Create series
    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    // Apply custom colors to slices
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    series.slices.template.adapter.add("fill", (fill, target) => am4core.color(colors[target.dataItem.index % colors.length]));

    // Slice appearance settings
    series.slices.template.cornerRadius = 10; // Rounded corners for slices
    series.slices.template.tooltipText = "[bold]{category}[/]: {value}";

    // Properly display labels inside pie slices
    series.labels.template.text = "{category}: {value}";
    series.labels.template.fill = am4core.color("#ffffff"); // White text for better contrast
    series.labels.template.fontSize = 12; // Smaller font size to fit within slices
    series.labels.template.radius = am4core.percent(40); // Position labels inside slices
    series.labels.template.wrap = true; // Wrap long text
    series.labels.template.maxWidth = 120; // Constrain label width

    // Hide ticks (not needed if labels are inside)
    series.ticks.template.disabled = true;

    // ** Ensure Proper Legend Layering **
    // Clear the label container before adding new labels
    if (labelContainerRef.current) {
      labelContainerRef.current.innerHTML = ""; // Clear existing labels
      labelContainerRef.current.style.position = "relative"; // Ensure it respects stacking context
      labelContainerRef.current.style.zIndex = 1; // Lower z-index
    }

    // Create a custom label container at the top
    chart.data.forEach((item, index) => {
      const labelItem = document.createElement("div");
      labelItem.style.display = "flex";
      labelItem.style.alignItems = "center";
      labelItem.style.marginRight = "15px";

      const colorBox = document.createElement("div");
      colorBox.style.width = "14px";
      colorBox.style.height = "14px";

      // Synchronize color with pie chart slices
      colorBox.style.backgroundColor = colors[index % colors.length]; // Match chart slice color
      colorBox.style.marginRight = "5px";

      const text = document.createElement("span");
      text.innerText = item.category;
      text.style.fontSize = "12px";
      text.style.fontWeight = "bold";

      labelItem.appendChild(colorBox);
      labelItem.appendChild(text);
      labelContainerRef.current.appendChild(labelItem);
    });

    // Animate chart entrance
    series.hiddenState.properties.startAngle = -90;
    series.hiddenState.properties.endAngle = 270;

    // Cleanup on unmount
    return () => {
      chart.dispose(); // Dispose of the chart
    };
  }, [data]); // Re-run effect whenever `data` changes

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        position: "relative", // Create stacking context
        zIndex: 1, // Lower than navbar
      }}
    >
      {/* Create the label container above the chart */}
      <div
        ref={labelContainerRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "10px",
          position: "relative", // Ensure proper stacking
          zIndex: 1, // Match chart stacking
        }}
      ></div>
      {/* Chart container */}
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "400px",
          position: "relative", // Ensure stacking context
          zIndex: 1, // Lower than navbar
        }}
      ></div>
    </div>
  );
};

export default PieChart3D;
