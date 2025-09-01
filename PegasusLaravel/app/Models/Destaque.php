<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destaque extends Model
{
    protected $fillable = ['variacao_id', 'tipo'];

    public function variacao()
    {
        return $this->belongsTo(VariacaoProduto::class, 'variacao_id');
    }
}
