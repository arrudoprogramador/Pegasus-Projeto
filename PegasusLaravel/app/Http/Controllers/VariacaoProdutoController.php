<?php

namespace App\Http\Controllers;

use App\Models\VariacaoProduto;
use App\Models\Produto;
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
        return view('variacoes.create', compact('produtos'));
    }

    // Salva a variação no banco
    public function store(Request $request)
    {
        $request->validate([
            'produto_id' => 'required|exists:produtos,id',
            'cor' => 'nullable|string|max:255',
            'tamanho' => 'nullable|string|max:255',
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
            'cor' => $request->input('cor'),
            'tamanho' => $request->input('tamanho'),
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
            'cor' => 'nullable|string|max:255',
            'tamanho' => 'nullable|string|max:255',
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
        $variacao->cor = $request->input('cor');
        $variacao->tamanho = $request->input('tamanho');
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
