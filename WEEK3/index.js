document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('MYFORM');
    var openFormButton = document.getElementById('Openform');
    var closeFormButton = document.getElementById('closeForm');

    openFormButton.addEventListener('click', function() {
        form.style.display = 'block';
        openFormButton.style.display = 'none'; // Hide the "Contact Us Now" button
    });

    closeFormButton.addEventListener('click', function() {
        form.style.display = 'none';
        openFormButton.style.display = 'block'; // Show the button when the form is closed
    });

    window.addEventListener('click', function(event) {
        if (event.target === form) {
            form.style.display = 'none';
        }
    });

    document.getElementById('registration-Form').addEventListener('submit', function(event) {
        event.preventDefault();
        validateUsername();
        validateEmail();
        validatePassword();
        validateConfirmPassword();
    });

    document.getElementById('username').addEventListener('blur', validateUsername);
    document.getElementById('email').addEventListener('blur', validateEmail);
    document.getElementById('password').addEventListener('blur', validatePassword);
    document.getElementById('confirmPassword').addEventListener('blur', validateConfirmPassword);

    function validateUsername() {
        var username = document.getElementById('username').value.trim();
        var errorElement = document.getElementById('usernameError');
        var usernameInput = document.getElementById('username');

        if (username === '') {
            errorElement.textContent = 'Username cannot be empty';
            usernameInput.classList.add('error');
        } else {
            errorElement.textContent = '';
            usernameInput.classList.remove('error');
            usernameInput.classList.add('success');
        }
    }

    function validateEmail() {
        var email = document.getElementById('email').value.trim();
        var errorElement = document.getElementById('emailError');
        var emailInput = document.getElementById('email');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            errorElement.textContent = 'Email cannot be empty';
            emailInput.classList.add('error');
        } else if (!emailRegex.test(email)) {
            errorElement.textContent = 'Invalid email format';
            emailInput.classList.add('error');
        } else {
            errorElement.textContent = '';
            emailInput.classList.remove('error');
            emailInput.classList.add('success');
        }
    }

    function validatePassword() {
        var password = document.getElementById('password').value;
        var errorElement = document.getElementById('passwordError');
        var passwordInput = document.getElementById('password');

        if (password.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters long';
            passwordInput.classList.add('error');
        } else {
            errorElement.textContent = '';
            passwordInput.classList.remove('error');
            passwordInput.classList.add('success');
        }
    }

    function validateConfirmPassword() {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var errorElement = document.getElementById('confirmPasswordError');
        var confirmPasswordInput = document.getElementById('confirmPassword');

        if (confirmPassword !== password) {
            errorElement.textContent = 'Passwords do not match';
            confirmPasswordInput.classList.add('error');
        } else {
            errorElement.textContent = '';
            confirmPasswordInput.classList.remove('error');
            confirmPasswordInput.classList.add('success');
        }
    }
});