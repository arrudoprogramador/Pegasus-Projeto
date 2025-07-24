<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return view('usuarios.index', compact('usuarios'));      
    }

    public function indexApi()
    {
        $usuario = Usuario::all();
        return response()->json($usuario);
    }

    public function loginApi(Request $request)
        {
            // Validar os dados
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // 422 é mais apropriado para validação
        }

        $usuario = Usuario::where('email', $request->email)->first();

        // Verificar usuário e senha ANTES de criar token
        if (!$usuario || !Hash::check($request->password, $usuario->password)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        // Criar token apenas se as credenciais estiverem corretas
        $token = $usuario->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Login bem-sucedido',
            'usuario' => $usuario->only(['id', 'name', 'email']), // Não retornar todos os dados
            'token' => $token
        ], 200);
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

    public function destroy($id)
    {
        $usuario = Usuario::find($id);

        if ($usuario) {
            $usuario->delete();

            $usuarios = Usuario::all();
            return view('usuarios.index', compact('usuarios'));  
        }

        return response()->json(['mensagem' => 'Usuário não encontrado'], 404);
    }
}
