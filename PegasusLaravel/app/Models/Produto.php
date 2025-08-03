<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'descricao',
        'preco',
        'estoque',
        'foto',
        'marca_id',
    ];

    // Relacionamento: Produto pertence a uma Marca
    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

    // Relacionamento: Produto tem muitas Variações
    public function variacoes()
    {
        return $this->hasMany(VariacaoProduto::class);
    }

    // Indica se está favoritado (do jeito que você já tinha)
    public function getFavoritadoAttribute()
    {
        return DB::table('favoritos')->where('produto_id', $this->id)->exists();
    }
}
