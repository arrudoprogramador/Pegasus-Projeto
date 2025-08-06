<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use Illuminate\Http\Request;

class MarcaController extends Controller
{
    // Exibe a lista de marcas
    public function index()
    {
        $marcas = Marca::all();
        return view('marcas.index', compact('marcas'));
    }

    // Exibe o formulário para criar uma nova marca
    public function create()
    {
        return view('marcas.create');
    }

    // Salva uma nova marca no banco
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:marcas,name',
        ]);

        Marca::create([
            'name' => $request->input('name'),
        ]);

        return redirect()->route('marcas.index')->with('success', 'Marca criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    // Exibe o formulário para editar uma marca existente
    public function edit($id)
    {
        $marca = Marca::findOrFail($id);
        return view('marcas.edit', compact('marca'));
    }

    // Atualiza os dados de uma marca
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:marcas,name,' . $id,
        ]);

        $marca = Marca::findOrFail($id);
        $marca->name = $request->input('name');
        $marca->save();

        return redirect()->route('marcas.index')->with('success', 'Marca atualizada com sucesso!');
    }

    // Remove uma marca do banco
    public function destroy($id)
    {
        $marca = Marca::findOrFail($id);
        $marca->delete();

        return redirect()->route('marcas.index')->with('success', 'Marca excluída com sucesso!');
    }
}
