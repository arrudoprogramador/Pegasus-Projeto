<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cor extends Model
{
    use HasFactory;
    
    protected $table = 'colors'; // nome da tabela em inglês
    protected $fillable = ['name', 'hex_code'];

    public function variacoes()
    {
        return $this->hasMany(VariacaoProduto::class);
    }
}
