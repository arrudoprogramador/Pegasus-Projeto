<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Produto extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['nome', 'descricao', 'imagem_capa', 'marca_id', 'ativo'];

    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }

    public function variacoes()
    {
        return $this->hasMany(VariacaoProduto::class);
    }

    public function getFavoritadoAttribute()
    {
        return DB::table('favoritos')->where('produto_id', $this->id)->exists();
    }
}
