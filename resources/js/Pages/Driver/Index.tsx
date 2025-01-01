import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Driver } from "@/types/driver";
import { Response } from "@/types/response";
import React from "react";

export default function Index({ drivers }: { drivers: Response<Driver[]> }) {
    console.log(drivers);
    return (
        <Authenticated>
            <main>
                <h1 className="text-3xl font-semibold">Daftar Pengemudi</h1>
                <section className="overflow-x-auto">
                    <table className="border border-black py-1.5 rounded-md mt-10 md:mt-20 w-full">
                        <thead>
                            <tr className="bg-primary-blue font-semibold text-lg">
                                <th className="px-2 py-4 text-center">Nomor</th>
                                <th className="px-2 py-4 text-center">Nama</th>
                                <th className="px-2 py-4 text-center">
                                    Tanggal Bergabung
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {drivers.data.map((driver: Driver) => {
                                return (
                                    <tr
                                        key={driver.id}
                                        className="odd:bg-primary-blue/20 even:bg-primary-blue/40"
                                    >
                                        <td className="px-3 py-2 text-center">
                                            {driver.id}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {driver.name}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {driver.created_at}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination links={drivers.meta?.links ?? []} />
                </section>
            </main>
        </Authenticated>
    );
}
