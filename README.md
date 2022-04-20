#  Projeto To Do - Checkpoint II

# 📌 Introdução
 Projeto To-Do-List foi desenvolvido para tarefas do dia a dia permitindo criar listas com vários afazeres e oferece alguns recursos de organização. 
 Feito com interfaces simples para que o usuário consiga ter o maximo de aproveitamento possivel e rápido acesso.
 
 * Estrutura do projeto: Nosso projeto é baseado em HTML, sem utilização de modulos ou bundlers.
 
 # 📝 MVP Checklist:

- Login (index.html)

  - [x] Campos devem ser obrigatórios
  - [x] Obter os dados preenchidos e realizar a chamada (fetch) de login
  - [x] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [x] Em caso de sucesso: Redirecionar para tarefas.html
  - [x] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Signup (signup.html)

  - [x] Campos devem ser obrigatórios
  - [x] Necessário validar igualdade dos campos senha e confirmar senha
  - [x] Obter os dados preenchidos e realizar a chamada (fetch) de cadastro
  - [x] Em caso de sucesso: Salvar o JWT em local ou session storage
  - [x] Em caso de sucesso: Redirecionar para tarefas.html
  - [x] Em caso de erro: Informar (ex. com alert) o usuário que ocorreu um erro

- Tarefas (tarefas.html)

  - [x] Header: Obter dados do usuário para apresentar seu nome completo
  - [x] Header: Botão Finalizar Sessão remove o JWT do storage e redireciona para index.html (quando for clicado)
  - [x] Ao carregar a página, buscar as tarefas (get para /tasks) e exibir na lista
  - [x] Form Nova Tarefa: Ao enviar uma nova tarefa, deve realizar um post para API (/tasks)
  - [x] Quando uma tarefa for adicionada, a lista de tarefas deve ser atualizada
  - [ ] Quando uma tarefa for completada, deve realizar um put para API (tasks/ID_DA_TASK) alterando a chave completed para true
---
# 🛠️ Ferramentas
![html](https://user-images.githubusercontent.com/61170238/164286081-7664fe9e-269b-46bd-adba-48fddd715335.png)
![css-3](https://user-images.githubusercontent.com/61170238/164286273-2aa27bb0-b33d-4054-91dd-a5e66aa41c95.png)
![js](https://user-images.githubusercontent.com/61170238/164286283-f1038fb4-4813-4733-bc13-8defbbfc39c3.png)

 🗂️ Pastas:

* assets: Contem os arquivos do projeto como imagens, fontes e vetores.
* scripts: Contem os arquivos javascript do projeto. Separados por tela.
---

# 🚩 Melhorias
 *Identificar campos inválidos com CSS (ex. borda vermelha)
 *Redirecionar o usuário para a página de tarefas (quando com sessão ativa na máquina)
 *Limitar a quantiade de caracteres nas entradas do usuário
 *Separar funções utilizados com frequência para que possam ser reutilizadas.
 
 # Colaboradores 
 * 🧔 Bruno Rodrigues 
 * 🧑‍🦰Igor Coelho
 * 👩‍🦰Thalita Machado

