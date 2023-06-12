import { user } from "/src/js/services/user.js"
import { repositories } from "/src/js/services/repositories.js"

//? FUNÇÃO PARA UM EVENTO DE CLICK PEGANDO O VALOR DIGITADO EM UM INPUT
const botaoEnviar = document.getElementById("btn-search")
botaoEnviar.addEventListener("click", () => {
    const userName = document.getElementById("input-search").value
    getUserProfile(userName)
})

//? FUNÇÃO PARA UM EVENTO PRESIONANDO A TECLA ENTER, EVENTO DE (KEYUP)
document.getElementById("input-search").addEventListener("keyup", (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        getUserProfile(userName)
    }
})

//? FUNÇÃO PARA ADICIONAR ELEMENTOS DENTRO DE UMA DIV(FOTO, PARÁGRAFO E TEXTO) ADICIONANDO O HTML PELO JAVASCRIPT
function getUserProfile(userName){
    user(userName).then((userData)  => {
        let userIform = `<div class="info"> 
                            <img src="${userData.avatar_url}" alt="Foto do perfil do usuário"/>
                            <div class="data">
                                <h1>${userData.name ?? "Não possui nome cadastrado 😢"}</h1>
                                <p>${userData.bio ?? "Não possui bio cadastrado 😢"}</p>
                            </div>
                        </div>`  

        let divAparecer = document.querySelector(".profile-data")
        divAparecer.innerHTML = userIform

        getUserRepositories(userName)
    })
}

function getUserRepositories(userName){
    repositories(userName).then((reposData) => {
        let repositoriesItens = ""
        reposData.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
        })
        
        document.querySelector(".profile-data").innerHTML += `<div class="repositories section">
                                                                    <h2>Repositórios</h2>
                                                                    <ul>${repositoriesItens}</ul>
                                                              </div>`
    })
}
