<?php

namespace App\Http\Controllers;

use App\Models\ApprovalLevel;
use App\Models\Driver;
use App\Models\Log;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function approver(Request $request)
    {
        $userId = auth()->id();
        $pendingOrders = Order::with(['vehicle', 'driver', 'approvalLevels.approver'])
            ->whereHas('approvalLevels', function ($query) use ($userId) {
                $query->where('approver_id', $userId)->where('status', 'pending');
            })
            ->get();
        $data = $pendingOrders->map(function ($order) {
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
        return Inertia::render('Approver/Index', [
            'orders' => $data,
        ]);
    }

    public function declined(Request $request)
    {
        $userId = auth()->id();
        $pendingOrders = Order::with(['vehicle', 'driver', 'approvalLevels.approver'])
            ->whereHas('approvalLevels', function ($query) use ($userId) {
                $query->where('approver_id', $userId)->where('status', 'rejected');
            })
            ->get();
        $data = $pendingOrders->map(function ($order) {
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
        return Inertia::render('Approver/Declined', [
            'orders' => $data,
        ]);
    }


    public function approveOrder(Request $request, $orderId)
    {
        $userId = auth()->id();

        $approvalLevel = ApprovalLevel::where('order_id', $orderId)
            ->where('approver_id', $userId)
            ->where('status', 'pending')
            ->first();

        if (!$approvalLevel) {
            return response()->json(['message' => 'Order tidak ditemukan atau sudah di-approve.'], 404);
        }

        $approvalLevel->update(['status' => 'approved']);

        Log::create([
            'action' => 'Approval',
            'description' => "User {$userId} approved order {$orderId}",
            'user_id' => $userId,
        ]);

        $allApproved = ApprovalLevel::where('order_id', $orderId)
            ->where('status', 'pending')
            ->doesntExist();

        if ($allApproved) {
            Order::where('id', $orderId)->update(['status' => 'approved']);
        }

        return response()->json(['message' => 'Order berhasil di-approve.'], 200);
    }

    public function declineOrder(Request $request, $orderId)
    {
        $userId = auth()->id();

        $approvalLevel = ApprovalLevel::where('order_id', $orderId)
            ->where('approver_id', $userId)
            ->where('status', 'pending')
            ->first();

        if (!$approvalLevel) {
            return response()->json(['message' => 'Order tidak ditemukan atau sudah di-approve.'], 404);
        }

        $approvalLevel->update(['status' => 'rejected']);

        Log::create([
            'action' => 'Approval',
            'description' => "User {$userId} rejected order {$orderId}",
            'user_id' => $userId,
        ]);


        Order::where('id', $orderId)->update(['status' => 'rejected']);


        return response()->json(['message' => 'Order berhasil di-tolak.'], 200);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $perPage = 10; // You can adjust the number of items per page

        $orders = Order::orderBy('created_at', 'DESC')
            ->paginate($perPage);

        $data = $orders->through(function ($order) {
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

        $drivers = \App\Models\Driver::select('id', 'name')->get();
        $approvers = \App\Models\User::select('id', 'name')->where('role', 'approver')->get();

        return Inertia::render('Order/Index', [
            'orders' => $data,
            'drivers' => $drivers,
            'approvers' => $approvers,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'driver_id' => 'required|exists:drivers,id',
            'vehicle_id' => 'required|exists:vehicles,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'purpose' => 'required|string',
        ]);

        try {
            $order = Order::create([
                'driver_id' => $validated['driver_id'],
                'vehicle_id' => $validated['vehicle_id'],
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'purpose' => $validated['purpose'],
                'status' => 'pending',
            ]);

            return response()->json(['message' => 'Order created successfully.', 'order' => $order], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'driver_id' => 'nullable|exists:drivers,id',
            'vehicle_id' => 'nullable|exists:vehicles,id',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'purpose' => 'nullable|string',
            'status' => 'nullable|in:pending,approved,rejected,completed',
        ]);


        try {
            $order->update($validated);

            return response()->json(['message' => 'Order updated successfully.', 'order' => $order]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {

        if (!$order) {
            return response()->json(['error' => 'Order not found.'], 404);
        }

        try {
            $order->forceDelete();

            return response()->json(['message' => 'Order deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    public function getDropdownData()
    {
        $drivers = \App\Models\Driver::select('id', 'name')->get();
        $approvers = \App\Models\User::select('id', 'name')->where('role', 'approver')->get();

        return response()->json([
            'drivers' => $drivers,
            'approvers' => $approvers,
        ]);
    }
}
