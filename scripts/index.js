const form = document.querySelector("form");

// Essa função limpa o limpaFormulario, retirando a classe adicionada quando dá erro de preenchimento
const limpaFormulario = (item) => {
    if (item.classList.contains("error")){
        item.classList.remove("error");
        item.nextSibling.remove();
    }
}

// Essa função valida o campo: quando vazio ele adiciona uma classe que adicionamos no acesso.css
const validaCampo = (item) =>{
    if(item.value === ""){
        item.classList.add("error");
        item.after(document.createElement('small')
        .innerText = "*Campo Obrigatório");
      } 
};

//Essa função roda a função que limpa o formulario fazendo com que a classe de erro 
// possa sair logo que o usuario preencha o campo obrigatório
const validaKeyup = (item) =>{
    item.addEventListener("keyup", function(event){
        limpaFormulario(item);
    });
}

// na validação precisamos pegar os elementos, portanto criamos essas constantes e em seguida já validamos o campo.
const emailUsuario = document.getElementById("inputEmail");
validaKeyup(emailUsuario);
const senhaUsuario = document.getElementById("inputPassword");
validaKeyup(senhaUsuario);

form.addEventListener("submit", function (event) {
  event.preventDefault();

// rodamos a validação do campo antes de iniciarmos as promessas e etc...chamando a função de validação feita acima
validaCampo(emailUsuario);
validaCampo(senhaUsuario);

// buscando valores dos campos selecionados  
const email = emailUsuario.value
const password = senhaUsuario.value

// criando os dados que serão enviados no body pelo POST no fetch
const dados = {
        firstName: "nome",
        lastName: "sobrenome",
        email: email,
        password: password
}

// criando a promessa
const promessa = fetch("https://ctd-todo-api.herokuapp.com/v1/users/login",{
    method:"POST",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
});

//transformando o resultado da promessa em json
promessa.then(function(resposta){
    return resposta.json()
})
// armazenando o JWT no local storage e redirecionando para pagina de tarefas caso autenticação esteja correta
.then(function(token){
    if(typeof token === "object"){
        console.log(token);
        localStorage.setItem("jwt", token.jwt);
        window.location.href = "./tarefas.html";

    }else{
//alerta de erro na autenticação.
        console.log("deu erro!");
        alert("erro na autenticação");
    }
})
.catch(function(erro){
   console.log(erro);
});

});
