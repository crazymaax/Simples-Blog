import { User } from "./models/User.js";
import { Post } from "./models/Post.js";

const login = document.querySelector(".loginForm")
const loginButton = document.querySelector(".loginForm__loginButton")

login.addEventListener("submit", User.login)


/*  user: miawDino
    email: miawDino1@mail.com
    avatarurl: https://razoesparaacreditar.com/wp-content/uploads/2021/02/gatos-dinossauros-1.jpg
    password: miawDino! 
    
    Hoje é um incrível dia para aterrorizar com o meu charme! miaaarrw~

    !

    user: audioCao
    email: caoaudioaudiocao@mail.com
    avatarurl: https://love.doghero.com.br/wp-content/uploads/2019/09/Golden.jpg.jpg
    password: caocao1010
    
    Ja ouviram uma musiquinha hoje???? Eu vou de Beat It - Michael Jackson

    !

    user: ararinhasz
    email: ararasapaixonadas@mail.com
    avatarurl: https://i.pinimg.com/originals/dd/3a/36/dd3a36883862fcf44de345b5477d54ac.jpg
    password: araras1# 
    
    Oii, somos novos neste blog! Somos as araras apaixonadas. Somos a Ararinha e o Araroa, é um prazer! Sei que estamos quase em extinção, por favor, cuide da natureza, é o nosso lar 
    */