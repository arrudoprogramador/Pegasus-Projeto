<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cor extends Model
{
    use HasFactory;
    
    protected $table = 'cores'; 
    protected $fillable = ['nome'];

    public function variacoes()
    {
        return $this->hasMany(VariacaoProduto::class);
    }
}
