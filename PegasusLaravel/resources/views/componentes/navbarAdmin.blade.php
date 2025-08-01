<!-- Navbar do admin -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand fw-bold text-primary" href="#">Pegasus</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarConteudo" aria-controls="navbarConteudo"
                aria-expanded="false" aria-label="Alternar navegação">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarConteudo">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="{{ url('/')}}" onclick="ativarLink(this)">
                        <i class="bi bi-house-door-fill text-success"></i> Início
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/visualizarProdutos')}}" onclick="ativarLink(this)">
                        <i class="bi bi-box-seam text-primary"></i> Ver Produtos
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/telaCadastroProdutos')}}" onclick="ativarLink(this)">
                        <i class="bi bi-box-seam text-primary"></i> Cadastrar Produtos
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/visualizarUsuarios')}}" onclick="ativarLink(this)">
                        <i class="bi bi-people-fill text-success"></i> Ver Usuários
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/visualizarFavoritos')}}" onclick="ativarLink(this)">
                        <i class="bi bi-star-fill text-warning"></i> Ver Favoritos
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/CadastrarFavoritos')}}" onclick="ativarLink(this)">
                        <i class="bi bi-star-fill text-warning"></i> Cadastrar Favoritos
                    </a>
                </li>
            </ul>

            <span class="navbar-text">
                <button class="btn btn-outline-primary btn-sm" onclick="alert('Saindo...')">
                    Sair
                </button>
            </span>
        </div>
    </div>
</nav>

<script>
    function ativarLink(elemento) {
        // Remove 'active' de todos os links
        const links = document.querySelectorAll('.navbar-nav .nav-link');
        links.forEach(link => link.classList.remove('active'));

        // Adiciona 'active' ao link clicado
        elemento.classList.add('active');
    }
</script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

