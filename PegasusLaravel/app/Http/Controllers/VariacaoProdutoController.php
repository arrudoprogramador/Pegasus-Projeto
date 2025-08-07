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
    public function index()
    {
        $variacoes = VariacaoProduto::with('produto')->get();
        return view('variacoes.index', compact('variacoes'));
    }

    // Exibe o formulário para criar nova variação
    public function create()
    {
        $produtos = Produto::all();
        $cores = Cor::all();
        $tamanhos = Tamanho::all();
        return view('variacoes.create', compact('produtos','cores','tamanhos'));
    }

    // Salva a variação no banco
    public function store(Request $request)
    {
        $request->validate([
            'produto_id' => 'required|exists:produtos,id',
            'cor_id' => 'nullable|exists:cores,id',
            'tamanho_id' => 'nullable|exists:tamanhos,id',
            'estoque' => 'required|integer|min:0',
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

        VariacaoProduto::create([
            'produto_id' => $request->input('produto_id'),
            'cor_id' => $request->input('cor_id'),
            'tamanho_id' => $request->input('tamanho_id'),
            'estoque' => $request->input('estoque'),
            'preco' => $request->input('preco'),
            'foto' => $fotoPath,
        ]);

        return redirect()->route('variacoes.index')->with('success', 'Variação criada com sucesso!');
    }

    // Exibe formulário de edição
    public function edit($id)
    {
        $variacao = VariacaoProduto::findOrFail($id);
        $produtos = Produto::all();
        return view('variacoes.edit', compact('variacao', 'produtos'));
    }

    // Atualiza variação
    public function update(Request $request, $id)
    {
        $request->validate([
            'produto_id' => 'required|exists:produtos,id',
            'cor_id' => 'nullable|exists:cores,id',
            'tamanho_id' => 'nullable|exists:tamanhos,id',
            'estoque' => 'required|integer|min:0',
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
        $variacao->estoque = $request->input('estoque');
        $variacao->preco = $request->input('preco');
        $variacao->save();

        return redirect()->route('variacoes.index')->with('success', 'Variação atualizada com sucesso!');
    }

    // Deleta variação
    public function destroy($id)
    {
        $variacao = VariacaoProduto::findOrFail($id);
        $variacao->delete();

        return redirect()->route('variacoes.index')->with('success', 'Variação excluída com sucesso!');
    }
}
