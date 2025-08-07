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
            <div class="card-header bg-primary text-white fw-bold">
                Cadastrar Variação de Produto
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

                <form action="{{ route('variacoes.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label for="produto_id" class="form-label">Produto</label>
                        <select name="produto_id" class="form-control" required>
                            <option value="">Selecione um produto</option>
                            @foreach($produtos as $produto)
                                <option value="{{ $produto->id }}">{{ $produto->nome }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="tamanho_id" class="form-label">Tamanho</label>
                        <select name="tamanho_id" id="tamanho_id" class="form-control" required>
                            <option value="">Selecione um tamanho</option>
                            @foreach($tamanhos as $tamanho)
                                <option value="{{ $tamanho->id }}">{{ $tamanho->nome }}</option>
                            @endforeach
                        </select>
                    </div>


                    <div class="mb-3">
                        <label for="cor_id" class="form-label">Cor</label>
                        <select name="cor_id" id="cor_id" class="form-control" required>
                            <option value="">Selecione uma cor</option>
                            @foreach($cores as $cor)
                                <option value="{{ $cor->id }}">{{ $cor->nome }}</option>
                            @endforeach
                        </select>
                    </div>



                    <div class="mb-3">
                        <label class="form-label">Estoque</label>
                        <input type="number" name="estoque" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Preço</label>
                        <input type="number" step="0.01" name="preco" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Foto</label>
                        <input type="file" name="foto" class="form-control" required>
                    </div>

                    <div class="text-end">
                        <button type="submit" class="btn btn-success">
                            <i class="bi bi-check-circle"></i> Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>


</body>
</html>
