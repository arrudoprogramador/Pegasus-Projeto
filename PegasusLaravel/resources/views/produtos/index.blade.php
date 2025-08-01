<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos Cadastrados</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <header>
        @include('componentes.navbarAdmin')
    </header>

    <h5 style="text-align:center">Produtos Cadastrados</h4>

    <div class="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                <table class="table table-striped table-bordered w-full">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Editar</th>
                            <th>Favoritar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($produtos as $p)
                            <tr>
                            <td>{{ $p->id }}</td>
                            <td>
                                <img src="{{ $p->foto ? asset('img/produtos/' . $p->foto) : asset('img/produtos/default.jpg') }}" alt="Imagem do produto" width="84" height="75" style="border-radius: 15%;">
                            </td>
                           
                            <td>{{ $p->nome }}</td>
                                <td>{{ $p->descricao }}</td>
                                <td>R$ {{ number_format($p->preco, 2, ',', '.') }}</td>
                                <td>
                                    <form action="{{ route('produto.edit', $p->id) }}">
                                        @csrf
                                        <button type="submit" style="background-color:orange">
                                             <i class="fas fa-edit"></i>
                                        </button>
                                    </form>
                                
                                </td>

                                <td>
                                    <!-- Botão favoritar -->
                                    <form action="{{ route('produto.favoritar', $p->id) }}" method="POST" style="display:inline;">
                                        @csrf
                                        <button type="submit" class="btn btn-favoritar"
                                            style="background-color: <?php echo $p->favoritado ? 'gold' : 'gray'; ?>">                                            ★
                                        </button>

                                    </form>
                                </td>
                                <td>
                                    <form action="{{ route('produto.excluir', $p->id) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" style="color:red">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</body>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
        

        // Atualizar a imagem de pré-visualização quando o usuário selecionar uma imagem
        document.getElementById('foto').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const preview = document.getElementById('preview');
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    </script>
</html>