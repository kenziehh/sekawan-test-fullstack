import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Order } from "@/types/order";
import { Response } from "@/types/response";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { toast } from "sonner";

export default function Index({ orders }: { orders: Response<Order[]> }) {
    const handleFinish = async (orderId: number) => {
        try {
            const response = await axios.post(`/orders/${orderId}/finish`);
            toast.success(response.data.message);
            window.location.reload();
        } catch (error: any) {
            alert(error.response?.data?.message || "Terjadi kesalahan.");
        }
    };
    const handleDelete = async (orderId: number) => {
        try {
            const response = await axios.delete(`/orders/${orderId}`);
            toast.success(response.data.message);
            window.location.reload();
        } catch (error: any) {
            console.log(error);
            alert(error.response?.data?.message || "Terjadi kesalahan.");
        }
    };

    return (
        <Authenticated>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-3xl font-semibold">
                    Daftar Permintaan Kendaraan
                </h1>
                <Link href={route("order.create")}>
                    <PrimaryButton>Buat Permintaan</PrimaryButton>
                </Link>
            </div>

            <main className="overflow-x-auto">
                <table className="border border-black py-1.5 rounded-md mt-10 md:mt-20 overflow-x-auto w-full">
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
                            <th className="px-2 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.data.map((order: Order) => {
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
                                    <td className="px-2 py-4 text-center flex flex-col gap-2">
                                        {order.status==="approved" && <PrimaryButton
                                            onClick={() =>
                                                handleFinish(order.id)
                                            }
                                            className="flex justify-center items-center"
                                        >
                                            Selesaikan
                                        </PrimaryButton>}
                                        
                                        <DangerButton
                                            onClick={() =>
                                                handleDelete(order.id)
                                            }
                                            className="flex justify-center items-center"
                                        >
                                            Hapus
                                        </DangerButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <Pagination links={orders.links ?? []} />
            </main>
        </Authenticated>
    );
}
