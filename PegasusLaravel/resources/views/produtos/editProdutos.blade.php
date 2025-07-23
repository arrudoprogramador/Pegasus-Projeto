<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Produto</title>
    <link rel="stylesheet" href="{{url('/css/editarProduto.css')}}">
</head>
<body>

    <header>
        @include('componentes.navbarAdmin')
    </header>

    <div class="container">
        <h2>Editar Produto</h2>

        <form action="{{ route('produto.update', $produto->id) }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <label for="nome">Nome</label>
            <input type="text" id="nome" name="nome" value="{{ old('nome', $produto->nome) }}" required>

            <label for="descricao">Descrição</label>
            <textarea id="descricao" name="descricao" rows="4" required>{{ old('descricao', $produto->descricao) }}</textarea>

            <label for="preco">Preço</label>
            <input type="text" id="preco" name="preco" value="{{ old('preco', $produto->preco) }}" required>

            <label for="estoque">Estoque</label>
            <input type="number" id="estoque" name="estoque" value="{{ old('estoque', $produto->estoque) }}" required>

            <label for="foto">Nova Foto</label>
            <input type="file" id="foto" name="foto" accept="image/*">

            <div class="img-preview">
                <p>Foto atual:</p>
                    <img id="preview" src="{{ $produto->foto ? asset('img/produtos/' . $produto->foto) : asset('img/produtos/default.jpg') }}" alt="Imagem do produto" width="100" height="100">
            </div>

            <button type="submit">Salvar Alterações</button>
        </form>
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
