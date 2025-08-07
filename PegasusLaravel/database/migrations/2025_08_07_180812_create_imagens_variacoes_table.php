<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imagens_variacoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('variacao_produto_id');
            $table->string('caminho_imagem');
            $table->boolean('principal')->default(false);
            $table->timestamps();

            $table->foreign('variacao_produto_id')->references('id')->on('variacoes_produto')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imagens_variacoes');
    }
};
