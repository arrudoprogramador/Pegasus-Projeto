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
    <div class="card shadow-sm border-0">
        <div class="card-header bg-primary text-white fw-bold">
            Variações Cadastradas
        </div>

        <div class="card-body table-responsive">
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            <table class="table table-bordered table-hover">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Cor</th>
                        <th>Tamanho</th>
                        <th>Estoque</th>
                        <th>Preço</th>
                        <th>Foto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($variacoes as $v)
                        <tr>
                            <td>{{ $v->id }}</td>
                            <td>{{ $v->produto->nome }}</td>
                            <td>{{ $v->cor->nome }}</td>
                            <td>{{ $v->tamanho->nome }}</td>
                            <td>{{ $v->estoque }}</td>
                            <td>R$ {{ number_format($v->preco, 2, ',', '.') }}</td>
                            <td>
                                @if($v->foto)
                                    <img src="{{ asset('img/variacoes/' . $v->foto) }}" alt="Foto" width="50">
                                @endif
                            </td>
                            <td>
                                <a href="{{ route('variacoes.edit', $v->id) }}" class="btn btn-sm btn-warning">
                                    <i class="bi bi-pencil-fill"></i>
                                </a>

                                <form action="{{ route('variacoes.destroy', $v->id) }}" method="POST" class="d-inline" onsubmit="return confirm('Deseja excluir?')">
                                    @csrf
                                    @method('DELETE')
                                    <button class="btn btn-sm btn-danger">
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>

            <a href="{{ route('variacoes.create') }}" class="btn btn-success mt-3">
                <i class="bi bi-plus-circle-fill"></i> Nova Variação
            </a>
        </div>
    </div>
</div>

