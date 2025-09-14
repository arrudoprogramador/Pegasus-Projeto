<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cor;

class CorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cores = Cor::orderBy('nome', 'asc')->get();;
        return view('cores.index', compact('cores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('cores.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255'
        ]);

        Cor::create([
            'nome' => $request->input('nome'),
        ]);

        return redirect()->route('cores.index')->with('success', 'Cor criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $cor = Cor::findOrFail($id);
        return view('cores.edit',compact('cor'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        $cor = Cor::findOrFail($id);
        $cor->nome = $request->input('nome');
        $cor->save();

        return redirect()->route('cores.index')->with('sucesso, cor atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $cor = Cor::findOrFail($id);
        $cor->delete();

        return redirect()->route('cores.index')->with('sucesso', 'Cor excluída com sucesso!');
    }
}
