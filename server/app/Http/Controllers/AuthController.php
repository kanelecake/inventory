<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Sign in to account
    public function loginToAccount(Request $request) : Response {
        $attrs = $request->validate([
            'username' => 'required|min:4',
            'password' => 'required|min:8',
        ]);

        $user  = User::where('username', '=', $attrs['username']) ->first();

        if (is_null($user) || !password_verify($attrs['password'], $user['password'])) {
            return response([
                'message' => 'invalid credentials',
            ], 403);
        }

        $token = $user->createToken('api_token')->plainTextToken;

        return response([
            'message' => 'ok',
            'token' => $token,
        ], 200);
    }

    // TODO: ИСПОЛЬЗУЕТСЯ ДЛЯ ОТЛАДКИ, УДАЛИТЬ НА ПРОДЕ
    public function createTestUser() : Response
    {
        try {
            $user = User::firstOrCreate([
                'email' => 'test@test.ru',
                'username' => 'test',
                'password' => password_hash('12345678', PASSWORD_BCRYPT),
                'fullname' => 'Test User',
                'role' => 'admin',
            ]);

            $token = $user->createToken('api_token')->plainTextToken;

            return response([
                'message' => 'ok',
                'token' => $token,
            ], 200);
        } catch (\Exception $e) { // It's actually a QueryException but this works too
            if ($e->getCode() == 23000) {
                return \response([
                    'message' => 'Already exists',
                ], 409);
            }
        }
    }
}
