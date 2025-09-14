<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Variação</title>
    
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
            Editar Variação de Produto
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

                <!-- Produto -->
                <div class="mb-3">
                    <label class="form-label">Produto</label>
                    <select name="produto_id" class="form-select" required>
                        @foreach($produtos as $produto)
                            <option value="{{ $produto->id }}" {{ $produto->id == $variacao->produto_id ? 'selected' : '' }}>
                                {{ $produto->nome }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Cor -->
                <div class="mb-3">
                    <label class="form-label">Cor</label>
                    <select name="cor_id" id="cor_id" class="form-select" required>
                        <option value="">Selecione uma cor</option>
                        @foreach($cores as $cor)
                            <option value="{{ $cor->id }}" {{ $cor->id == $variacao->cor_id ? 'selected' : '' }}>
                                {{ $cor->nome }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Tamanho -->
                <div class="mb-3">
                    <label class="form-label">Tamanho</label>
                    <select name="tamanho_id" id="tamanho_id" class="form-select" required>
                        <option value="">Selecione um tamanho</option>
                        @foreach($tamanhos as $tamanho)
                            <option value="{{ $tamanho->id }}" {{ $tamanho->id == $variacao->tamanho_id ? 'selected' : '' }}>
                                {{ $tamanho->nome }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Estoque -->
                <div class="mb-3">
                    <label class="form-label">Estoque</label>
                    <input type="number" name="estoque" class="form-control" value="{{ $variacao->estoque }}" required>
                </div>

                <!-- Preço -->
                <div class="mb-3">
                    <label class="form-label">Preço</label>
                    <input type="number" step="0.01" name="preco" class="form-control" value="{{ $variacao->preco }}" required>
                </div>

                <!-- Foto atual -->
                <div class="mb-3">
                    <label class="form-label">Foto Atual</label><br>
                    @if($variacao->foto)
                        <img src="{{ asset('img/variacoes/' . $variacao->foto) }}" alt="Foto atual" class="img-fluid rounded shadow-sm" style="max-height: 200px;">
                    @else
                        <p class="text-muted">Sem imagem</p>
                    @endif
                </div>

                <!-- Nova Foto + Preview -->
                <div class="mb-3">
                    <label class="form-label">Nova Foto (opcional)</label>
                    <input type="file" name="foto" id="fotoInput" class="form-control" accept="image/*">
                    <div class="mt-3 text-center">
                        <img id="previewImagem" src="#" alt="Pré-visualização" class="img-fluid rounded shadow-sm d-none" style="max-height: 200px;">
                    </div>
                </div>

                <!-- Botão -->
                <div class="text-end">
                    <button type="submit" class="btn btn-warning text-white fw-bold">
                        <i class="bi bi-save"></i> Atualizar
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Preview da Imagem -->
<script>
    document.getElementById("fotoInput").addEventListener("change", function(event) {
        const file = event.target.files[0];
        const preview = document.getElementById("previewImagem");

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.classList.remove("d-none");
            };
            reader.readAsDataURL(file);
        } else {
            preview.src = "#";
            preview.classList.add("d-none");
        }
    });
</script>

</body>
</html>
