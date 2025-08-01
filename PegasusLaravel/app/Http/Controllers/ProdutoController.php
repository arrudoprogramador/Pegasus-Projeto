<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    public function index()
    {
        $produtos = Produto::all();
        return view('produtos.index', compact('produtos'));      
    }

    public function indexApi()
    {
        try{
            $produtos = Produto::all();

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


   public function store(Request $request)
{
    $request->validate([
        'nome' => 'required|string|max:255',
        'marca' => 'required|string|max:255', 
        'descricao' => 'required|string',
        'preco' => 'required|numeric|min:0',
        'estoque' => 'required|integer|min:0',
        'foto' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $produto = new Produto();
    $produto->nome = $request->input('nome');
    $produto->marca = $request->input('marca'); 
    $produto->descricao = $request->input('descricao');
    $produto->preco = $request->input('preco');
    $produto->estoque = $request->input('estoque');

    // Verificar se a imagem foi enviada e mover para o diretório desejado
        if ($request->hasFile('foto')) {
            // Obtém o arquivo da requisição
            $file = $request->file('foto');
    
            // Verificar se o arquivo é uma imagem válida (opcional, mas recomendado)
            if ($file->isValid() && in_array($file->getClientOriginalExtension(), ['jpg', 'jpeg', 'png', 'gif'])) {
                
                // Define o diretório desejado
                $directory = public_path('img/produtos');
                
                // Cria o diretório caso não exista
                if (!file_exists($directory)) {
                    mkdir($directory, 0777, true); // Cria o diretório com permissão 777
                }
    
                // Define o nome do arquivo (usando o timestamp para evitar conflitos de nomes)
                $fileName = time() . '.' . $file->getClientOriginalExtension();
    
                // Move o arquivo para o diretório 'public/img/produtos'
                $file->move($directory, $fileName);
    
                // Salva o nome do arquivo (não a URL) no banco de dados
                $produto->foto = $fileName;
            } else {
                // Caso o arquivo não seja válido, você pode adicionar uma mensagem de erro ou tratar o caso.
                return redirect()->back()->withErrors('Arquivo inválido. Envie uma imagem válida (jpg, jpeg, png, gif).')->withInput();
            }
        }
        $produto->save();

        return redirect()->route('produtos.index')->with('success', 'Produto cadastrado com sucesso!');

    }

    public function edit($id)
    {
        if (!$produto = Produto::find($id))
            return redirect()->route('produtos.index');

        return view('produtos.editProdutos', compact('produto'));

    }

    public function update(Request $request, $id)
    {
        $request->validate([
    'nome' => 'required|string|max:255',
    'marca' => 'required|string|max:255',
    'descricao' => 'required|string',
    'preco' => 'required|numeric|min:0',
    'estoque' => 'required|integer|min:0',  
    'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

        $produto = Produto::findOrFail($id);

        $produto->nome = $request->input('nome');
        $produto->marca = $request->input('marca'); 
        $produto->descricao = $request->input('descricao');
        $produto->preco = $request->input('preco');
        $produto->estoque = $request->input('estoque');

        // Verificar se a imagem foi enviada e mover para o diretório desejado
        if ($request->hasFile('foto')) {
            // Obtém o arquivo da requisição
            $file = $request->file('foto');
    
            // Verificar se o arquivo é uma imagem válida (opcional, mas recomendado)
            if ($file->isValid() && in_array($file->getClientOriginalExtension(), ['jpg', 'jpeg', 'png', 'gif'])) {
                
                // Define o diretório desejado
                $directory = public_path('img/produtos');
                
                // Cria o diretório caso não exista
                if (!file_exists($directory)) {
                    mkdir($directory, 0777, true); // Cria o diretório com permissão 777
                }
    
                // Define o nome do arquivo (usando o timestamp para evitar conflitos de nomes)
                $fileName = time() . '.' . $file->getClientOriginalExtension();
    
                // Move o arquivo para o diretório 'public/img/produtos'
                $file->move($directory, $fileName);
    
                // Salva o nome do arquivo (não a URL) no banco de dados
                $produto->foto = $fileName;
            } else {
                // Caso o arquivo não seja válido, você pode adicionar uma mensagem de erro ou tratar o caso.
                return redirect()->back()->withErrors('Arquivo inválido. Envie uma imagem válida (jpg, jpeg, png, gif).')->withInput();
            }
        }

        $produto->save();

        return redirect()->route('produtos.index')->with('success', 'Produto atualizado com sucesso!');
    }


    public function destroy($id)
    {
        $produto = Produto::find($id);

        if ($produto) {
            $produto->delete();

            $produtos = Produto::all();
            return view('produtos.index', compact('produtos'));        
        }

        return response()->json(['mensagem' => 'Produto não encontrado'], 404);
    }

}
