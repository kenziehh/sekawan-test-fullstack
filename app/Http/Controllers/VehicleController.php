<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Vehicle;
use App\Http\Resources\VehicleResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{

    public function index()
    {
        $vehicles = Vehicle::paginate(10);
        return Inertia::render('Vehicle/Index', [
            'vehicles' => VehicleResource::collection($vehicles),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:person,goods',
            'status' => 'nullable|string|in:available,unavailable',
        ]);

        $vehicle = Vehicle::create($validated);

        Log::create([
            'action' => 'Vehicle Created',
            'description' => "Vehicle {$vehicle->name} of type {$vehicle->type} was created.",
            'user_id' => auth()->id(),
        ]);

        return new VehicleResource($vehicle);
    }


    public function show(Vehicle $vehicle)
    {
        return new VehicleResource($vehicle);
    }


    public function update(Request $request, Vehicle $vehicle)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'type' => 'nullable|string|in:person,goods',
            'status' => 'nullable|string|in:available,unavailable',
        ]);

        $vehicle->update($validated);

        Log::create([
            'action' => 'Vehicle Updated',
            'description' => "Vehicle {$vehicle->name} was updated.",
            'user_id' => auth()->id(),
        ]);

        return new VehicleResource($vehicle);
    }


    public function destroy(Vehicle $vehicle)
    {
        $vehicleName = $vehicle->name;
        $vehicle->delete();

        Log::create([
            'action' => 'Vehicle Deleted',
            'description' => "Vehicle {$vehicleName} was deleted.",
            'user_id' => auth()->id(),
        ]);

        return response()->json(['message' => 'Vehicle deleted successfully.']);
    }
}
