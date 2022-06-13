<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

define('DB_HOST', 'localhost:3306');
define('DB_USER', 'kontreiw_root');
define('DB_PASS', 'Venter@2258');
define('DB_NAME', 'kontreiw_db');