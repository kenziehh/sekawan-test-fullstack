import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Response } from "@/types/response";
import { Vehicle } from "@/types/vehicle";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    vehicles,
}: {
    vehicles: Response<Vehicle[]>;
}) {
    console.log(vehicles);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <h1 className="text-base md:text-3xl font-semibold">
                Daftar Kendaraan
            </h1>
            <div className="overflow-x-auto w-full">
                <table className="border border-black py-1.5 rounded-md mt-10 md:mt-20 w-full">
                    <thead>
                        <tr className="bg-primary-blue font-semibold text-lg">
                            <th className="px-2 py-4 text-center">
                                Nama Kendaraan
                            </th>
                            <th className="px-2 py-4 text-center">
                                Tipe Kendaraan
                            </th>
                            <th className="px-2 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.data.map((vehicle: Vehicle) => {
                            return (
                                <tr
                                    key={vehicle.id}
                                    className="odd:bg-primary-blue/20 even:bg-primary-blue/40"
                                >
                                    <td className="px-3 py-2 text-center">
                                        {vehicle.name}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {vehicle.type === "goods"
                                            ? "Barang"
                                            : "Orang"}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        {vehicle.status === "available"
                                            ? "Tersedia"
                                            : "Tidak Tersedia"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Pagination links={vehicles.meta?.links ?? []} />
        </AuthenticatedLayout>
    );
}
