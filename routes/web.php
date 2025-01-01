<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Route::get('/dashboard/vehicle-order', [VehicleOrderController::class, 'index'])->name('vehicle-order.index');
    Route::get('/dashboard/vehicle', [VehicleController::class, 'index'])->name('vehicle.index');
    // Route::get('/dashboard/permission', [PermissionController::class, 'index'])->name('permission.index');
    // Route::get('/dashboard/driver', [DriverController::class, 'index'])->name('driver.index');
    // Route::get('/dashboard/report', [ReportController::class, 'index'])->name('report.index');
    // Route::get('/dashboard/log', [LogController::class, 'index'])->name('log.index');
});

require __DIR__ . '/auth.php';
