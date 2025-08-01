<?php

namespace App\Http\Controllers;

use App\Models\Favorito;
use Illuminate\Http\Request;

class FavoritoController extends Controller
{
    public function index(){
        $favoritos = Favorito::all();
        return view('favoritos.index', compact('favoritos')); 
    }

    public function indexApi()
    {
        try{
            
            $favoritos = Favorito::all();

            return response()->json([
            'success' => true,
            'mensagem' => 'Lista de produtos carregada com sucesso',
            'data' => $favoritos
        ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'mensagem' => 'Erro ao carregar favoritos',
                'detalhes' => $e->getMessage()
            ], 500);
        }
    }


    public function edit($id){
        if (!$favorito = Favorito::find($id))
            return redirect()->route('favoritos.index');

        return view('favoritos.editFavoritos', compact('favoritos'));
    }


    public function update(){

    }


    public function store(){

    }

    public function destroy($id){

        $favorito = Favorito::find($id);

        if ($favorito) {
            $favorito->delete();

            $favoritos = Favorito::all();
            return view('favoritos.index', compact('favoritos'));        
        }

        return response()->json(['mensagem' => 'Produto não encontrado'], 404);
    
    }

    

}
