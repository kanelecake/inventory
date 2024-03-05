<?php

use App\Http\Controllers\MovementController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('auth/login', [AuthController::class, 'loginToAccount']);
Route::post('auth/createTestUser', [AuthController::class, 'createTestUser']);

Route::middleware('auth:sanctum')->prefix('movement')->group(function () {
    Route::post('create', [MovementController::class, 'create']);
    Route::get('getList', [MovementController::class, 'getList']);
    Route::patch('status', [MovementController::class, 'updateStatus']);
});
