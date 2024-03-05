<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/login', [AuthController::class, 'loginToAccount']);

Route::middleware('auth:sanctum')->group(['prefix' => 'movement'], function () {
    Route::post('create', [\App\Http\Controllers\MovementController::class, 'create']);
    Route::get('getList', [\App\Http\Controllers\MovementController::class, 'getList']);
    Route::patch('status', [\App\Http\Controllers\MovementController::class, 'updateStatus']);
});
