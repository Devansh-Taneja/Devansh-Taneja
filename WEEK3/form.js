document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registration-form");
    const formContainer = document.getElementById("form");
    const openButton = document.getElementById("Openform");

    openButton.addEventListener("click", function () {
        formContainer.style.display = "block";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submission for now

        const inputs = ["username", "email", "password", "confirm-password"];

        inputs.forEach((inputId) => {
            const input = document.getElementById(inputId);
            const error = document.getElementById(`${inputId}-error`);
            const value = input.value.trim();

            if (value === "") {
                input.classList.add("error");
                error.textContent = `${inputId.replace('-', ' ').toUpperCase()} cannot be empty`;
            } else {
                input.classList.remove("error");
                error.textContent = "";
            }
        });

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            document.getElementById("confirm-password").classList.add("error");
            document.getElementById("confirm-password-error").textContent = "Passwords do not match";
        }

        if (form.querySelectorAll(".error").length === 0) {
            alert("Registration successful!");
            form.reset();
            formContainer.style.display = "none";
        }
    }); 
});