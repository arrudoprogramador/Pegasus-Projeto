<?php

namespace App\Http\Controllers;

use App\Models\Destaque;
use App\Models\VariacaoProduto;
use Illuminate\Http\Request;

class DestaqueController extends Controller
{
    public function toggle($variacaoId, $tipo)
    {
        try {
            $variacao = VariacaoProduto::findOrFail($variacaoId);

            $destaque = Destaque::where('variacao_id', $variacao->id)
                                ->where('tipo', $tipo)
                                ->first();

            if ($destaque) {
                $destaque->delete();
                return back()->with('info', ucfirst($tipo).' removido da variação!');
            } else {
                Destaque::create([
                    'variacao_id' => $variacao->id,
                    'tipo' => $tipo,
                ]);
                return back()->with('success', ucfirst($tipo).' adicionado à variação!');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Erro: ' . $e->getMessage());
        }
    }
}
