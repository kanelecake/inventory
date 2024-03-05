<?php

namespace App\Http\Controllers;

use App\Models\Movement;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MovementController extends Controller
{
    // createMovement используется для инициализации нового перемещения
    public function create(Request $request) : Response {
        $attr = $request->validate([
            'inventory_number' => ['required', 'regex:/^[a-zA-Z0-9]+$/'],
            'from' => ['required', 'regex:/^[а-яА-Я0-9][а-яА-Я0-9\- ]+[а-яА-Я0-9]$/'],
            'to' => ['required', 'regex:/^[а-яА-Я0-9][а-яА-Я0-9\- ]+[а-яА-Я0-9]$/'],
            'item_name' => ['required', 'regex:/^[а-яА-Я0-9 ]+$/'],
        ]);

        $movement = Movement::create([
            'inventory_number' => $attr['inventory_number'],
            'item_name' => $attr['item_name'],
            'from' => $attr['from'],
            'to' => $attr['to'],
            'moved_at' => time(),
            'user_id' => auth()->user()->id,
        ]);

        return response([
            'data' => $movement
        ], 201);
    }

    // getMovements используется для получения списка перемещений
    public function getList(Request $request) : Response {
        $attr = $request->validate([
            'offset' => 'required|numeric',
            'count' => 'required|numeric',
        ]);

        $movements = Movement::join('users', 'movements.user_id', '=', 'users.id')
            ->limit($attr['count'])
            ->offset($attr['offset'])
            ->get(['movements.*', 'users.fullname']);

        return response([
            'data' => $movements
        ], 201);
    }

    // updateStatus используется для обновления статуса перемещения
    public function updateStatus(Request $request) : Response {
        $attr = $request->validate([
            'id' => 'required|numeric|in:0,1,2',
            'status' => 'required|numeric',
        ]);

        Movement::where('id', $attr['id'])
            ->update('status', $attr['status']);

        return response([
            'ok'
        ], 200);
    }
}
