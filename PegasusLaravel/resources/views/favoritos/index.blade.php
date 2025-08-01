<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favoritos Cadastrados</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <header>
        @include('componentes.navbarAdmin')
    </header>

    <h5 style="text-align:center">Favoritos Cadastrados</h4>

    <div class="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                <table class="table table-striped table-bordered w-full">
                    <thead>
                        <tr>
                            
                            <th>Imagem</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Desfavoritar</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($favoritos as $f)
                            <tr>
                            <td>
                                <img src="{{ $f->foto ? asset('img/produtos/' . $f->foto) : asset('img/produtos/default.jpg') }}" alt="Imagem do favorito" width="84" height="75" style="border-radius: 15%;">
                            </td>
                           
                            <td>{{ $f->nome }}</td>
                                <td>{{ $f->descricao }}</td>
                                <td>R$ {{ number_format($f->preco, 2, ',', '.') }}</td>
                                
                                <td>
                                    <form action="{{ route('favorito.excluir', $f->id) }}" method="POST">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" style="color:red;">
                                            ★
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