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
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface VehicleData {
    status: string;
    total: number;
    type: string;
}

interface OrderData {
    month: number;
    year: number;
    total: number;
}

export default function Dashboard() {
    const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
    const [orderData, setOrderData] = useState<OrderData[]>([]);
    const [vehicleTypeData, setVehicleTypeData] = useState<VehicleData[]>([]);

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
                setVehicleTypeData(data.vehicle_types);
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
                backgroundColor: ["#256BED", "#F44336"],
            },
        ],
    };

    const orderChartData = {
        labels: orderData.map((item) =>
            format(new Date(item.year - 1, item.month - 1), "MMMM yyyy")
        ),
        datasets: [
            {
                label: "Orders per Month",
                data: orderData.map((item) => item.total),
                backgroundColor: "#256BED",
            },
        ],
    };

    const vehicleTypeChartData = {
        labels: vehicleTypeData.map((item) => item.type),
        datasets: [
            {
                label: "Vehicle Types",
                data: vehicleTypeData.map((item) => item.total),
                backgroundColor: ["#F44336", "#256BED"],
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
                <section className="mt-20 grid grid-cols-1 2xl:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            Vehicle Status
                        </h3>
                        <Bar data={vehicleChartData} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            Orders per Month
                        </h3>
                        <Bar data={orderChartData} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">
                            Vehicle Types
                        </h3>
                        <Pie data={vehicleTypeChartData} />
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
