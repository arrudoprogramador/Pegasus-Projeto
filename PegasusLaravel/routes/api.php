<?php

use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UsuarioController::class, 'loginApi']);

Route::get('/contas', [UsuarioController::class, 'indexApi']);
Route::get('/conta/{id}', [UsuarioController::class, 'showApi']);
Route::post('conta/adicionar',[UsuarioController::class, 'storeApi']);
Route::delete('/conta/excluir/{id}',[UsuarioController::class, 'destroyApi']);
Route::put('/conta/atualizar/{id}', [UsuarioController::class, 'updateApi']);

Route::middleware('auth:sanctum')->get('/user', [UsuarioController::class, 'perfil']);

//Produtos
Route::get('/visualizarProdutos', [ProdutoController::class, 'indexApi'])->name('produtos.indexApi');

//Favoritos
Route::get('/visualizarFavoritos', [FavoritoController::class, 'indexApi'])->name('favoritos.indexApi');
