<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tamanho extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function variacoes()
    {
        return $this->hasMany(VariacaoProduto::class);
    }
}

