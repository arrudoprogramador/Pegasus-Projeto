<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class VariacaoProduto extends Model
{
    use SoftDeletes;
    protected $table = 'variacoes_produto';
    protected $fillable = ['produto_id', 'cor_id', 'tamanho_id', 
                            'estoque', 'preco', 'sku', 'ativo', 'foto',];

    public function produto() {
        return $this->belongsTo(Produto::class);
    }

    public function cor() {
        return $this->belongsTo(Cor::class);
    }

    public function tamanho() {
        return $this->belongsTo(Tamanho::class);
    }

    public function imagens() {
        return $this->hasMany(ImagemVariacao::class);
    }

    
    public function destaques()
    {
        return $this->hasMany(Destaque::class, 'variacao_id');
    }

    // Helper para saber se uma variação tem certo destaque
    public function isDestaque($tipo)
    {
        return $this->destaques()->where('tipo', $tipo)->exists();
    }


}
