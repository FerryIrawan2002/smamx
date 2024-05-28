<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [

                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'role' => 'admin',
                'status' => true,
                'password' => bcrypt('admin123'),
                'copy_password' => 'admin123'
            ],
            // [

            //     'name' => 'Siswa',
            //     'email' => 'siswa@gmail.com',
            //     'role' => 'siswa',
            //     'status' => true,
            //     'password' => bcrypt('siswa123'),
            //     'copy_password' => 'siswa123'
            // ],
            // [

            //     'name' => 'Siswa',
            //     'email' => 'siswa2@gmail.com',
            //     'role' => 'siswa',
            //     'status' => true,
            //     'password' => bcrypt('siswa123'),
            //     'copy_password' => 'siswa123'
            // ],
            // [

            //     'name' => 'Guru',
            //     'email' => 'guru@gmail.com',
            //     'role' => 'guru',
            //     'status' => true,
            //     'password' => bcrypt('guru123'),
            //     'copy_password' => 'guru123'
            // ],
            // [

            //     'name' => 'Siswa',
            //     'email' => 'siswa3@gmail.com',
            //     'role' => 'siswa',
            //     'status' => true,
            //     'password' => bcrypt('siswa123'),
            //     'copy_password' => 'siswa123'
            // ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
