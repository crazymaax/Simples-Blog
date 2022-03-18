export class User {

    static url = "https://api-blog-m2.herokuapp.com/user"

    static userPostNumber = 0

    static userData() {
        const colectInfo = window.localStorage.getItem("userData")
        return JSON.parse(colectInfo)
    }

    static loginData() {
        const colectInfo = window.localStorage.getItem("loginData")
        return JSON.parse(colectInfo)
    }

    static async register(e) {
        e.preventDefault()

        const inputs = e.target

        const newUser = {}

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].name) {

                const name = inputs[i].name
                const value = inputs[i].value

                newUser[name] = value
            }

            inputs[i].value = ""
        }

        const response = await fetch(User.url + "/register", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(newUser)
        })

        await response.json()

        if (response.status === 400) {

            const form = document.querySelector(".registerForm");
            if (form.childElementCount === 6) {

                const message = document.createElement("p")
                message.classList.add("form_message")
                message.innerText = "Usuário ou email ja cadastrados, ou username maior que 12 caracteres."
                
                form.appendChild(message)
            }

        } else {

            const form = document.querySelector(".registerForm");
            const message = document.createElement("p")
            message.classList.add("form_message")
            message.innerText = "Cadastrado com sucesso!"

            form.appendChild(message)

            setTimeout(() => {
                window.location = "../../index.html"
            }, 3000);

        }
    }

    static async login(e) {
        e.preventDefault()

        const inputs = e.target
        const loginData = {}

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].name) {

                const name = inputs[i].name
                const value = inputs[i].value

                loginData[name] = value
            }

            inputs[i].value = ""
        }

        const response = await fetch(User.url + "/login", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(loginData
                /* {
                    "email": "miawDino1@mail.com",
                    "password": "miawDino!"
                } */
            )
        })

        const data = await response.json()
        if (response.status === 200) {

            const loginDataJSON = JSON.stringify(data)

            window.localStorage.setItem("loginData", loginDataJSON)

            const userData = await User.colectInfo()

            const userDataJSON = JSON.stringify(userData)

            window.localStorage.setItem("userData", userDataJSON)

            window.location = "../../posts.html"

        } else {

            const form = document.querySelector(".loginForm"); 
            if (form.childElementCount === 4) {

                const message = document.createElement("p")
                message.classList.add("form_message")
                message.innerText = "Por favor, verifique se o email e a senha estão corretos"
    
                form.appendChild(message)
            }
        }


    }

    static async colectInfo() {

        const colectInfo = window.localStorage.getItem("loginData")
        const newData = JSON.parse(colectInfo)

        const { userId, token } = newData

        const response = await fetch(`${User.url}/${userId}`, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        const responseData = await response.json()

        return responseData

    }

    static async logout() {

        window.localStorage.removeItem("userData")
        window.localStorage.removeItem("loginData")

        window.location = "../../index.html"
    }

    /* static toRegisterPage() {
        const body = document.querySelector(".blogBody");
        body.innerHTML = `
        <header>
            <h1>Cadastro</h1>
        </header>

        <main>

        <form action="" class="registerForm">
            <label for="username">
                <input type="text" name="username" placeholder="Nome de usuário" class="form__username">
            </label>

            <label for="email">
                <input type="email" name="email" placeholder="Email" class="form__email">
            </label>

            <label for="image">
                <input type="text" name="avatarUrl" placeholder="Foto de perfil(url)" class="form__image">
            </label>

            <label for="password">
                <input type="password" name="password" placeholder="Senha" class="form__password">
            </label>

            <button class="form_registerButton">Cadastrar</button>

        </form>

        <a href="./index.html">Voltar</a>
        </main>
        `

        const register = document.querySelector(".registerForm")
        register.addEventListener("submit", User.register)
    } */

    /* static toPostPage() {
        const body = document.querySelector(".blogBody");

        const { infos: { avatarUrl, createdAt, email, id, username } } = User.infoUser

        console.log(avatarUrl)
        console.log(createdAt)
        console.log(email)
        console.log(id)
        console.log(username)

        body.innerHTML = `
        <header class="blogHeader">
            <figure>
                <img src="${avatarUrl}" alt="Sua foto de Perfil">
                <figcaption>Sua foto de perfil</figcaption>
            </figure>
            <h3>${username}</h3>
            <button class="logoutButton">Logout</button>
        </header>

        <div class="createAPost">
            <form action="#">
                <textarea name="post" cols="30" rows="10" placeholder="Comece seu post incrível!"></textarea>
                <button class="postButton">+</button>
            </form>
        </div>

        <div class="posts">
        </div>
        `


        const logout = document.querySelector(".logoutButton")
        logout.addEventListener("click", User.logout)

        const postPost = document.querySelector(".postButton")
        postPost.addEventListener("click", (e) => {
            e.preventDefault()
            const text = e.target.parentNode[0].value

            const ApiValue = { content: text }

            Post.createPost(ApiValue)
        })

    } */


}
