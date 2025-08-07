<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cores Cadastradas</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>

<header>
    @include('componentes.navbarAdmin')
</header>

<h5 class="text-center my-4">Cores Cadastradas</h5>

<div class="container">
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <a href="{{ route('cores.create') }}" class="btn btn-primary mb-3">
        <i class="fa fa-plus"></i> Nova Cor
    </a>

    <div class="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table class="table table-striped table-bordered w-100">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            <tbody>
                @forelse($cores as $cor)
                    <tr>
                        <td>{{ $cor->id }}</td>
                        <td>{{ $cor->nome }}</td>
                        <td>
                            <a href="{{ route('cores.edit', $cor->id) }}" class="btn btn-warning btn-sm">
                                <i class="fas fa-edit"></i>
                            </a>
                        </td>
                        <td>
                            <form action="{{ route('cores.destroy', $cor->id) }}" method="POST" onsubmit="return confirm('Deseja realmente excluir esta cor?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="4" class="text-center">Nenhuma cor cadastrada.</td></tr>
                @endforelse
            </tbody>
            
        </table>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
