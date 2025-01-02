<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class DashboardController extends Controller
{
    public function chart()
    {
        $vehicleStats = Vehicle::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get();

        $orderStats = Order::select(DB::raw('MONTH(start_time) as month'), DB::raw('count(*) as total'))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $chartData = [
            'vehicle_status' => $vehicleStats->map(function ($item) {
                return [
                    'status' => $item->status,
                    'total' => $item->total,
                ];
            }),
            'order_per_month' => $orderStats->map(function ($item) {
                return [
                    'month' => $item->month,
                    'total' => $item->total,
                ];
            }),
        ];

        return response()->json($chartData);
    }
}
