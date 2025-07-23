<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos Cadastrados</title>
</head>
<body>

    <header>
        @include('componentes.navbarAdmin')
    </header>

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
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($produtos as $p)
                            <tr>
                            <td>{{ $p->id }}</td>
                            <td>
                                <img src="{{ $p->foto ? asset('img/produtos/' . $p->foto) : asset('img/produtos/default.jpg') }}" alt="Imagem do produto" width="100" height="100">
                            </td>
                           
                            <td>{{ $p->nome }}</td>
                                <td>{{ $p->descricao }}</td>
                                <td>R$ {{ number_format($p->preco, 2, ',', '.') }}</td>
                                <td>
                                    <form action="{{ route('produto.edit', $p->id) }}">
                                        @csrf
                                        <button type="submit" class="text-yellow-600 hover:text-red-800">Editar</button>
                                    </form>
                                
                                </td>
                                <td>
                                    <form action="{{ route('produto.excluir', $p->id) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-800">Excluir</button>
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