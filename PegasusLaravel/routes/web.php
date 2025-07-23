<?php

use App\Http\Controllers\ProdutoController;
use Illuminate\Support\Facades\Route;

// gets
    // Página inicial
    Route::get('/', function () {
        return view('index');
    })->name('index');


    // Area de Produtos
        Route::get('/visualizarProdutos', [ProdutoController::class, 'index'])->name('produtos.index');





    // Componentes
        Route::get('/navbarAdmin', function () {
            return view('componentes.navbarAdmin');
        })->name('navbarAdmin');

    // ______________________


// posts    

    // ______________________


// puts

    // Area de Produtos
        // Cadastrar
        Route::get('/telaCadastroProdutos', function () {
            return view('produtos.cadastrarProdutos');
        });

        Route::post('/cadastrarProdutos', [ProdutoController::class, 'store'])->name('produto.cadastro');

        // Editar
        Route::get('/produto/{id}', [ProdutoController::class, 'edit'])->name('produto.edit'); // página
        Route::put('/produto/{id}/edit', [ProdutoController::class, 'update'])->name('produto.update');  // ação

        // Excluir
        Route::delete('/excluirProduto/{id}', [ProdutoController::class, 'destroy'])->name('produto.excluir');

    // ______________________


    // Area de Favoritos
    
// destroys
    
?>