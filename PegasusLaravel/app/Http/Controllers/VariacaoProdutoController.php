<?php

namespace App\Http\Controllers;

use App\Models\Cor;
use App\Models\VariacaoProduto;
use App\Models\Produto;
use App\Models\Tamanho;
use Illuminate\Http\Request;

class VariacaoProdutoController extends Controller
{
    // Lista todas as variações
    public function index($produtoId)
    {
        $produto = Produto::findOrFail($produtoId);

        $variacoes = VariacaoProduto::where('produto_id', $produtoId)->get();

        return view('produtos.variacoes.index', compact('produto', 'variacoes'));
    }

    // Lista produtos (API)
    public function indexApi()
{
    try {
        $variacoes = VariacaoProduto::with(['produto', 'cor', 'tamanho'])
            ->where('ativo', 1)
            ->get()
            ->map(function ($variacao) {
                return [
                    // Informações básicas
                    'id' => $variacao->id,
                    'nome' => $variacao->produto->nome,
                    'descricao' => $variacao->produto->descricao ?? '',
                    'preco' => (float)$variacao->preco,
                    'preco_original' => (float)$variacao->produto->preco_original ?? null,
                    'estoque' => $variacao->estoque,
                    'ativo' => $variacao->ativo,
                    
                    // Imagens
                    'foto' => $variacao->foto ? url("/img/variacoes/{$variacao->foto}") : null,
                    'foto_produto' => $variacao->produto->foto ? url("/img/produtos/{$variacao->produto->foto}") : null,
                    
                    // Variações
                    'cor' => $variacao->cor ? [
                        'id' => $variacao->cor->id,
                        'nome' => $variacao->cor->nome,
                        'codigo' => $variacao->cor->codigo
                    ] : null,
                    
                    'tamanho' => $variacao->tamanho ? [
                        'id' => $variacao->tamanho->id,
                        'nome' => $variacao->tamanho->nome
                    ] : null,
                    
                    // Metadados
                    'categoria' => $variacao->produto->categoria->nome ?? null,
                    'marca' => $variacao->produto->marca->nome ?? null,
                    'created_at' => $variacao->created_at,
                    'updated_at' => $variacao->updated_at,
                    
                    // Flags
                    'promocao' => $variacao->produto->promocao ?? false,
                    'destaque' => $variacao->produto->destaque ?? false,
                    'novidade' => $variacao->produto->novidade ?? false
                ];
            });

        return response()->json([
            'success' => true,
            'mensagem' => 'Lista de produtos carregada com sucesso',
            'data' => $variacoes,
            'meta' => [
                'total' => count($variacoes),
                'disponiveis' => count($variacoes->filter(fn($item) => $item['estoque'] > 0))
            ]
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'mensagem' => 'Erro ao carregar produtos',
            'erro' => $e->getMessage()
        ], 500);
    }
}

    // Exibe o formulário para criar nova variação
    public function create()
    {
        $produtos = Produto::all();
        $cores = Cor::all();
        $tamanhos = Tamanho::all();
        
        return view('produtos.variacoes.create', compact('produtos','cores','tamanhos'));
    }

    // Salva a variação no banco
    public function store(Request $request)
    {
        
        $request->validate([
            'produto_id' => 'required|exists:produtos,id',
            'cor_id' => 'nullable|exists:cores,id',
            'tamanho_id' => 'nullable|exists:tamanhos,id',
            'preco' => 'required|numeric|min:0',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        
        $fotoPath = null;

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');

            if ($file->isValid()) {
                $directory = public_path('img/variacoes');
                if (!file_exists($directory)) {
                    mkdir($directory, 0777, true);
                }

                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($directory, $fileName);
                $fotoPath = $fileName;
            }
        }

        $variacao = VariacaoProduto::create([
            'produto_id' => $request->input('produto_id'),
            'cor_id' => $request->input('cor_id'),
            'tamanho_id' => $request->input('tamanho_id'),
            
            'preco' => $request->input('preco'),
            'foto' => $fotoPath,
        ]);

        return redirect()->route('variacoes.index', ['produto' => $variacao->produto_id])
                        ->with('success', 'Variação criada com sucesso!');    
        }


        public function favoritar($id)
    {
        try {
            $produto = VariacaoProduto::with('variacoes')->findOrFail($id);
            $jaFavoritado = VariacaoProduto::where('id', $produto->id)->exists();

            if (!$jaFavoritado) {
                VariacaoProduto::create([
                    'produto_id' => $produto->id,
                    'nome' => $produto->nome,
                    'foto' => $produto->variacoes->first()->foto ?? null,
                    'preco' => $produto->variacoes->first()->preco ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $message = 'Produto adicionado aos favoritos!';
                $alertType = 'success';
            } else {
                VariacaoProduto::where('produto_id', $produto->id)->delete();

                $message = 'Produto removido dos favoritos!';
                $alertType = 'info';
            }

            return back()->with($alertType, $message);
        } catch (\Exception $e) {
            return back()->with('error', 'Erro: ' . $e->getMessage());
        }
    }

    // Exibe formulário de edição
    public function edit($id)
    {
        $variacao = VariacaoProduto::findOrFail($id);
        $produtos = Produto::all();
        $cores = Cor::all(); 
        $tamanhos = Tamanho::all(); 
        $produtos = Produto::all();

        return view('produtos.variacoes.edit', compact('variacao', 'produtos', 'cores', 'tamanhos', ));
    }

    // Atualiza variação
    public function update(Request $request, $id)
    {
        $request->validate([
            'produto_id' => 'required|exists:produtos,id',
            'cor_id' => 'nullable|exists:cores,id',
            'tamanho_id' => 'nullable|exists:tamanhos,id',
            'preco' => 'required|numeric|min:0',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $variacao = VariacaoProduto::findOrFail($id);

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');

            if ($file->isValid()) {
                $directory = public_path('img/variacoes');
                if (!file_exists($directory)) {
                    mkdir($directory, 0777, true);
                }

                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move($directory, $fileName);
                $variacao->foto = $fileName;
            }
        }

        $variacao->produto_id = $request->input('produto_id');
        $variacao->cor_id = $request->input('cor_id');
        $variacao->tamanho_id = $request->input('tamanho_id');
        $variacao->preco = $request->input('preco');
        $variacao->save();

        return redirect()->route('variacoes.index', ['produto' => $variacao->produto_id])
                        ->with('success', 'Variação atualizada com sucesso!');
    }

    // Deleta variação
    public function destroy($id)
    {
        $variacao = VariacaoProduto::findOrFail($id);
        $variacao->delete();

        return redirect()->route('variacoes.index', ['produto' => $variacao->produto_id])
                                ->with('success', 'Variação excluída com sucesso!');    }
}
