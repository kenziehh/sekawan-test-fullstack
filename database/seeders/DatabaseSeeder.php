<?php

namespace Database\Seeders;

use App\Models\ApprovalLevel;
use App\Models\Driver;
use App\Models\Log;
use App\Models\Order;
use App\Models\User;
use App\Models\Vehicle;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create 2 admin accounts
        User::factory()->create([
            'name' => 'Admin One',
            'email' => 'admin1@gmail.com',
            'role' => 'admin',
            'password' => bcrypt('admin123'),
        ]);

        User::factory()->create([
            'name' => 'Admin Two',
            'email' => 'admin2@gmail.com',
            'role' => 'admin',
            'password' => bcrypt('admin123'),
        ]);

        // Create 5 approver accounts
        foreach (range(1, 5) as $index) {
            User::factory()->create([
                'name' => "Approver {$index}",
                'email' => "approver{$index}@gmail.com",
                'role' => 'approver',
                'password' => bcrypt('approver123'),
            ]);
        }
        Vehicle::factory(50)->create();
        Driver::factory(20)->create();

        foreach (range(1, 100) as $index) {
            $startMonth = rand(1, 12);
            $startDay = rand(1, 28); // To avoid invalid dates in short months
            $startDate = Carbon::create(2024, $startMonth, $startDay);
            $endDate = $startDate->copy()->addDays(rand(1, 10));

            $order = Order::create([
                'vehicle_id' => Vehicle::inRandomOrder()->first()->id,
                'driver_id' => Driver::inRandomOrder()->first()->id,
                'start_time' => $startDate,
                'end_time' => $endDate,
                'purpose' => 'Order purpose ' . $index,
                'status' => 'completed',
            ]);

            foreach (range(1, 2) as $level) {
                $approver = User::where('role', 'approver')->inRandomOrder()->first();
                ApprovalLevel::create([
                    'order_id' => $order->id,
                    'approver_id' => $approver->id,
                    'status' => 'approved',
                ]);
                Log::create([
                    'action' => 'Approval',
                    'description' => "Approver {$approver->name} approved order {$order->id}",
                    'user_id' => $approver->id,
                ]);
            }
        }

        foreach (range(101, 150) as $index) {
            $startMonth = rand(1, 12);
            $startDay = rand(1, 28);
            $startDate = Carbon::create(2024, $startMonth, $startDay);
            $endDate = $startDate->copy()->addDays(rand(1, 10));

            $order = Order::create([
                'vehicle_id' => Vehicle::inRandomOrder()->first()->id,
                'driver_id' => Driver::inRandomOrder()->first()->id,
                'start_time' => $startDate,
                'end_time' => $endDate,
                'purpose' => 'Order purpose ' . $index,
                'status' => 'pending',
            ]);

            foreach (range(1, 2) as $level) {
                $approver = User::where('role', 'approver')->inRandomOrder()->first();
                ApprovalLevel::create([
                    'order_id' => $order->id,
                    'approver_id' => $approver->id,
                    'status' => 'pending',
                ]);
                Log::create([
                    'action' => 'Approval',
                    'description' => "Approver {$approver->name} is assigned for order {$order->id}",
                    'user_id' => $approver->id,
                ]);
            }
        }
    }
}
