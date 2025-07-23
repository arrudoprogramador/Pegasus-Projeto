<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function indexApi()
    {
        $usuario = Usuario::all();
        return response()->json($usuario);
    }

    public function perfil(Request $request)
    {
        return response()->json($request->user()); 
    }

    public function storeApi(Request $request)
    {
        $request->validate([
            'nome' => 'required|string',
            'email' => 'required|email|unique:usuario,email', 
            'password' => 'required',
        ]);

        $usuario = new Usuario();
        $usuario->nome = $request->input('nome');
        $usuario->email = $request->input('email');
        $usuario->password = Hash::make($request->input('password'));

        $usuario->save();

        return response()->json([
            'mensagem' => 'Usuário criado com sucesso!',
            'usuario' => $usuario,
        ], 201);
    }

    public function destroyApi($id)
    {
        $usuario = Usuario::find($id);

        if ($usuario) {
            $usuario->delete();
            return response()->json(['mensagem' => 'Usuário deletado com sucesso!']);
        }

        return response()->json(['mensagem' => 'Usuário não encontrado'], 404);
    }
}
