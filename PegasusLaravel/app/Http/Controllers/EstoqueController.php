<?php

namespace App\Http\Controllers;

use App\Models\Estoque;
use App\Models\Variacao;
use App\Models\VariacaoProduto;
use Illuminate\Http\Request;

class EstoqueController extends Controller
{
    // Listar estoques
    public function index()
    {
        $estoques = Estoque::with('variacao.produto')->get();
        return view('estoques.index', compact('estoques'));
    }

    // Formulário de criação
    public function create()
    {
        $variacoes = VariacaoProduto::with('produto')->get();
        return view('estoques.create', compact('variacoes'));
    }

    // Salvar no banco
    public function store(Request $request)
    {
        $request->validate([
            'variacao_id' => 'required|exists:variacoes,id',
            'quantidade' => 'required|integer|min:0',
        ]);

        Estoque::create($request->all());

        return redirect()->route('estoques.index')->with('success', 'Estoque cadastrado com sucesso!');
    }

    // Formulário de edição
    public function edit($id)
    {
        $estoque = Estoque::findOrFail($id);
        $variacoes = VariacaoProduto::with('produto')->get();
        return view('estoques.edit', compact('estoque', 'variacoes'));
    }

    // Atualizar
    public function update(Request $request, $id)
    {
        $request->validate([
            'variacao_id' => 'required|exists:variacoes,id',
            'quantidade' => 'required|integer|min:0',
        ]);

        $estoque = Estoque::findOrFail($id);
        $estoque->update($request->all());

        return redirect()->route('estoques.index')->with('success', 'Estoque atualizado com sucesso!');
    }

    // Excluir
    public function destroy($id)
    {
        $estoque = Estoque::findOrFail($id);
        $estoque->delete();

        return redirect()->route('estoques.index')->with('success', 'Estoque removido com sucesso!');
    }
}
