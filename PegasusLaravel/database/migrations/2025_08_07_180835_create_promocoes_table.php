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
        Schema::create('promocoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('variacao_produto_id');
            $table->decimal('preco_promocional', 8, 2);
            $table->date('inicio');
            $table->date('fim')->nullable();
            $table->timestamps();

            $table->foreign('variacao_produto_id')->references('id')->on('variacoes_produto')->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promocoes');
    }
};
