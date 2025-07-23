<?php

use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login', [UsuarioController::class, 'loginApi']);

Route::get('/contas', [UsuarioController::class, 'indexApi']);
Route::get('/conta/{id}', [UsuarioController::class, 'showApi']);
Route::post('conta/adicionar',[UsuarioController::class, 'storeApi']);
Route::delete('/conta/excluir/{id}',[UsuarioController::class, 'destroyApi']);
Route::put('/conta/atualizar/{id}', [UsuarioController::class, 'updateApi']);

Route::middleware('auth:sanctum')->get('/user', [UsuarioController::class, 'perfil']);


