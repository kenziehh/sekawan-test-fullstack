import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Order } from "@/types/order";
import { Response } from "@/types/response";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

export default function Completed({ orders }: { orders: Order[] }) {
    return (
        <Authenticated>
            <h1 className="text-3xl font-semibold">
                Daftar Pemesanan Selesai
            </h1>

            <main className="overflow-x-auto">
                <table className="w-full border border-black py-1.5 rounded-md mt-10 md:mt-20 overflow-x-auto">
                    <thead>
                        <tr className="bg-primary-blue font-semibold text-lg">
                            <th className="px-2 py-4 text-center">Pengemudi</th>
                            <th className="px-2 py-4 text-center">Tujuan</th>
                            <th className="px-2 py-4 text-center">
                                Nama Kendaraan
                            </th>
                            <th className="px-2 py-4 text-center">
                                Tipe Kendaraan
                            </th>
                            <th className="px-2 py-4 text-center">Mulai</th>
                            <th className="px-2 py-4 text-center">Selesai</th>
                            <th className="px-2 py-4 text-center">
                                Approver 1
                            </th>
                            <th className="px-2 py-4 text-center">
                                Approver 2
                            </th>
                            <th className="px-2 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: Order) => {
                            return (
                                <tr
                                    key={order.id}
                                    className="odd:bg-primary-blue/20 even:bg-primary-blue/40"
                                >
                                    <td className="px-3 py-2 text-center">
                                        {order.driver_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.purpose}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.vehicle_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.vehicle_type === "goods"
                                            ? "Barang"
                                            : "Orang"}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.start_time}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.end_time}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.approver_1_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.approver_2_name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {order.status}
                                    </td>{" "}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* <Pagination links={orders.meta.links} /> */}
            </main>
        </Authenticated>
    );
}
