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
        $vehicleTypeStatusStats = Vehicle::select('type', 'status', DB::raw('count(*) as total'))
            ->groupBy('type', 'status')
            ->get();

        $topVehicles = Order::select('vehicles.name', DB::raw('count(orders.id) as total'))
            ->join('vehicles', 'orders.vehicle_id', '=', 'vehicles.id')
            ->groupBy('vehicles.name')
            ->orderBy('total', 'desc')
            ->take(5)
            ->get();

        $orderStats = Order::select(DB::raw('MONTH(start_time) as month'), DB::raw('count(*) as total'))
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        $vehicleTypeStats = Vehicle::select('type', DB::raw('count(*) as total'))
            ->groupBy('type')
            ->get();

        return response()->json([
            'vehicle_type_status' => $vehicleTypeStatusStats,
            'top_vehicles' => $topVehicles,
            'order_per_month' => $orderStats,
            'vehicle_types' => $vehicleTypeStats,
        ]);
    }
}
