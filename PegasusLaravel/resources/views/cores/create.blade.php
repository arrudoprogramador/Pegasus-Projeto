<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Adicionar Nova Cor</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body class="bg-light">

<header>
    @include('componentes.navbarAdmin')
</header>

<div class="container py-5">
    <div class="card shadow-sm border-0 mx-auto" style="max-width: 600px;">
        <div class="card-header bg-primary text-white fw-bold">
            Adicionar Nova Cor
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

            <form action="{{ route('cores.store') }}" method="POST" class="mx-auto" style="max-width: 100%;">
                @csrf

                <div class="mb-3">
                    <label for="name" class="form-label">Nome da Cor</label>
                    <input type="text" class="form-control" id="name" name="name" value="{{ old('name') }}" required>
                </div>

                <div class="mb-3">
                    <label for="hex_code" class="form-label">Código da Cor</label>
                    <input type="color" class="form-control form-control-color" id="hex_code" name="hex_code" value="{{ old('hex_code', '#000000') }}" title="Escolha uma cor">
                </div>

                <div class="text-end">
                    <button type="submit" class="btn btn-success">
                        <i class="fa fa-save"></i> Salvar
                    </button>
                    <a href="{{ route('cores.index') }}" class="btn btn-secondary ms-2">Cancelar</a>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
