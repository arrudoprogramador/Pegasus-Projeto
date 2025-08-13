<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Variação</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/cadastroProdutos.css') }}">
</head>
<body class="bg-light">

    <header>
        @include('componentes.navbarAdmin')
    </header>
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
                                {{ $produto->nome }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Cor</label>
                    <select name="cor_id" id="cor_id" class="form-control" required>
                        <option value="">Selecione uma cor</option>
                        @foreach($cores as $cor)
                            <option value="{{ $cor->id }}" {{ $cor->id == $variacao->cor_id ? 'selected' : '' }}>
                                {{ $cor->nome }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label">Tamanho</label>
                    <select name="tamanho_id" id="tamanho_id" class="form-control" required>
                        <option value="">Selecione um tamanho</option>
                        @foreach($tamanhos as $tamanho)
                            <option value="{{ $tamanho->id }}" {{ $tamanho->id == $variacao->tamanho_id ? 'selected' : '' }}>
                                {{ $tamanho->nome }}
                            </option>
                        @endforeach
                    </select>
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
