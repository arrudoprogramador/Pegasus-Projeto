<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('destaques', function (Blueprint $table) {
            $table->id();
            $table->foreignId('variacao_id')->constrained('variacoes_produto')->onDelete('cascade');
            $table->string('tipo'); // exemplo: favorito, promocao, lancamento
            $table->timestamps();

            $table->unique(['variacao_id', 'tipo']); // garante que não haja duplicação
        });
    }

    public function down()
    {
        Schema::dropIfExists('destaques');
    }

};
