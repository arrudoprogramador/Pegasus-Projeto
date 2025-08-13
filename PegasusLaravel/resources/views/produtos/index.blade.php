<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos Cadastrados</title>
    
    {{-- Bootstrap CSS --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    {{-- Font Awesome --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <style>
        body {
            background-color: #f5f7fa;
        }
        .table thead th {
            background-color: #0d6efd;
            color: white;
            text-align: center;
        }
        .table tbody tr {
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
        }
        .table tbody tr:hover {
            background-color: #f0f8ff;
        }
        .btn-action {
            border: none;
            padding: 8px 12px;
            border-radius: 5px;
            transition: background-color 0.2s;
        }
        .btn-edit {
            background-color: #ffc107;
            color: white;
        }
        .btn-edit:hover {
            background-color: #e0a800;
        }
        .btn-delete {
            background-color: #dc3545;
            color: white;
        }
        .btn-delete:hover {
            background-color: #b02a37;
        }
        .btn-fav {
            color: white;
        }
        .gold {
            color: gold;
            /* ou background-color: gold; dependendo do que você quer */
        }

        .gray {
            color: gray;
            /* ou background-color: gray; */
        }
    </style>
</head>
<body>

<header>
    @include('componentes.navbarAdmin')
</header>

<main class="container my-4">
    <h3 class="text-center mb-4">📦 Produtos Cadastrados</h3>

    <div class="table-responsive bg-white p-4 rounded shadow">
        <table class="table table-striped align-middle text-center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Editar</th>
                    <th>Favoritar</th>
                    <th>Excluir</th>
                </tr>
            </thead>
            
            <tbody>
                @forelse($produtos as $p)
                <tr class="linha-click" data-href="{{ route('variacoes.index', $p->id) }}">
                    <td>{{ $loop->iteration }}</td> <!-- Número sequencial do produto -->
                    <td>{{ optional($p->marca)->nome ?? '—' }}</td>
                    <td>{{ $p->nome }}</td>
                    <td>{{ $p->descricao }}</td>

                    {{-- Botão Editar --}}
                    <td onclick="event.stopPropagation();">
                        <form action="{{ route('produto.edit', $p->id) }}" method="GET">
                            @csrf
                            <button type="submit" class="btn-action btn-edit" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                        </form>
                    </td>

                    {{-- Botão Favoritar --}}
                    <td onclick="event.stopPropagation();">
                        <form action="{{ route('produto.favoritar', $p->id) }}" method="POST">
                            @csrf
                            <button type="submit" 
                                    class="btn-action btn-fav {{ $p->favoritado ? 'gold' : 'gray' }}" 
                                    title="{{ $p->favoritado ? 'Desfavoritar' : 'Favoritar' }}">
                                ★
                            </button>
                        </form>
                    </td>

                    {{-- Botão Excluir --}}
                    <td onclick="event.stopPropagation();">
                        <form action="{{ route('produto.excluir', $p->id) }}" method="POST" onsubmit="return confirm('Tem certeza que deseja excluir este produto?');">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn-action btn-delete" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
                @empty
                <tr>
                    <td colspan="7" class="text-center text-muted">Nenhum produto cadastrado.</td>
                </tr>
                @endforelse
                </tbody>

        </table>
    </div>
</main>

{{-- Bootstrap JS --}}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.linha-click').forEach(linha => {
        linha.addEventListener('click', (e) => {
            if (!e.target.closest('form') && !e.target.closest('button')) {
                const url = linha.dataset.href;
                if (url) window.location.href = url;
            }
        });
    });
});
</script>

</body>
</html>
