<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class mysql extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mysql:createdb {name?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new mysql database schema based on the database config file';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try{
            $schemaName = $this->argument('name') ?: config("database.connections.mysql.database");
            $charset = config("database.connections.mysql.charset",'utf8mb4');
            $collation = config("database.connections.mysql.collation",'utf8mb4_general_ci');

            config(["database.connections.mysql.database" => null]);

            $query = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME =  ?";
            $db = DB::select($query, [$schemaName]);

            if (empty($db)) {
                $query = "CREATE DATABASE IF NOT EXISTS $schemaName CHARACTER SET $charset COLLATE $collation;";
                DB::statement($query);
                config(["database.connections.mysql.database" => $schemaName]);
                $this->info("Database '$schemaName' has successfully been created.");
            } else {
                $this->info("Database $schemaName already exists.");
            }
            
        }
        catch (\Exception $e){
            $this->error($e->getMessage());
        }

        
    }
}
