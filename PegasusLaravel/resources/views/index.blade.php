<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Pegasus</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body class="bg-light">

    {{-- Navbar --}}
    <header>
        @include('componentes.navbarAdmin')
    </header>

    <main class="container mt-4">
        <h1 class="mb-4 text-center fw-bold text-primary">Dashboard Pegasus</h1>

        {{-- Cards principais --}}
        <div class="row g-4 mb-5">
            <div class="col-md-3">
                <div class="card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title">Card 1</h5>
                        <p class="card-text">Conteúdo do card 1</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title">Card 2</h5>
                        <p class="card-text">Conteúdo do card 2</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title">Card 3</h5>
                        <p class="card-text">Conteúdo do card 3</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow-sm border-0">
                    <div class="card-body text-center">
                        <h5 class="card-title">Card 4</h5>
                        <p class="card-text">Conteúdo do card 4</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white">Gráfico 1</div>
                    <div class="card-body">
                        <div class="text-muted text-center">[Gráfico estático 1]</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-success text-white">Gráfico 2</div>
                    <div class="card-body">
                        <div class="text-muted text-center">[Gráfico estático 2]</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-warning text-dark">Gráfico 3</div>
                    <div class="card-body">
                        <div class="text-muted text-center">[Gráfico estático 3]</div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-danger text-white">Gráfico 4</div>
                    <div class="card-body">
                        <div class="text-muted text-center">[Gráfico estático 4]</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
