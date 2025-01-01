<?php

namespace Database\Seeders;

use App\Models\ApprovalLevel;
use App\Models\Driver;
use App\Models\Log;
use App\Models\Order;
use App\Models\User;
use App\Models\Vehicle;
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

        // Create finished orders and approval levels
        foreach (range(1, 100) as $index) {
            $order = Order::create([
                'vehicle_id' => Vehicle::inRandomOrder()->first()->id,
                'driver_id' => Driver::inRandomOrder()->first()->id,
                'start_time' => now()->addDays(rand(1, 10)),
                'end_time' => now()->addDays(rand(11, 20)),
                'purpose' => 'Order purpose ' . $index,
                'status' => 'completed',
            ]);

            // Create approval levels (minimum 2 per order)
            foreach (range(1, 2) as $level) {
                $approver = User::where('role', 'approver')->inRandomOrder()->first();
                ApprovalLevel::create([
                    'order_id' => $order->id,
                    'approver_id' => User::where('role', 'approver')->inRandomOrder()->first()->id,
                    'status' => 'approved',
                ]);
                Log::create([
                    'action' => 'Approval',
                    'description' => "Approver {$approver->name} approved order {$order->id}",
                    'user_id' => $approver->id,
                ]);

            }
        }

        // Create unfinished orders and approval levels
        foreach (range(1, 50) as $index) {
            $order = Order::create([
                'vehicle_id' => Vehicle::inRandomOrder()->first()->id,
                'driver_id' => Driver::inRandomOrder()->first()->id,
                'start_time' => now()->addDays(rand(1, 10)),
                'end_time' => now()->addDays(rand(11, 20)),
                'purpose' => 'Order purpose ' . $index,
                'status' => 'pending',
            ]);

            // Create approval levels (minimum 2 per order)
            foreach (range(1, 2) as $level) {
                $approver = User::where('role', 'approver')->inRandomOrder()->first();
                ApprovalLevel::create([
                    'order_id' => $order->id,
                    'approver_id' => User::where('role', 'approver')->inRandomOrder()->first()->id,
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
