// Initialize users from localStorage or set to an empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// Signup Form
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let email = document.getElementById('signup-email').value;
            let password = document.getElementById('signup-password').value;

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (password.length < 5) {
                alert('Password must be at least 5 characters long.');
                return;
            }

            if (isEmailTaken(email)) {
                alert('Email is already taken. Please use a different email.');
                return;
            }

            users.push({ email: email, password: password });
            localStorage.setItem('users', JSON.stringify(users)); // Save to localStorage
            console.log('Signup Email:', email);
            console.log('Signup Password:', password);
            alert('Signup successful!');
        });
    }

    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let email = document.getElementById('login-email').value;
            let password = document.getElementById('login-password').value;

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (!isEmailTaken(email)) {
                alert('Email not registered. Please sign up first.');
                return;
            }

            if (!isValidPassword(email, password)) {
                alert('Incorrect password. Please try again.');
                return;
            }

            console.log('Login Email:', email);
            console.log('Login Password:', password);
            alert('Login successful!');
        });
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function isEmailTaken(email) {
    return users.some(user => user.email === email);
}

function isValidPassword(email, password) {
    const user = users.find(user => user.email === email);
    return user && user.password === password;
}
 