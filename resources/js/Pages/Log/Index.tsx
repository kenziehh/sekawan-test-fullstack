import Pagination from "@/Components/Pagination";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Log } from "@/types/log";
import { Response } from "@/types/response";
import React from "react";

export default function Index({ logs }: { logs: Response<Log[]> }) {
    console.log(logs);
    return (
        <Authenticated>
            <main>
                <h1 className="text-3xl font-semibold">Log Aktivitas</h1>
                <section className="overflow-x-auto">
                    <table className="border border-black py-1.5 rounded-md mt-10 md:mt-20 w-full">
                        <thead>
                            <tr className="bg-primary-blue font-semibold text-lg">
                                <th className="px-2 py-4 text-center">Aksi</th>
                                <th className="px-2 py-4 text-center">
                                    Deskripsi
                                </th>
                                <th className="px-2 py-4 text-center">Waktu</th>
                                <th className="px-2 py-4 text-center">User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.data.map((log: Log) => {
                                return (
                                    <tr
                                        key={log.id}
                                        className="odd:bg-primary-blue/20 even:bg-primary-blue/40"
                                    >
                                        <td className="px-3 py-2 text-center">
                                            {log.action}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {log.description}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {log.created_at}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {log.user?.name ?? "-"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <Pagination links={logs.meta?.links ?? []} />
                </section>
            </main>
        </Authenticated>
    );
}
