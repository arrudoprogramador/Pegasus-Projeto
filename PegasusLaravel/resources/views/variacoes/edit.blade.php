@extends('layouts.app')

@section('content')
<div class="container py-5">
    <div class="card shadow-sm border-0 mx-auto" style="max-width: 600px;">
        <div class="card-header bg-warning text-white fw-bold">
            Editar Variação
        </div>

        <div class="card-body">
            @if($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach($errors->all() as $erro)
                            <li>{{ $erro }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('variacoes.update', $variacao->id) }}" method="POST" enctype="multipart/form-data">
                @csrf
                @method('PUT')

                <div class="mb-3">
                    <label class="form-label">Produto</label>
                    <select name="produto_id" class="form-control" required>
                        @foreach($produtos as $produto)
                            <option value="{{ $produto->id }}" {{ $produto->id == $variacao->produto_id ? 'selected' : '' }}>
                                {{ $produto->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Cor</label>
                    <input type="text" name="cor" class="form-control" value="{{ $variacao->cor }}">
                </div>

                <div class="mb-3">
                    <label class="form-label">Tamanho</label>
                    <input type="text" name="tamanho" class="form-control" value="{{ $variacao->tamanho }}">
                </div>

                <div class="mb-3">
                    <label class="form-label">Estoque</label>
                    <input type="number" name="estoque" class="form-control" value="{{ $variacao->estoque }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Preço</label>
                    <input type="number" step="0.01" name="preco" class="form-control" value="{{ $variacao->preco }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label">Foto Atual</label><br>
                    @if($variacao->foto)
                        <img src="{{ asset('img/variacoes/' . $variacao->foto) }}" width="100">
                    @else
                        <p>Sem imagem</p>
                    @endif
                </div>

                <div class="mb-3">
                    <label class="form-label">Nova Foto (opcional)</label>
                    <input type="file" name="foto" class="form-control">
                </div>

                <div class="text-end">
                    <button type="submit" class="btn btn-warning">
                        <i class="bi bi-save"></i> Atualizar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
