import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useState, useEffect } from 'react';

const WeightChart = ({ data = [] }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        // Проверяем, что данные есть и это массив
        if (data.length > 0) {
            const labels = data.map(entry => entry.date); // даты по оси X
            const weights = data.map(entry => entry.weight); // вес по оси Y

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Вес (кг)',
                        data: weights,
                        fill: false,
                        borderColor: '#4CAF50', // зеленая линия
                        backgroundColor: '#4CAF50',
                        tension: 0.1, // плавные линии
                    },
                ],
            });
        }
    }, [data]);

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg h-3/6">
            <h2 className="text-xl font-semibold text-center mb-4">Weight</h2>
            {chartData.labels ? (
                    <div className="h-3/6">
                <Line
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,

                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Дата',
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Вес (кг)',
                                },
                                beginAtZero: true,
                            },
                        },
                    }}
                    height={400}
                />
                    </div>
            ) : (
                <p className="text-center text-gray-500">Nothing Weight</p>
            )}
        </div>
    );
};

export default WeightChart;