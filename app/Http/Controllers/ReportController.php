<?php

namespace App\Http\Controllers;

use App\Exports\OrdersExport;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Order::query()
            ->with(['vehicle', 'driver'])
            ->when($startDate, function ($query) use ($startDate) {
                return $query->where('start_time', '>=', $startDate);
            })
            ->when($endDate, function ($query) use ($endDate) {
                return $query->where('end_time', '<=', $endDate);
            });

        $orders = $query->get();
        $orders = $orders->map(function ($order) {
            $approvers = $order->approvalLevels->take(2);
            return [
                'id' => $order->id,
                'vehicle_name' => $order->vehicle->name,
                'vehicle_type' => $order->vehicle->type,
                'driver_name' => $order->driver->name ?? null,
                'approver_1_name' => $approvers[0]->approver->name ?? null,
                'approver_2_name' => $approvers[1]->approver->name ?? null,
                'start_time' => $order->start_time,
                'end_time' => $order->end_time,
                'purpose' => $order->purpose,
                'status' => $order->status,
                'created_at' => $order->created_at,
                'updated_at' => $order->updated_at,
            ];
        });
        return Inertia::render('Report/Index', [
            'orders' => $orders,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
    public function filter(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = Order::query()
            ->with(['vehicle', 'driver'])
            ->when($startDate, function ($query) use ($startDate) {
                return $query->where('start_time', '>=', $startDate);
            })
            ->when($endDate, function ($query) use ($endDate) {
                return $query->where('end_time', '<=', $endDate);
            });

        $orders = $query->get();
        $orders = $orders->map(function ($order) {
            $approvers = $order->approvalLevels->take(2);
            return [
                'id' => $order->id,
                'vehicle_name' => $order->vehicle->name,
                'vehicle_type' => $order->vehicle->type,
                'driver_name' => $order->driver->name ?? null,
                'approver_1_name' => $approvers[0]->approver->name ?? null,
                'approver_2_name' => $approvers[1]->approver->name ?? null,
                'start_time' => $order->start_time,
                'end_time' => $order->end_time,
                'purpose' => $order->purpose,
                'status' => $order->status,
                'created_at' => $order->created_at,
                'updated_at' => $order->updated_at,
            ];
        });
        return response()->json([
            'orders' => $orders,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
}
