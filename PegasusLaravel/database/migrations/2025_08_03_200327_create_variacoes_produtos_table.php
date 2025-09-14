<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('variacoes_produto', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produto_id');
            $table->unsignedBigInteger('cor_id');
            $table->unsignedBigInteger('tamanho_id');
            $table->decimal('preco', 8, 2);
            $table->string('sku')->unique()->nullable();
            $table->boolean('ativo')->default(true);
            $table->string('foto')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete('cascade');
            $table->foreign('cor_id')->references('id')->on('cores')->onDelete('restrict');
            $table->foreign('tamanho_id')->references('id')->on('tamanhos')->onDelete('restrict');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variacoes_produtos');
    }
};

