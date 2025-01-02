import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { format } from "date-fns";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Define types
interface VehicleTypeStatusData {
    type: string;
    status: string;
    total: number;
}

interface TopVehicleData {
    name: string;
    total: number;
}

interface OrderData {
    month: number;
    year: number;
    total: number;
}

export default function Dashboard() {
    const [vehicleTypeStatusData, setVehicleTypeStatusData] = useState<
        VehicleTypeStatusData[]
    >([]);
    const [topVehicles, setTopVehicles] = useState<TopVehicleData[]>([]);
    const [orderData, setOrderData] = useState<OrderData[]>([]);

    // Fetch data from the server
    useEffect(() => {
        axios
            .get("/charts")
            .then((response) => {
                const data = response.data;
                setVehicleTypeStatusData(data.vehicle_type_status);
                setTopVehicles(data.top_vehicles);
                setOrderData(
                    data.order_per_month.map(
                        (item: { month: number; total: number }) => ({
                            month: item.month,
                            year: new Date().getFullYear(), // Assume current year
                            total: item.total,
                        })
                    )
                );
            })
            .catch((error) => {
                console.error("Error fetching chart data:", error);
            });
    }, []);

    // Prepare data for stacked bar chart (vehicle type status)
    const vehicleTypeStatusChartData = {
        labels: [...new Set(vehicleTypeStatusData.map((item) => item.type))], // Unique vehicle types
        datasets: [
            {
                label: "Available",
                data: vehicleTypeStatusData
                    .filter((item) => item.status === "available")
                    .map((item) => item.total),
                backgroundColor: "#256BED",
            },
            {
                label: "Not Available",
                data: vehicleTypeStatusData
                    .filter((item) => item.status === "not available")
                    .map((item) => item.total),
                backgroundColor: "#F44336",
            },
        ],
    };

    // Prepare data for horizontal bar chart (top vehicles)
    const topVehiclesChartData = {
        labels: topVehicles.map((item) => item.name),
        datasets: [
            {
                label: "Total Usage",
                data: topVehicles.map((item) => item.total),
                backgroundColor: "#256BED",
            },
        ],
    };

    // Prepare data for order per month chart
    const orderChartData = {
        labels: orderData.map((item) =>
            format(new Date(item.year, item.month - 1), "MMMM yyyy")
        ),
        datasets: [
            {
                label: "Orders per Month",
                data: orderData.map((item) => item.total),
                backgroundColor: "#256BED",
            },
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <main>
                <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
                <section className="mt-20 grid grid-cols-1 2xl:grid-cols-2 gap-y-32 gap-x-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            Vehicle Type Status
                        </h3>
                        <Bar
                            data={vehicleTypeStatusChartData}
                            options={{
                                plugins: { legend: { position: "top" } },
                                responsive: true,
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            Top 5 Most Used Vehicles
                        </h3>
                        <Bar data={topVehiclesChartData} />
                    </div>
                    <div className="col-span-2">
                        <h3 className="text-2xl font-semibold mb-4">
                            Orders per Month
                        </h3>
                        <Bar data={orderChartData} />
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
