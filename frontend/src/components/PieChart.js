import React, { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const PieChart3D = ({ data }) => {
  const chartRef = useRef(null);
  const labelContainerRef = useRef(null);

  const hasData = data?.values?.some((val) => val > 0); // Check if there's any non-zero value

  useLayoutEffect(() => {
    if (!hasData) return; // Skip chart setup if no data

    const chart = am4core.create(chartRef.current, am4charts.PieChart3D);
    chart.logo.disabled = true;
    chart.hiddenState.properties.opacity = 0;
    chart.innerRadius = am4core.percent(0);
    chart.depth = 20;
    chart.angle = 30;

    const totalValue = data.values.reduce((sum, val) => sum + val, 0);

    chart.data = data.labels.map((label, index) => ({
      category: label,
      value: ((data.values[index] / totalValue) * 100).toFixed(2),
      realValue: data.values[index],
    })).filter(d => d.value > 0);

    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    series.slices.template.adapter.add("fill", (fill, target) =>
      am4core.color(colors[target.dataItem.index % colors.length])
    );

    series.slices.template.cornerRadius = 10;
    series.slices.template.tooltipText = "[bold]{category}[/]: {value}% ({realValue})";
    series.labels.template.disabled = false;
    series.labels.template.text = "{value}%";
    series.labels.template.fill = am4core.color("#000000");
    series.labels.template.fontSize = 14;
    series.labels.template.radius = am4core.percent(-40);
    series.labels.template.horizontalCenter = "middle";
    series.labels.template.verticalCenter = "middle";

    if (labelContainerRef.current) {
      labelContainerRef.current.innerHTML = "";
      labelContainerRef.current.style.position = "relative";
      labelContainerRef.current.style.zIndex = 1;
    }

    chart.data.forEach((item, index) => {
      const labelItem = document.createElement("div");
      labelItem.style.display = "flex";
      labelItem.style.alignItems = "center";
      labelItem.style.marginRight = "15px";

      const colorBox = document.createElement("div");
      colorBox.style.width = "14px";
      colorBox.style.height = "14px";
      colorBox.style.backgroundColor = colors[index % colors.length];
      colorBox.style.marginRight = "5px";

      const text = document.createElement("span");
      text.innerText = item.category;
      text.style.fontSize = "12px";
      text.style.fontWeight = "bold";

      labelItem.appendChild(colorBox);
      labelItem.appendChild(text);
      labelContainerRef.current.appendChild(labelItem);
    });

    series.hiddenState.properties.startAngle = -90;
    series.hiddenState.properties.endAngle = 270;

    return () => {
      chart.dispose();
    };
  }, [data]);

  if (!hasData) return null; // Don't render anything if there's no data

  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        ref={labelContainerRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "5px",
          position: "relative",
          zIndex: 1,
        }}
      ></div>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "320px",
          position: "relative",
          zIndex: 1,
        }}
      ></div>
    </div>
  );
};

export default PieChart3D;
