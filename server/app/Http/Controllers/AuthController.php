<?php

namespace App\Http\Controllers;

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

        if (!Auth::attempt($attrs)) {
            return \response([
                'message' => 'invalid credentials',
            ], 403);
        }

        $token = auth()->user()->createToken('api_token')->plainTextToken;

        return response([
            'message' => 'ok',
            'token' => $token,
        ], 200);
    }
}
