<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Editar Cor</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>

<header>
    @include('componentes.navbarAdmin')
</header>

<h5 class="text-center my-4">Editar Cor</h5>

<div class="container">
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $erro)
                    <li>{{ $erro }}</li>
                @endforeach
            </ul>
        </div>
    @endif

<form action="{{ route('cores.update', $cor->id) }}" method="POST" class="mx-auto" style="max-width: 400px;">
    @csrf
    @method('PUT')

    <div class="mb-3">
        <label for="nome" class="form-label">Nome da Cor</label>
        <input type="text" class="form-control" id="nome" name="nome" value="{{ old('nome', $cor->nome) }}" required>
    </div>

    <div class="mb-3">
        <label for="hex_code" class="form-label">Código Hex da Cor</label>
        <input type="color" class="form-control form-control-color" id="hex_code" name="hex_code" value="{{ old('hex_code', $cor->hex_code ?? '#000000') }}" title="Escolha uma cor">
    </div>

    <button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Atualizar</button>
    <a href="{{ route('cores.index') }}" class="btn btn-secondary ms-2">Cancelar</a>
</form>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
