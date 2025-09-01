<?php

use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\VariacaoProdutoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UsuarioController::class, 'loginApi']);

Route::get('/contas', [UsuarioController::class, 'indexApi']);
Route::get('/conta/{id}', [UsuarioController::class, 'showApi']);
Route::post('conta/adicionar',[UsuarioController::class, 'storeApi']);
Route::delete('/conta/excluir/{id}',[UsuarioController::class, 'destroyApi']);
Route::put('/conta/atualizar/{id}', [UsuarioController::class, 'updateApi']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Produtos
Route::get('/visualizarProdutos', [VariacaoProdutoController::class, 'indexApi'])->name('produtos.indexApi');

//Favoritos
Route::get('/visualizarFavoritos', [FavoritoController::class, 'indexApi'])->name('favoritos.indexApi');
