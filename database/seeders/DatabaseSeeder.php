<?php

namespace Database\Seeders;

use App\Models\User;
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
    }
}
