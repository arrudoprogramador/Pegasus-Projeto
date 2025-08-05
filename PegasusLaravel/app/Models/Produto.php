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
        'marca_id',
    ];

    // Produto pertence a uma Marca
    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

    // Produto tem muitas variações
    public function variacoes()
    {
        return $this->hasMany(VariacaoProduto::class);
    }

    // Retorna se o produto está favoritado
    public function getFavoritadoAttribute()
    {
        return DB::table('favoritos')->where('produto_id', $this->id)->exists();
    }
}
