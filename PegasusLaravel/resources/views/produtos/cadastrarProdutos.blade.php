<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Produtos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/cadastroProdutos.css') }}">
</head>
<body class="bg-light">

    <header>
        @include('componentes.navbarAdmin')
    </header>

    <div class="container py-5">
        <div class="card shadow-sm border-0 mx-auto" style="max-width: 600px;">
            <div class="card-header bg-primary text-white fw-bold">
                Cadastrar Produto
            </div>

            <div class="card-body">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            @foreach ($errors->all() as $erro)
                                <li>{{ $erro }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('produto.cadastro') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label for="nome" class="form-label">Nome do Produto</label>
                        <input type="text" name="nome" id="nome" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="descricao" class="form-label">Descrição</label>
                        <textarea name="descricao" id="descricao" rows="3" class="form-control" required></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="preco" class="form-label">Preço</label>
                        <input type="number" name="preco" id="preco" step="0.01" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="estoque" class="form-label">Estoque</label>
                        <input type="number" name="estoque" id="estoque" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <input type="file" name="foto" id="fotoInput" accept="image/*" required>
                        <img id="preview" class="preview-img" src="#" alt="Pré-visualização" style="display: none;"/>
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

    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        document.getElementById('fotoInput').addEventListener('change', function (event) {
        const preview = document.getElementById('preview');
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        } else {
            preview.style.display = 'none';
        }
        });
  </script>

</body>
</html>
