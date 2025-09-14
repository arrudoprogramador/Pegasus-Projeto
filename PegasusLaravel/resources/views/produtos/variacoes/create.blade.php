<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Variação</title>
    
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
        }
        .card {
            border-radius: 12px;
        }
        .card-header {
            border-radius: 12px 12px 0 0;
        }
        .form-label {
            font-weight: 600;
        }
        table {
            margin-top: 15px;
        }
        table thead {
            background-color: #0d6efd;
            color: #fff;
        }
        table tbody tr:hover {
            background-color: #f1f5ff;
        }
    </style>
</head>
<body>

    <header>
        @include('componentes.navbarAdmin')
    </header>

    <div class="container py-5">
        <div class="card shadow-sm border-0 mx-auto" style="max-width: 700px;">
            <div class="card-header bg-primary text-white fw-bold">
                <i class="bi bi-plus-circle"></i> Cadastrar Variação de Produto
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
                        <select name="produto_id" id="produto_id" class="form-select" required>
                            <option value="">Selecione um produto</option>
                            @foreach($produtos as $produto)
                                <option value="{{ $produto->id }}">{{ $produto->nome }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="tamanho_id" class="form-label">Tamanho</label>
                            <select name="tamanho_id" id="tamanho_id" class="form-select" required>
                                <option value="">Selecione um tamanho</option>
                                @foreach($tamanhos as $tamanho)
                                    <option value="{{ $tamanho->id }}">{{ $tamanho->nome }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="cor_id" class="form-label">Cor</label>
                            <select name="cor_id" id="cor_id" class="form-select" required>
                                <option value="">Selecione uma cor</option>
                                @foreach($cores as $cor)
                                    <option value="{{ $cor->id }}">{{ $cor->nome }}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>

                    <!-- Representação da combinação -->
                    <h6 class="mt-4 fw-bold">Resumo da Variação</h6>
                    <div class="table-responsive">
                        <table class="table table-bordered align-middle text-center">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Cor</th>
                                    <th>Tamanho</th>
                                    <th>Estoque</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span id="previewProduto">-</span></td>
                                    <td><span id="previewCor">-</span></td>
                                    <td><span id="previewTamanho">-</span></td>
                                    <td>
                                        <input type="number" name="quantidade" min="0" class="form-control form-control-sm w-75 mx-auto" placeholder="Qtd">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Preço</label>
                        <input type="number" step="0.01" name="preco" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Foto</label>
                        <input type="file" name="foto" id="fotoInput" class="form-control" accept="image/*" required>
                        <div class="mt-3 text-center">
                            <img id="previewImagem" src="#" alt="Pré-visualização" class="img-fluid rounded shadow-sm d-none" style="max-height: 140px;">
                        </div>
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

    <!-- Script para preview dinâmico -->
    <script>
        const produtoSelect = document.getElementById('produto_id');
        const corSelect = document.getElementById('cor_id');
        const tamanhoSelect = document.getElementById('tamanho_id');

        produtoSelect.addEventListener('change', () => {
            document.getElementById('previewProduto').textContent = produtoSelect.options[produtoSelect.selectedIndex].text;
        });

        corSelect.addEventListener('change', () => {
            document.getElementById('previewCor').textContent = corSelect.options[corSelect.selectedIndex].text;
        });

        tamanhoSelect.addEventListener('change', () => {
            document.getElementById('previewTamanho').textContent = tamanhoSelect.options[tamanhoSelect.selectedIndex].text;
        });
    </script>

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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
