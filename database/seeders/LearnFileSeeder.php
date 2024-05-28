<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LearnFileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $learnFile = [
            [
                'learn_id' => 1,
                'name' => "asa",
                'file' => 'https://www.google.com',
            ]
        ];

        foreach ($learnFile as $file) {
            \App\Models\LearnFile::create($file);
        }
    }
}
