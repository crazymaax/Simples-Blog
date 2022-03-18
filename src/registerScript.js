import { User } from "./models/User.js";

const register = document.querySelector(".registerForm")
register.addEventListener("submit", User.register)
