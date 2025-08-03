<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class VariacaoProduto extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto_id',
        'tamanho_id',
        'cor_id',
        'preco',
        'estoque',
        'sku'
    ];

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }

    public function tamanho()
    {
        return $this->belongsTo(Tamanho::class);
    }

    public function cor()
    {
        return $this->belongsTo(Cor::class);
    }
}
