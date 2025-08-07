<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel Administrativo</title>
    <link rel="stylesheet" href="{{ asset('css/sidebar.css') }}">

    <!-- Bootstrap e Ícones -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">


</head>
<body>

    <!-- Sidebar -->
    <div class="sidebar" id="sidebar">
        <button class="btn btn-outline-secondary toggle-btn" id="toggleSidebar">
            <i class="bi bi-list"></i>
        </button>

        <ul class="nav flex-column">
            <li class="nav-item">
                <a href="{{ url('/') }}" class="nav-link px-3">
                    <i class="bi bi-house-door-fill text-success"></i>
                    <span>Início</span>
                </a>
            </li>

            <!-- Produtos -->
            <li class="nav-item">
            <a class="nav-link px-3" data-bs-toggle="collapse" data-bs-target="#produtosMenu" role="button" aria-expanded="false" aria-controls="produtosMenu">
                    <i class="bi bi-box-seam text-primary"></i>
                    <span>Produtos</span>
                </a>
                <div class="collapse submenu" id="produtosMenu">
                    <a href="{{ url('/visualizarProdutos') }}" class="nav-link px-4">Ver Produtos</a>
                    <a href="{{ url('/telaCadastroProdutos') }}" class="nav-link px-4">Cadastrar Produto</a>
                </div>
            </li>


            <!-- Marcas -->
            <li class="nav-item">
                <a href="#marcasMenu" class="nav-link px-3" data-bs-toggle="collapse">
                    <i class="bi bi-tags-fill text-danger"></i>
                    <span>Marcas</span>
                </a>
                <div class="collapse submenu" id="marcasMenu">
                    <a href="{{ route('marcas.index') }}" class="nav-link px-4">Ver Marcas</a>
                    <a href="{{ route('marcas.create') }}" class="nav-link px-4">Cadastrar Marca</a>
                </div>
            </li>

            <!-- Cores -->
            <li class="nav-item">
                <a href="#coresMenu" class="nav-link px-3" data-bs-toggle="collapse">
                    <i class="bi bi-palette-fill text-warning"></i>
                    <span>Cores</span>
                </a>
                <div class="collapse submenu" id="coresMenu">
                    <a href="{{ route('cores.index') }}" class="nav-link px-4">Ver Cores</a>
                    <a href="{{ route('cores.create') }}" class="nav-link px-4">Cadastrar Cor</a>
                </div>
            </li>

            <!-- Tamanhos -->
            <li class="nav-item">
                <a href="#tamanhosMenu" class="nav-link px-3" data-bs-toggle="collapse">
                    <i class="bi bi-arrows-angle-expand text-info"></i>
                    <span>Tamanhos</span>
                </a>
                <div class="collapse submenu" id="tamanhosMenu">
                    <a href="{{ route('tamanhos.index') }}" class="nav-link px-4">Ver Tamanhos</a>
                    <a href="{{ route('tamanhos.create') }}" class="nav-link px-4">Cadastrar Tamanho</a>
                </div>
            </li>

            <!-- Variação produtos -->
            <li class="nav-item">
                <a href="#variacaoMenu" class="nav-link px-3" data-bs-toggle="collapse">
                    <!-- <i class=""></i> -->
                    <span>Variações</span>
                </a>
                <div class="collapse submenu" id="variacaoMenu">
                    <a href="{{ route('variacoes.index') }}" class="nav-link px-4">Ver Tamanhos</a>
                    <a href="{{ route('variacoes.create') }}" class="nav-link px-4">Cadastrar Tamanho</a>
                </div>
            </li>

            <!-- Usuários -->
            <li class="nav-item">
                <a href="{{ url('/visualizarUsuarios') }}" class="nav-link px-3">
                    <i class="bi bi-people-fill text-secondary"></i>
                    <span>Usuários</span>
                </a>
            </li>

            <!-- Favoritos -->
            <li class="nav-item">
                <a href="{{ url('/visualizarFavoritos') }}" class="nav-link px-3">
                    <i class="bi bi-star-fill text-warning"></i>
                    <span>Favoritos</span>
                </a>
            </li>

            <!-- Sair -->
            <li class="nav-item">
                <a href="#" onclick="alert('Saindo...')" class="nav-link px-3">
                    <i class="bi bi-box-arrow-right text-danger"></i>
                    <span>Sair</span>
                </a>
            </li>
        </ul>
    </div>

    <!-- Conteúdo Principal -->
    <div class="main-content" id="mainContent">
        @yield('content')
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const toggleBtn = document.getElementById('toggleSidebar');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('expanded');
            mainContent.classList.toggle('expanded');
        });
    </script>

</body>
</html>