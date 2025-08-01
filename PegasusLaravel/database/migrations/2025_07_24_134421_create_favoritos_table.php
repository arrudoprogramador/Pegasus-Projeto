<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('favoritos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('produto_id'); 
            $table->string('nome');
            $table->text('descricao')->nullable();
            $table->decimal('preco', 8, 2);
            $table->integer('estoque')->default(0);
            $table->string('foto')->nullable();
            $table->timestamps();

            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favoritos');
    }
};
