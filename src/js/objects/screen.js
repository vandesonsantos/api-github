const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info"> 
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                        <div class="data">
                                            <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
                                            <p>${user.bio ?? "Não possui bio cadastrado 😢"}</p>
                                            <p>👥 ${user.followers} Seguidores</p>
                                            <p>♾️ ${user.following} Seguindo</p>
                                        </div>
                                     </div>` 
    },

    renderRepo(user){                                 
        let repositoriesItens = ""
        user.repositories.forEach(repo => {
            repositoriesItens += `<li>
                                    <a href="${repo.html_url}" target="_blank">${repo.name}
                                        <span>
                                            <p>🔋${repo.forks}</p>
                                            <p>⭐${repo.stargazers_count}</p>
                                            <p>👀${repo.watchers}</p>
                                            <p>💻${repo.language}</p>
                                        </span>
                                    </a>
                                 </li>`
        })
        
        if (user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories  section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
    }, 

    renderEvents(user){    
        let eventsRepositories = ""
        user.events.forEach((event) => {

            if(event.type === "CreatEvent" || event.type === "PushEvent"){
                eventsRepositories += `<li>
                                           <span>${event.repo.name}</span> - ${event.payload.commits[0].message}
                                       </li>`
            } else{
                eventsRepositories += `<li>
                                            <span>${event.repo.name}</span> - Evento do tipo Create!
                                        </li>`
            }
        })
        
        this.userProfile.innerHTML += `<div class="events">
                                            <h2>Events</h2>
                                            <ul>
                                                ${eventsRepositories}
                                            </ul>
                                        </div>`
    },
    
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }