<?php

namespace App\Http\Controllers;

use App\Http\Resources\LogResource;
use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logs = Log::all();
        return LogResource::collection($logs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json(['message' => 'This endpoint is not applicable for API-based resource creation.']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'action' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $log = Log::create($validated);

        return response()->json(["message" => "Log created successfully", "log" => $log], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Log $log)
    {
        return new LogResource($log);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Log $log)
    {
        return response()->json(['message' => 'This endpoint is not applicable for API-based resource editing.']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Log $log)
    {
        $validated = $request->validate([
            'action' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $log->update($validated);

        return response()->json(["message" => "Log updated successfully", "log" => $log]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Log $log)
    {
        $log->delete();

        return response()->json(["message" => "Log deleted successfully"]);
    }
}
