import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { toast } from "sonner";
import axios from "axios";

export default function CreateOrder({
    drivers,
    approvers,
    vehicles,
}: {
    drivers: { id: number; name: string }[];
    approvers: { id: number; name: string }[];
    vehicles: { id: number; name: string; type: string }[];
}) {
    const { data, setData, post, processing, errors } = useForm({
        driver_id: "",
        vehicle_id: "",
        approver_1_id: "",
        approver_2_id: "",
        start_time: "",
        end_time: "",
        purpose: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);
        try {
            const response = await axios.post("/orders", data);
            toast.success(response.data.message);
            window.location.assign("/dashboard/order");
        } catch (error) {
            console.log(error)
            toast.error("Terjadi kesalahan.");
        }
    };

    return (
        <Authenticated>
            <div className="p-5">
                <h1 className="text-2xl font-semibold mb-5">Create Order</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Driver Dropdown */}
                    <div>
                        <label className="block mb-1">Driver</label>
                        <select
                            value={data.driver_id}
                            onChange={(e) =>
                                setData("driver_id", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        >
                            <option value="">Select Driver</option>
                            {drivers.map((driver) => (
                                <option key={driver.id} value={driver.id}>
                                    {driver.name}
                                </option>
                            ))}
                        </select>
                        {errors.driver_id && (
                            <p className="text-red-500 text-sm">
                                {errors.driver_id}
                            </p>
                        )}
                    </div>

                    {/* Approver 1 Dropdown */}
                    <div>
                        <label className="block mb-1">Approver 1</label>
                        <select
                            value={data.approver_1_id}
                            onChange={(e) =>
                                setData("approver_1_id", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        >
                            <option value="">Select Approver 1</option>
                            {approvers.map((approver) => (
                                <option key={approver.id} value={approver.id}>
                                    {approver.name}
                                </option>
                            ))}
                        </select>
                        {errors.approver_1_id && (
                            <p className="text-red-500 text-sm">
                                {errors.approver_1_id}
                            </p>
                        )}
                    </div>

                    {/* Approver 2 Dropdown */}
                    <div>
                        <label className="block mb-1">Approver 2</label>
                        <select
                            value={data.approver_2_id}
                            onChange={(e) =>
                                setData("approver_2_id", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        >
                            <option value="">Select Approver 2</option>
                            {approvers.map((approver) => (
                                <option key={approver.id} value={approver.id}>
                                    {approver.name}
                                </option>
                            ))}
                        </select>
                        {errors.approver_2_id && (
                            <p className="text-red-500 text-sm">
                                {errors.approver_2_id}
                            </p>
                        )}
                    </div>

                    {/* Vehicle Dropdown */}
                    <div>
                        <label className="block mb-1">Kendaraan</label>
                        <select
                            value={data.vehicle_id}
                            onChange={(e) =>
                                setData("vehicle_id", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        >
                            <option value="">Select Kendaraan</option>
                            {vehicles.map((vehicle) => (
                                <option key={vehicle.id} value={vehicle.id}>
                                    {vehicle.name}-
                                    {vehicle.type == "goods"
                                        ? "Barang"
                                        : "Orang"}
                                </option>
                            ))}
                        </select>
                        {errors.vehicle_id && (
                            <p className="text-red-500 text-sm">
                                {errors.vehicle_id}
                            </p>
                        )}
                    </div>

                    {/* Start Time */}
                    <div>
                        <label className="block mb-1">Start Time</label>
                        <input
                            type="datetime-local"
                            value={data.start_time}
                            onChange={(e) =>
                                setData("start_time", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        />
                        {errors.start_time && (
                            <p className="text-red-500 text-sm">
                                {errors.start_time}
                            </p>
                        )}
                    </div>

                    {/* End Time */}
                    <div>
                        <label className="block mb-1">End Time</label>
                        <input
                            type="datetime-local"
                            value={data.end_time}
                            onChange={(e) =>
                                setData("end_time", e.target.value)
                            }
                            className="border rounded w-full p-2"
                        />
                        {errors.end_time && (
                            <p className="text-red-500 text-sm">
                                {errors.end_time}
                            </p>
                        )}
                    </div>

                    {/* Purpose */}
                    <div>
                        <label className="block mb-1">Purpose</label>
                        <textarea
                            value={data.purpose}
                            onChange={(e) => setData("purpose", e.target.value)}
                            className="border rounded w-full p-2"
                        />
                        {errors.purpose && (
                            <p className="text-red-500 text-sm">
                                {errors.purpose}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </Authenticated>
    );
}
