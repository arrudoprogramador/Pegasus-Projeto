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
        Schema::create('variacoes_produtos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produto_id')->constrained('produtos')->onDelete('cascade');
            $table->foreignId('tamanho_id')->constrained('tamanhos')->onDelete('cascade');
            $table->foreignId('cor_id')->constrained('colors')->onDelete('cascade');
            $table->decimal('preco',8,2)->nullable();
            $table->integer('estoque')->default(0);
            $table->string('sku')->nullable();
            $table->timestamps();

            $table->unique(['produto_id', 'tamanho_id', 'cor_id']);
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
