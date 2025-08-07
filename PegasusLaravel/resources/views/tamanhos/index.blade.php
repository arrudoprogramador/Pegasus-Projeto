<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Tamanhos Cadastrados</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body>

<header>
    @include('componentes.navbarAdmin')
</header>

<div class="container my-5">
    <h3 class="text-center mb-4">Tamanhos Cadastrados</h3>

    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('tamanhos.create') }}" class="btn btn-primary mb-3">
        <i class="fa fa-plus"></i> Novo Tamanho
    </a>

    <div class="overflow-x-auto bg-white p-4 rounded-lg shadow-sm">
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                @forelse($tamanhos as $tamanho)
                    <tr>
                        <td>{{ $tamanho->id }}</td>
                        <td>{{ $tamanho->nome }}</td>
                        <td>
                            <a href="{{ route('tamanhos.edit', $tamanho->id) }}" class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i>
                            </a>
                        </td>
                        <td>
                            <form action="{{ route('tamanhos.destroy', $tamanho->id) }}" method="POST" onsubmit="return confirm('Deseja realmente excluir este tamanho?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="4" class="text-center">Nenhum tamanho cadastrado.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
