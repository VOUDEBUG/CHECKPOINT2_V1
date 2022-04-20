const logout = document.querySelector("#closeApp");
const enviarTarefa = document.querySelector("#enviarTarefa");


logout.addEventListener("click", function () {
    delete window.localStorage.jwt;
    window.location.href = "./index.html";
});


function obterUsuario(token){
    
    fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: token
        }
    }).then(response => response.json())
    .then(response => document.querySelector(".user-name").innerHTML = `${response.firstName} ${response.lastName}`)
}

enviarTarefa.addEventListener("click", function(event){

    event.preventDefault();

    const descricao = document.getElementById("novaTarefa");
    let tarefa = {
        "description": descricao.value,
        "completed": false
    };

    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            authorization: window.localStorage.jwt
        },
        body: JSON.stringify(tarefa)
        }).then(obterTarefas(localStorage.jwt))
        .catch(erro => alert(erro));
    
});

function obterTarefas(token){
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            authorization: token
        }
        }
    ).then(response => response.json())
    .then((tarefas) => {
        if (tarefas.length === 0) {
          document.querySelector(
            ".tarefas-pendentes"
          ).innerHTML = `<li>Nenhuma tarefa para exibir aqui :(</li>`;
        } else {
            document.querySelector("#pendentes").innerHTML = "";
            tarefas.forEach(function (tarefa) {
                const li = document.createElement("li");
                const div = document.createElement("div");
                const div2 = document.createElement("div");
                const nomeP = document.createTextNode(tarefa.description);
                const nome = document.createElement("p");
                const timeStampP = document.createTextNode(tarefa.createdAt);
                const criacao = document.createElement("p");
                          

                li.classList.add("tarefa");
                div.classList.add("not-done");
                div2.classList.add("descricao");
                nome.classList.add("nome");
                criacao.classList.add("timestamp");

                document.querySelector("#pendentes").appendChild(li);
                li.appendChild(div);
                li.appendChild(div2);
                div2.appendChild(nome);
                div2.appendChild(criacao);
                nome.appendChild(nomeP);
                criacao.appendChild(timeStampP);


          li.onclick = function () {
            alert(`clicou em: ${tarefa.description}`);
            document.querySelector(".tarefas-terminadas").appendChild(li);
           
          };

        

          });
        }
      })
    .catch(erro => alert(erro));
};


obterTarefas(localStorage.jwt);
obterUsuario(localStorage.jwt);