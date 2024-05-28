import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface Props {
    male: Number;
    female: Number;
}
const DoughnutChart = ({ male, female }: Props) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const options = {
            chart: {
                type: "donut",
            },
            series: [male, female],
            labels: ["Perempuan", "Laki-laki"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        };

        const chart = new ApexCharts(chartRef.current, options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    return <div ref={chartRef}></div>;
};

export default DoughnutChart;
