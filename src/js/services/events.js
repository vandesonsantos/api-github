import { baseUrl, repositoriesQuantity } from "/src/js/variables.js"

async function getEvents(userName){
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${repositoriesQuantity}`)
    return await response.json()
}

export { getEvents }