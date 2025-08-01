<?php

use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

    // Página inicial
    Route::get('/', function () {
        return view('index');
    })->name('index');

// ___________________

    // Componentes
        Route::get('/navbarAdmin', function () {
            return view('componentes.navbarAdmin');
        })->name('navbarAdmin');

// ___________________

    // Area de Produtos    
        Route::get('/visualizarProdutos', [ProdutoController::class, 'index'])->name('produtos.index');

        Route::get('/telaCadastroProdutos', function () {
            return view('produtos.cadastrarProdutos');
        });

        // Cadastrar
        Route::post('/cadastrarProdutos', [ProdutoController::class, 'store'])->name('produto.cadastro');

        // Editar
        Route::get('/produto/{id}', [ProdutoController::class, 'edit'])->name('produto.edit'); // página
        Route::put('/produto/{id}/edit', [ProdutoController::class, 'update'])->name('produto.update');  // ação

        // Excluir
        Route::delete('/excluirProduto/{id}', [ProdutoController::class, 'destroy'])->name('produto.excluir');


    // Area de Favoritos
        Route::get('/visualizarFavoritos', [FavoritoController::class, 'index'])->name('favoritos.index');

        Route::get('/telaCadastroFavoritos', function () {
            return view('favoritos.cadastrarFavoritos');
        });

        // Cadastrar
        Route::post('/cadastrarFavoritos', [FavoritoController::class, 'store'])->name('favorito.cadastro');

        // Fav
        Route::post('/produtos/{id}/favoritar', [ProdutoController::class, 'favoritar'])->name('produto.favoritar');
       
        // Editar
        Route::get('/favorito/{id}', [FavoritoController::class, 'edit'])->name('favorito.edit'); // página
        Route::put('/favorito/{id}/edit', [FavoritoController::class, 'update'])->name('favorito.update');  // ação

        // Excluir
        Route::delete('/excluirFavorito/{id}', [FavoritoController::class, 'destroy'])->name('favorito.excluir');


    // Area de usuários
        Route::get('/visualizarUsuarios', [UsuarioController::class, 'index'])->name('usuarios.index');

        // Excluir
        Route::delete('/excluirUsuario/{id}', [UsuarioController::class, 'destroy'])->name('usuario.excluir');

?>