<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estoque extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto_id',
        'cor_id',
        'tamanho_id',
        'quantidade',
    ];

    public function variacao()
    {
        return $this->belongsTo(VariacaoProduto::class);
    }


}
