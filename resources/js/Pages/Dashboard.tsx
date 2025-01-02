import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface VehicleData {
    status: string;
    total: number;
}

interface OrderData {
    month: number;
    year: number;
    total: number;
}

export default function Dashboard() {
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
    const [orderData, setOrderData] = useState<OrderData[]>([]);

    useEffect(() => {
        axios
            .get("/charts")
            .then((response) => {
                const data = response.data;
                setVehicleData(data.vehicle_status);
                setOrderData(
                    data.order_per_month.map(
                        (item: { month: number; total: number }) => ({
                            month: item.month,
                            year: new Date().getFullYear(), 
                            total: item.total,
                        })
                    )
                );
            })
            .catch((error) => {
                console.error("Error fetching chart data:", error);
            });
    }, []);

    const vehicleChartData = {
        labels: vehicleData.map((item) => item.status),
        datasets: [
            {
                label: "Vehicle Status",
                data: vehicleData.map((item) => item.total),
                backgroundColor: ["#4CAF50", "#F44336"],
            },
        ],
    };

    const orderChartData = {
        labels: orderData.map((item) =>
            format(new Date(item.year-1, item.month - 1), "MMMM yyyy")
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
                <section className="mt-20 grid grid-cols-1 2xl:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium mb-4">
                            Vehicle Status
                        </h3>
                        <Bar data={vehicleChartData} />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4">
                            Orders per Month
                        </h3>
                        <Bar data={orderChartData} />
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
