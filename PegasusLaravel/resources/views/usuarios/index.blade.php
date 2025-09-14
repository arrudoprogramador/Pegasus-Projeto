<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Usuários Cadastrados</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

  <style>
      body {
          background: #f8f9fa;
          font-family: "Segoe UI", Roboto, sans-serif;
      }

      h5 {
          margin: 20px 0;
          font-weight: 600;
          color: #343a40;
      }

      .table-container {
          max-width: 1000px;
          margin: 0 auto;
          background: #ffffff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0px 6px 18px rgba(0,0,0,0.08);
      }

      table thead {
          background: linear-gradient(135deg, #0d6efd, #0b5ed7);
          color: #fff;
      }

      table thead th {
          padding: 15px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
      }

      table tbody tr {
          transition: background 0.2s ease;
      }

      table tbody tr:hover {
          background-color: #f1f5ff;
      }

      table tbody td {
          padding: 12px;
          vertical-align: middle;
      }

      .btn-delete {
          border: none;
          background: none;
          color: #dc3545;
          font-size: 1.2rem;
          transition: color 0.2s ease;
      }

      .btn-delete:hover {
          color: #a71d2a;
      }
  </style>
</head>
<body>

<header>
  @include('componentes.navbarAdmin')
</header>

<h5 class="text-center">Usuários Cadastrados</h5>

<div class="table-container">
  <div class="table-responsive">
      <table class="table align-middle text-center">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
              </tr>
          </thead>
          <tbody>
              @foreach($usuarios as $u)
                  <tr>
                      <td>{{ $u->id }}</td>
                      <td>{{ $u->nome }}</td>
                      <td>{{ $u->email }}</td>
                      <td>
                          <form action="{{ route('usuario.excluir', $u->id) }}" method="POST" class="d-inline">
                              @csrf
                              @method('DELETE')
                              <button type="submit" class="btn-delete" title="Excluir usuário">
                                  <i class="fas fa-trash"></i>
                              </button>
                          </form>
                      </td>
                  </tr>
              @endforeach
          </tbody>
      </table>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
