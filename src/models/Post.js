import { User } from "./User.js";

export class Post {

    static url = "https://api-blog-m2.herokuapp.com/post"

    static postIDToEdit = ""

    static postPage() {
        
        const body = document.querySelector(".blogPostsBody");
        
        const { avatarUrl, username } = User.userData()

        body.innerHTML = `
        <header class="blogHeader">
            <div class="blogHeader__user">
                <figure>
                    <img class="blogHeader__image" src="${avatarUrl}" alt="Sua foto de Perfil">
                    <figcaption>Sua foto de perfil</figcaption>
                </figure>
                <h3 class="blogHeader__username">${username}</h3>
            </div>
            <button class="logoutButton">Logout</button>
        </header>

        <div class="createAPost">
            <form action="#" class="createAPost__form">
                <textarea name="post" cols="30" rows="10" class="createAPost__textField" placeholder="Comece seu post incrível!"></textarea>
                <button class="postButton">+</button>
            </form>
        </div>

        <div class="posts">

        </div>
        `

        const logoutButton = document.querySelector(".logoutButton")
        logoutButton.addEventListener("click", User.logout)

        const postPost = document.querySelector(".postButton")
        postPost.addEventListener("click", (e) => {
            e.preventDefault()
            const text = e.target.parentNode[0].value

            const ApiValue = { content: text }

            Post.createPost(ApiValue)
        })
    }

    static async createPost(content) {

        localStorage.getItem("loginData")

        const {token} = User.loginData()

        const response = await fetch(Post.url, {
            "method": "POST",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            "body":JSON.stringify(content)
        })

        const data = await response.json()

        this.PostTemplate(data)

    }

    static PostTemplate(data){

        const { id, post, createdAt, owner:{avatarUrl, username,}  } = data

        const year = createdAt.slice(0, 4)
        const month = createdAt.slice(6, 7)
        const day = createdAt.slice(8, 10)
        const formattedDate = day + "/" + month + "/" + year

        const postsDiv = document.querySelector(".posts")
        
        const newPost = document.createElement("div")
        newPost.classList.add("posts__posts")

        newPost.innerHTML = `
            <div class="postImage">
                <figure>
                    <img class="other__postImage" src="${avatarUrl}" alt="Foto de ${username}">
                    <figcaption>Foto de ${username}</figcaption>
                </figure>
            </div>

            <div class="other__mainPost">
                <h3 class="other__username">${username}</h3>
                <p id="${id}">${post}</p>
            </div>
            <div class="other__postConfig other__postConfig--user">
                <span class="editButton">Editar</span>
                <span class="deleteButton">Apagar</span>
                <span>${formattedDate}</span>
            </div>
        `

        postsDiv.appendChild(newPost)

        const editButton = document.querySelector(".editButton")
        editButton.addEventListener("click", Post.editTextArea)
        
        const deleteButton = document.querySelector(".deleteButton")
        deleteButton.addEventListener("click", Post.deletePost)

    }

    static async showPosts() {

        /* NESTE EXEMPLO, COMO É UMA API DE TREINAMENTO, HOUVE MUITOS COMENTARIOS IGUAIS E DE TESTES, PORTANTO SELECIONEI ALGUNS LEGAIS */

        const {token} = User.loginData()

        const response1 = await fetch(Post.url + "/3073f210-b798-4373-9566-89aad265bbd5", {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`,
            },
        })

        const post1 = await response1.json()

        const response2 = await fetch(Post.url + "/0dac9ec9-9307-4ee7-a90a-99a3f15ef691", {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`,
            },
        })

        const post2 = await response2.json()

        const response3 = await fetch(Post.url + "/e9b815bb-6650-4a33-b1d3-3b50dd7556cf", {
            "method": "GET",
            "headers": {
                "Authorization": `Bearer ${token}`,
            },
        })

        const post3 = await response3.json()

        this.PostOthersTemplate(post1, post2, post3)
    }

    static PostOthersTemplate(post1, post2, post3) {

        const posts = [post1, post2, post3]

        posts.forEach((otherPost) => {

            const {createdAt, owner:{username, avatarUrl}, post} = otherPost

            const year = createdAt.slice(0, 4)
            const month = createdAt.slice(6, 7)
            const day = createdAt.slice(8, 10)
            const formattedDate = day + "/" + month + "/" + year
    
            const postsDiv = document.querySelector(".posts")
    
            const newPost = document.createElement("div")
            newPost.classList.add("posts__posts")
            newPost.innerHTML = `
                <div class="other__imagePost">
                    <figure>
                        <img class="other__postImage" src="${avatarUrl}" alt="Foto de ${username}">
                        <figcaption>Foto de ${username}</figcaption>
                    </figure>
                </div>
    
                <div class="other__mainPost">
                    <h3 class="other__username">${username}</h3>
                    <p>${post}</p>
                </div>

                <div class="other__postConfig">
                    <span>${formattedDate}</span>
                </div>
            `

            postsDiv.appendChild(newPost)
        })
    }

    static editTextArea(e) {
        const text = e.target.parentNode.parentNode.children[1].children[1]
        const textContainer = e.target.parentNode.parentNode.children[1]
        
        Post.postIDToEdit =  text.id

        const newTextArea = document.createElement("textarea")
        newTextArea.classList.add("other__newTextArea")
        text.replaceWith(newTextArea)
        newTextArea.innerText = text.textContent

        const completeEdit = document.createElement("button")
        completeEdit.innerText = "Salvar Edição";
        completeEdit.classList.add("other__editTextButton")
        completeEdit.addEventListener("click", Post.editButton)

        textContainer.appendChild(completeEdit)
    }
    
    static async editButton(e) {
        const textArea = e.target.parentNode.children[1]
        const text = e.target.parentNode.children[1].value
        const button = e.target

        const newContent = {}
        newContent["newContent"] = text

        const {token } = User.loginData()
        
        const response = await fetch(Post.url + "/" + Post.postIDToEdit,  {
            "method": "PATCH",
            "headers": {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            "body":JSON.stringify(newContent)
        })

        const data = await response.json()
        
        const newText = document.createElement("p")
        newText.innerText = text
        textArea.replaceWith(newText)
        
        const {updatedAt} = data

        const year = updatedAt.slice(0, 4)
        const month = updatedAt.slice(6, 7)
        const day = updatedAt.slice(8, 10)
        const formattedDate = day + "/" + month + "/" + year

        const lastDate = e.target.parentNode.parentNode.children[2].children[2]
        lastDate.innerText = formattedDate
        button.remove()
    }
    
    static async deletePost(e) {
        const post = e.target.parentNode.parentNode
        const idToDelete = e.target.parentNode.parentNode.children[1].children[1].id
        
        const {token } = User.loginData()

        await fetch(Post.url + "/" + idToDelete,  {
            "method": "DELETE",
            "headers": {
                "Authorization": `Bearer ${token}`,
            }
        })
        
        post.remove()
    }
}