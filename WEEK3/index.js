document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('MYFORM');
    var button = document.getElementById('Openform');
    var sp = document.getElementsByClassName('close')[0];
    
    button.onclick = function() {
        form.style.display = 'block';
    }
    
    sp.onclick = function() {
        form.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == form) {
            form.style.display = 'none';
        }
    }
    
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
        if (username === '') {
            errorElement.textContent = 'Username cannot be empty';
            document.getElementById('username').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('username').classList.remove('error');
            document.getElementById('username').classList.add('success');
        }
    }
    
    function validateEmail() {
        var email = document.getElementById('email').value.trim();
        var errorElement = document.getElementById('emailError');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errorElement.textContent = 'Email cannot be empty';
            document.getElementById('email').classList.add('error');
        } else if (!emailRegex.test(email)) {
            errorElement.textContent = 'Invalid email format';
            document.getElementById('email').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('email').classList.remove('error');
            document.getElementById('email').classList.add('success');
        }
    }
    
    function validatePassword() {
        var password = document.getElementById('password').value;
        var errorElement = document.getElementById('passwordError');
        if (password.length < 8) {
            errorElement.textContent = 'Password must be at least 8 characters long';
            document.getElementById('password').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('password').classList.remove('error');
            document.getElementById('password').classList.add('success');
        }
    }
    
    function validateConfirmPassword() {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var errorElement = document.getElementById('confirmPasswordError');
        if (confirmPassword !== password) {
            errorElement.textContent = 'Passwords do not match';
            document.getElementById('confirmPassword').classList.add('error');
        } else {
            errorElement.textContent = '';
            document.getElementById('confirmPassword').classList.remove('error');
            document.getElementById('confirmPassword').classList.add('success');
        }
    }
});