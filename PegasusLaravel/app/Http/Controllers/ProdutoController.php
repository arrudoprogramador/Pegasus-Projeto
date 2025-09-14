<?php

namespace App\Http\Controllers;

use App\Models\Favorito;
use App\Models\Produto;
use Illuminate\Http\Request;
use App\Models\Marca;  

class ProdutoController extends Controller
{
    // Lista produtos (web)
    public function index()
    {
        $produtos = Produto::all();
        return view('produtos.index', compact('produtos'));
    }

    public function create()
{
    $marcas = Marca::all();
    return view('produtos.cadastrarProdutos', compact('marcas'));
}

    // Lista produtos (API)
    public function indexApi()
    {
        try {
            $produtos = Produto::with('variacoes')->get();

            return response()->json([
                'success' => true,
                'mensagem' => 'Lista de produtos carregada com sucesso',
                'data' => $produtos
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'mensagem' => 'Erro ao carregar produtos',
                'detalhes' => $e->getMessage()
            ], 500);
        }
    }

    // Cadastra novo produto
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'marca_id' => 'required|exists:marcas,id',
            'descricao' => 'required|string',
            'imagem_capa' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $fotoPath = null;

        if ($request->hasFile('imagem_capa')) {
            $file = $request->file('imagem_capa');

            if ($file->isValid()) {
                $directory = public_path('img/produtos');
                if (!file_exists($directory)) {
                    mkdir($directory, 0777, true);
                }

                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($directory, $fileName);
                $fotoPath = $fileName;
            }
        }

        $produto = new Produto();
        $produto->nome = $request->input('nome');
        $produto->marca_id = $request->input('marca_id');
        $produto->descricao = $request->input('descricao');
        $produto->imagem_capa = $fotoPath; 
        $produto->save();

        return redirect()->route('produtos.index')->with('success', 'Produto cadastrado com sucesso!');
    }


    // Favoritar/desfavoritar produto
    // public function favoritar($id)
    // {
    //     try {
    //         $produto = Produto::with('variacoes')->findOrFail($id);
    //         $jaFavoritado = Favorito::where('produto_id', $produto->id)->exists();

    //         if (!$jaFavoritado) {
    //             Favorito::create([
    //                 'produto_id' => $produto->id,
    //                 'nome' => $produto->nome,
    //                 'descricao' => $produto->descricao,
    //                 'foto' => $produto->variacoes->first()->foto ?? null,
    //                 'preco' => $produto->variacoes->first()->preco ?? null,
    //                 'created_at' => now(),
    //                 'updated_at' => now(),
    //             ]);

    //             $message = 'Produto adicionado aos favoritos!';
    //             $alertType = 'success';
    //         } else {
    //             Favorito::where('produto_id', $produto->id)->delete();

    //             $message = 'Produto removido dos favoritos!';
    //             $alertType = 'info';
    //         }

    //         return back()->with($alertType, $message);
    //     } catch (\Exception $e) {
    //         return back()->with('error', 'Erro: ' . $e->getMessage());
    //     }
    // }

    // Exibe formulário de edição
    public function edit($id)
    {
        $produto = Produto::findOrFail($id);
        $marcas = Marca::all();
        return view('produtos.editProdutos', compact('produto', 'marcas'));
    }

    // Atualiza produto
    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'marca_id' => 'required|exists:marcas,id',
            'descricao' => 'required|string',
            'imagem_capa' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // agora a imagem é opcional
        ]);

        $produto = Produto::findOrFail($id);

        // Atualiza os campos principais
        $produto->nome = $request->input('nome');
        $produto->marca_id = $request->input('marca_id');
        $produto->descricao = $request->input('descricao');

        // Se o usuário enviou uma nova imagem, salva ela
        if ($request->hasFile('imagem_capa')) {
            $file = $request->file('imagem_capa');

            if ($file->isValid()) {
                $directory = public_path('img/produtos');
                if (!file_exists($directory)) {
                    mkdir($directory, 0777, true);
                }

                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($directory, $fileName);

                $produto->imagem_capa = $fileName;
            }
        }

        $produto->save();

        return redirect()->route('produtos.index')->with('success', 'Produto atualizado com sucesso!');
    }


    // Deleta produto
    public function destroy($id)
    {
        $produto = Produto::find($id);

        if ($produto) {
            $produto->delete();
            return redirect()->route('produtos.index')->with('success', 'Produto excluído com sucesso!');
        }

        return response()->json(['mensagem' => 'Produto não encontrado'], 404);
    }
}
