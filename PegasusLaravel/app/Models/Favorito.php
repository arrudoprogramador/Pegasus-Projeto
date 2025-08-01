<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorito extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto_id',
        'nome',
        'descricao',
        'preco',
        'estoque',
        'foto',
    ];
}
