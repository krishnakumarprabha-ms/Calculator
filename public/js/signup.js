let userName = document.querySelector("#signupName");
let email = document.querySelector("#signupEmail");
let password = document.querySelector("#signupPassword");
let confirmPassword = document.querySelector("#signupConfirmPassword");
let existingUser = document.querySelector("existingUser");
let signUpBtn = document.querySelector("signUpBtn");

signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (userName.value && email.value && password.value && confirmPassword.value) {
        if (password.value === confirmPassword.value) {
            let response = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: userName.value,
                    mail: email.value,
                    pass: password.value
                })
            });
            let data = await response.json();
            if (data.message == "User already Exists") {
                existingUser.innerHTML = data.message + " ";
                
            }
        }
    }
})