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
const nomeUsuario = document.getElementById("inputNome");
validaKeyup(nomeUsuario);
const sobrenomeUsuario = document.getElementById("inputSobrenome");
validaKeyup(sobrenomeUsuario);
const emailUsuario = document.getElementById("inputEmail");
validaKeyup(emailUsuario);
const senhaUsuario = document.getElementById("inputPassword");
validaKeyup(senhaUsuario);
const repeteSenhaUsuario = document.getElementById("inputRepeatPassword");
validaKeyup(repeteSenhaUsuario);


// Iniciamos o processo de lógica para submissão do formulário
form.addEventListener("submit", function (event) {
  event.preventDefault();

// rodamos a validação do campo antes de iniciarmos as promessas e etc...chamando a função de validação feita acima
validaCampo(nomeUsuario);
validaCampo(sobrenomeUsuario);
validaCampo(emailUsuario);
validaCampo(senhaUsuario);
validaCampo(repeteSenhaUsuario);

// para que possamos rodar as promessas adicionamos nas constantes criadas em cima o .value, 
// caso contrário vai puxar apenas o elemento e não o valor do campo
const nome = nomeUsuario.value;
const sobrenome = sobrenomeUsuario.value;
const email = emailUsuario.value;
const password = senhaUsuario.value;
const confirmarSenha = repeteSenhaUsuario.value;

// validamos se a senha e repete senha são iguais
if(password != confirmarSenha){
    alert("A senha deve ser igual ou preenchida");
    }else{

// definimos o bloco de dados que enviaremos via POST no FETCH
const dados = {
        firstName: nome,
        lastName: sobrenome,
        email: email,
        password: password
}

// aqui fazemos a promessa para o signup
const promessa = fetch("https://ctd-todo-api.herokuapp.com/v1/users",{
    method:"POST",
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
});
// o resultado da promessa é convertido em json
promessa.then(function(resposta){
    return resposta.json()
})
// salvamos o JWT no local Storage por ser um dado sensível e redirecionamos o usuario para a pagina de tarefas
.then(function(token){
    if(typeof token === "object"){
        console.log(token)
        alert("usuário cadastrado com sucesso");
            console.log(token)
            localStorage.setItem("jwt", token.jwt);
            window.location.href = "./tarefas.html";
    }else{
        // caso não retorne um objeto, no caso o JWT, avisamos via alerta que o usuario já foi cadastrado
        alert("usuário já cadastrado");
    }
})
.catch(function(erro){

});
    };
});