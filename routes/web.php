<?php

use App\Http\Controllers\DriverController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
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

    //Admin
    Route::get('/dashboard/order', [OrderController::class, 'index'])->name('order.index');
    Route::get('/dashboard/order/create', [OrderController::class, 'create'])->name('order.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('order.store');
    Route::delete('/orders/{id}', [OrderController::class, 'destroy'])->name('order.destroy');
    Route::get('/dashboard/vehicle', [VehicleController::class, 'index'])->name('vehicle.index');
    Route::get('/dashboard/report', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports', [ReportController::class, 'filter'])->name('reports.filter');

    // Route::get('/dashboard/permission', [PermissionController::class, 'index'])->name('permission.index');
    Route::get('/dashboard/driver', [DriverController::class, 'index'])->name('driver.index');
    // Route::get('/dashboard/report', [ReportController::class, 'index'])->name('report.index');
    Route::get('/dashboard/log', [LogController::class, 'index'])->name('log.index');

    //Approver
    Route::get('/dashboard/approver', [OrderController::class, 'approver'])->name('approver.index');
    Route::get('/dashboard/declined', [OrderController::class, 'declined'])->name('declined.index');
    Route::post('/orders/{orderId}/approve', [OrderController::class, 'approveOrder'])->name('orders.approve');
    Route::post('/orders/{orderId}/declined', [OrderController::class, 'declineOrder'])->name('orders.declined');
});

require __DIR__ . '/auth.php';
