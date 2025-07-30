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
        try {
            // Validação
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'erro' => true,
                    'mensagem' => 'Erro de validação',
                    'detalhes' => $validator->errors(),
                ], 422);
            }

            // Buscar usuário
            $usuario = Usuario::where('email', $request->email)->first();

            // Verificar senha
            if (!$usuario || !Hash::check($request->password, $usuario->password)) {
                return response()->json([
                    'erro' => true,
                    'mensagem' => 'Credenciais inválidas',
                ], 401);
            }

            // Gerar token
            $token = $usuario->createToken('auth-token')->plainTextToken;

            return response()->json([
                'mensagem' => 'Login bem-sucedido',
                'usuario' => $usuario->only(['id', 'nome', 'email']),
                'token' => $token
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'erro' => true,
                'mensagem' => 'Erro inesperado ao tentar fazer login',
                'detalhes' => $e->getMessage(),
            ], 500);
        }
    }


    public function perfil(Request $request)
    {
        return response()->json($request->user()); 
    }

    public function storeApi(Request $request)
    {
        try{
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'erro' => true,
                'mensagem' => 'Erro de validação',
                'detalhes' => $e->errors(), // lista todos os erros de cada campo
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'erro' => true,
                'mensagem' => 'Erro inesperado ao criar usuário',
                'detalhes' => $e->getMessage(),
            ], 500);
        }
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
