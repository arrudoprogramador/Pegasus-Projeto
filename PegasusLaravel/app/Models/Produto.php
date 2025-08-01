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
    ];

    public function getFavoritadoAttribute()
    {
        return DB::table('favoritos')->where('produto_id', $this->id)->exists();
    }


}
