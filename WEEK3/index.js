function validateEmail(email) {
    /* the expression makes it so that we define a set of charecters before the @ sign
    then define a set of accepted Charecters again then after the  .  there's  another set however
    the values have been limited between 2 and 4*/
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // tests the input follows the expression and return true or false
    return emailRegex.test(email);
}



// When the username field is not in focus it checks its validity
username.addEventListener("blur", function () {

    const username = document.getElementById("username");
    const username_div = document.getElementById("username_div");
    // if the username field is empty then display error message and make the border red.

    if (username.value.trim() === "") {
        username_div.className="input-control error"
        usernameError.textContent = "Username is required";
    } 
    // Else make the border green
    else {
        username_div.className="input-control success"
        usernameError.textContent = "";
    }
});

email.addEventListener("blur", function () {

    const email = document.getElementById("email");
    const email_div = document.getElementById("email_div");
    // if the email field is empty then display error message and make the border red.
    if (email.value.trim() === "") {
        email_div.className="input-control error"
        emailError.textContent = "Email is required";
    }
    // if the email value isnt valid then display error message and make the border red.
    else if (validateEmail(email.value.trim()) == false){
        email_div.className="input-control error"
        emailError.textContent = "Enter Valid Email";
    }
    // Else make the border green
    else {
        email_div.className="input-control success"
        emailError.textContent = "";
    }
});

password.addEventListener("blur", function () {
    const password = document.getElementById("password");
    const password_div = document.getElementById("password_div");

    // if the password field is empty then display error message and make the border red.

    if (password.value.trim() === "") {
        password_div.className="input-control error"
        passwordError.textContent = "Password is required";
    }
    // if the password length isnt 8 or above then display error message and make the border red.
    else if (password.value.trim().length <= 7 ){
        password_div.className="input-control error"
        passwordError.textContent = "Password is too short";
    } 
    // Else make the border green
    else {
        password_div.className="input-control success"
        passwordError.textContent = "";
    }
});

password2.addEventListener("blur", function () {
    const password2 = document.getElementById("password2");
    const password2_div = document.getElementById("password2_div");

    // if the password2 field is empty then display error message and make the border red.
    if (password2.value.trim() === "") {
        password2_div.className="input-control error"
        password2Error.textContent = "Password is required";
    }
    // if the passswords dont match then display error message and make the border red
    else if(password.value.trim() !== password2.value.trim()){
        password2_div.className="input-control error"
        password2Error.textContent = "Password's dont match";
    }
    // Else make the border green
    else {
        password2_div.className="input-control success"
        password2Error.textContent = "";
    }
});


form.addEventListener("submit", function (e) {
    e.preventDefault();

    // if all fields are valid then alert form submitted
     if (password2_div.className === "input-control success" && password_div.className === "input-control success" && email_div.className === "input-control success" && username_div.className==="input-control success" ){
        alert("Form submitted successfully");
     } 

     // Else must be an error and alert to tell them to fix it
     else{
        alert("Make sure there are no errors")
     }
});