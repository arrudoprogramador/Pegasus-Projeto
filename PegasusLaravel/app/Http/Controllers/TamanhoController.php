<?php

namespace App\Http\Controllers;

use App\Models\Tamanho;
use Illuminate\Http\Request;

class TamanhoController extends Controller
{
    /**
     * Exibir todos os tamanhos.
     */
    public function index()
    {
        $tamanhos = Tamanho::all();
        return view('tamanhos.index', compact('tamanhos'));
    }

    /**
     * Mostrar o formulário para criar um novo tamanho.
     */
    public function create()
    {
        return view('tamanhos.create');
    }

    /**
     * Armazenar um novo tamanho no banco de dados.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Tamanho::create([
            'name' => $request->input('name'),
        ]);

        return redirect()->route('tamanhos.index')->with('success', 'Tamanho cadastrado com sucesso.');
    }

    /**
     * Mostrar um tamanho específico (não utilizado, mas incluído).
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Mostrar o formulário para editar um tamanho existente.
     */
    public function edit($id)
    {
        $tamanho = Tamanho::findOrFail($id);
        return view('tamanhos.edit', compact('tamanho'));
    }

    /**
     * Atualizar um tamanho existente.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $tamanho = Tamanho::findOrFail($id);
        $tamanho->update([
            'name' => $request->input('name'),
        ]);

        return redirect()->route('tamanhos.index')->with('success', 'Tamanho atualizado com sucesso.');
    }

    /**
     * Excluir um tamanho.
     */
    public function destroy($id)
    {
        $tamanho = Tamanho::findOrFail($id);
        $tamanho->delete();

        return redirect()->route('tamanhos.index')->with('success', 'Tamanho excluído com sucesso.');
    }
}
