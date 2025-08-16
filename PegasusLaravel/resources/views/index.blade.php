<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Pegasus</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css">
    <link rel="stylesheet" href="{{ asset('/css/index.css') }}">
</head>
<body class="bg-light">

    {{-- Sidebar --}}
    <header>
        @include('componentes.navbarAdmin')
    </header>

    <!-- Conteúdo Principal -->
    <main>
        <header class="dashboard-header">
            <h1>Dashboard - Admin</h1>
            <p>Bem-vindo à central de informações do Pegasus</p>
        </header>

        <section class="dashboard-stats">
            <!-- Cartões de Estatísticas - IDs adicionados para fácil atualização -->
            <div class="stat-card">
                <i class="fas fa-users"></i>
                <div>
                    <h2 id="total-users">1,245</h2>
                    <p>Usuários Cadastrados</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-shop"></i>
                <div>
                    <h2 id="total-medicines">328</h2>
                    <p>Vendas</p>
                </div>
            </div>
            <div class="stat-card">
                <i class="fas fa-first"></i>
                <div>
                    <h2 id="total-pharmacies">Calça</h2>
                    <p>Produto mais vendido</p>
                </div>
            </div>
        </section>

        <section class="dashboard-table-and-chart">
            <div class="stat-card2">
                <div id="age-chart" style="width: 800px;height:500px;"></div>
            </div>

            <div class="stat-card2">
                <div id="medicine-categories" style="width: 800px;height:500px;"></div>
            </div>
        </section>
    </main>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Script dos Gráficos Estáticos (Prontos para BD) -->
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        // =============================================
        // DADOS ESTÁTICOS - SUBSTITUIR POR CHAMADA API FUTURAMENTE
        // =============================================
        const staticData = {
            totals: {
                users: 1245,
                medicines: 328,
                pharmacies: 42
            },
            ageGroups: {
                "Janeiro": 20150,
                "Fev": 16320,
                "Mar": 14450,
                "Abr": 8210,
                "Maio": 9295,
                "Junho": 12120
            },
            medicineCategories: [
                { value: 1048, name: 'Calça' },
                { value: 735, name: 'Camisa' },
                { value: 580, name: 'Short' },
                { value: 484, name: 'Tenis' },
                { value: 300, name: 'Blusa  ' }
            ]
        };
        
        // =============================================
        // FUNÇÕES PARA ATUALIZAR OS GRÁFICOS
        // (MESMAS FUNÇÕES SERÃO USADAS COM DADOS DO BD)
        // =============================================
        
        // Atualiza os cards de estatísticas
        function updateStatsCards(data) {
            document.getElementById('total-users').textContent = data.totals.users.toLocaleString();
            document.getElementById('total-medicines').textContent = data.totals.medicines.toLocaleString();
            document.getElementById('total-pharmacies').textContent = data.totals.pharmacies.toLocaleString();
        }
        
        // Cria gráfico de vendas mensais
        function renderAgeChart(data) {
            const chart = echarts.init(document.getElementById('age-chart'));
            const ageGroups = ["Janeiro", "Fev", "Mar", "Abr", "Maio", "Junho"];
            const values = ageGroups.map(group => data.ageGroups[group]);
            
            const option = {
                title: { text: 'Vendas Mensais', left: 'center' },
                tooltip: { trigger: 'axis' },
                xAxis: { type: 'category', data: ageGroups },
                yAxis: { type: 'value' },
                series: [{
                    data: values,
                    type: 'bar',
                    itemStyle: { color: '#5470C6' }
                }]
            };
            
            chart.setOption(option);
        }
        
        // Cria gráfico de produtos por categoria
        function renderMedicineCategories(data) {
            const chart = echarts.init(document.getElementById('medicine-categories'));
            
            const option = {
                title: { 
                    text: 'Produtos por Categoria',
                    subtext: 'Dados de estoque',
                    left: 'center'
                },
                tooltip: { trigger: 'item' },
                legend: { orient: 'vertical', right: 10, top: 'center' },
                series: [{
                    name: 'Produtos',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    data: data.medicineCategories,
                    emphasis: { itemStyle: { shadowBlur: 10 } },
                    label: { show: true, formatter: '{b}: {c} ({d}%)' }
                }]
            };
            
            chart.setOption(option);
        }
        
        // =============================================
        // INICIALIZAÇÃO (SUBSTITUIR POR CHAMADA API FUTURAMENTE)
        // =============================================
        updateStatsCards(staticData);
        renderAgeChart(staticData);
        renderMedicineCategories(staticData);
        
        // Exemplo de como será a chamada futura ao BD:
        /*
        fetch('/api/dashboard-data')
            .then(response => response.json())
            .then(data => {
                updateStatsCards(data);
                renderAgeChart(data);
                renderMedicineCategories(data);
            });
        */
    });
    </script>
</body>
</html>