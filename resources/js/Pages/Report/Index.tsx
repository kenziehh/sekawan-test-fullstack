import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import Layout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Order } from "@/types/order";

interface Props {
    orders: Order[];
    startDate: string;
    endDate: string;
}

export default function Index({
    orders: initialOrders,
    startDate: initialStartDate,
    endDate: initialEndDate,
}: Props) {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [loading, setLoading] = useState(false);

    const handleFilter = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/reports", {
                params: { start_date: startDate, end_date: endDate },
            });
            const filtered = response.data.orders
            setOrders(filtered);
        } catch (error) {
            console.error("Error fetching filtered data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";

        const ws = XLSX.utils.json_to_sheet(
            orders?.map((order) => ({
                ID: order.id,
                Vehicle: order.vehicle_name,
                Driver: order.driver_name,
                "Approver 1": order.approver_1_name,
                "Approver 2": order.approver_2_name,
                "Start Time": order.start_time,
                "End Time": order.end_time,
                Purpose: order.purpose,
                Status: order.status,
            }))
        );

        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `vehicle_orders_report${fileExtension}`);
    };

    return (
        <Layout>
            <Head title="Vehicle Order Reports" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-semibold mb-6">
                        Vehicle Order Reports
                    </h1>
                    <div className="overflow-x-auto">
                        <div className="mb-4 flex space-x-4">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            />
                            <button
                                onClick={handleFilter}
                                disabled={loading}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                {loading ? "Filtering..." : "Filter"}
                            </button>
                            <button
                                onClick={handleExport}
                                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 active:bg-green-700 focus:outline-none focus:border-green-700 focus:ring ring-green-300 disabled:opacity-25 transition ease-in-out duration-150"
                            >
                                Export to Excel
                            </button>
                        </div>
                        <table className="border border-black py-1.5 rounded-md mt-10 md:mt-20 w-full">
                            <thead>
                                <tr className="bg-primary-blue font-semibold text-lg">
                                    <th className="px-2 py-4 text-center">
                                        ID
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        Vehicle
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        Driver
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        Approver 1
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        Approver 2
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        Start Time
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        End Time
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        Purpose
                                    </th>
                                    <th className="px-2 py-4 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.length >= 1 ? (
                                    orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className="odd:bg-primary-blue/20 even:bg-primary-blue/40"
                                        >
                                            <td className="px-3 py-2 text-center">
                                                {order.id}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.vehicle_name}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.driver_name}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.approver_1_name}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.approver_2_name}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.start_time}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.end_time}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.purpose}
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                {order.status}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan={9}>
                                            Tidak ada data dalam rentang waktu yang dipilih.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
