<?php

use App\Http\Controllers\FavoritoController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\VariacaoProdutoController;
use App\Http\Controllers\CorController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TamanhoController;

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

        Route::get('/telaCadastroProdutos', [ProdutoController::class, 'create'])->name('produtos.create');

        Route::post('/produtos', [ProdutoController::class, 'store'])->name('produtos.store');

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



        
    // Area de marcas

        Route::resource('marcas', MarcaController::class);

    // Area de variacao de produtos
        Route::get('/produtos/{produto}/variacoes', [VariacaoProdutoController::class, 'index'])->name('variacoes.index');
        Route::get('/variacoes/{id}/edit', [VariacaoProdutoController::class, 'edit'])->name('variacoes.edit');
        Route::put('/variacoes/{id}', [VariacaoProdutoController::class, 'update'])->name('variacoes.update');
        Route::delete('/variacoes/{id}', [VariacaoProdutoController::class, 'destroy'])->name('variacoes.destroy');
        Route::get('/variacoes/create', [VariacaoProdutoController::class, 'create'])->name('variacoes.create');
        Route::post('/variacoes', [VariacaoProdutoController::class, 'store'])->name('variacoes.store');



    // Area de cores
        Route::resource('cores', CorController::class);
        
        Route::get('/produto/{id}/cores', [App\Http\Controllers\ProdutoController::class, 'getCores'])
            ->name('produto.cores');

    // Area de tamanhos
    Route::resource('tamanhos', TamanhoController::class);

?>