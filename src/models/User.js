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
                window.location = "../../Simples-Blog/index.html" /* /Simples-Blog/ adicionado para evitar bugs no github */
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
            "body": JSON.stringify(loginData)
        })

        const data = await response.json()
        if (response.status === 200) {

            const loginDataJSON = JSON.stringify(data)

            window.localStorage.setItem("loginData", loginDataJSON)

            const userData = await User.colectInfo()

            const userDataJSON = JSON.stringify(userData)

            window.localStorage.setItem("userData", userDataJSON)

            window.location = "../../Simples-Blog/posts.html" /* /Simples-Blog/ adicionado para evitar bugs no github */

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

        window.location = "../../Simples-Blog/index.html" /* /Simples-Blog/ adicionado para evitar bugs no github */
    }

}
