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
    .catch(erro => alert("Falha ao buscar usuario!"));
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
            authorization: localStorage.jwt
        },
        body: JSON.stringify(tarefa)
        }).then(response => alert("Tarefa Criada!"))
        .then(response => location.reload(true))
        .catch(erro => alert("Falha ao enviar tarefa!"));
    
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
            document.querySelector(".tarefas-terminadas").innerHTML = "";

            tarefas.forEach(function (tarefa) {

                if (tarefa.completed == false ){const li = document.createElement("li");
                const div = document.createElement("div");
                const div2 = document.createElement("div");
                const nomeP = document.createTextNode(tarefa.description);
                const nome = document.createElement("p");
                const timeStampP = document.createTextNode(tarefa.createdAt);
                const criacao = document.createElement("p");
                const deletar = document.createElement("button");
                const imgDelete = document.createElement("img");
                
                li.classList.add("tarefa");
                div.classList.add("not-done");
                div2.classList.add("descricao");
                nome.classList.add("nome");
                criacao.classList.add("timestamp");
                imgDelete.setAttribute("src","./assets/delete.png");
                imgDelete.setAttribute("alt", "Deletar tarefa permanentemente.")

                div.setAttribute("id", tarefa.id);

                document.querySelector("#pendentes").appendChild(li);
                li.appendChild(div);
                li.appendChild(div2);
                div2.appendChild(nome);
                div2.appendChild(criacao);
                nome.appendChild(nomeP);
                criacao.appendChild(timeStampP);
                div2.appendChild(deletar);
                deletar.appendChild(imgDelete);

                imgDelete.onclick = function () {
                    alert(`Excluir permanentemente a tarefa incompleta ${tarefa.id}?`);
    
                    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        authorization: localStorage.jwt
                    },
                    }).then(response => response.json())
                    .then(response => location.reload(true))
                    .catch(erro => alert(erro))
                    };

                div.onclick = function () {
                    alert(`Finalizar tarefa ${tarefa.id}?`);
    
                    const tarefaCompletar = {
                        "completed": true
                    };
    
                    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                        authorization: localStorage.jwt
                    },
                    body: JSON.stringify(tarefaCompletar)
                    }).then(response => response.json())
                    .then(response => location.reload(true))
                    .catch(erro => alert(erro))
                    };

                }else {

                const li = document.createElement("li");
                const div = document.createElement("div");
                const div2 = document.createElement("div");
                const nomeP = document.createTextNode(tarefa.description);
                const nome = document.createElement("p");
                const timeStampP = document.createTextNode(tarefa.createdAt);
                const criacao = document.createElement("p");
                const deletar = document.createElement("button");
                const imgDelete = document.createElement("img");
                
                li.classList.add("tarefa");
                div.classList.add("done");
                div2.classList.add("descricao");
                nome.classList.add("nome");
                criacao.classList.add("timestamp");
                deletar.setAttribute("type", "delete");
                imgDelete.setAttribute("src","./assets/delete.png");
                imgDelete.setAttribute("alt", "Deletar tarefa permanentemente.")

                div.setAttribute("id", tarefa.id);

                document.querySelector(".tarefas-terminadas").appendChild(li);
                li.appendChild(div);
                li.appendChild(div2);
                div2.appendChild(deletar);
                deletar.appendChild(imgDelete);
                div2.appendChild(nome);
                div2.appendChild(criacao);
                nome.appendChild(nomeP);
                criacao.appendChild(timeStampP);

                imgDelete.onclick = function () {
                    alert(`Excluir permanentemente a tarefa ${tarefa.id}?`);
    
                    fetch(`https://ctd-todo-api.herokuapp.com/v1/tasks/${tarefa.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        authorization: localStorage.jwt
                    },
                    }).then(response => response.json())
                    .then(response => location.reload(true))
                    .catch(erro => alert(erro))
                    };

                }
            })
        }}).catch(erro => alert(erro));
};


obterTarefas(localStorage.jwt);
obterUsuario(localStorage.jwt);