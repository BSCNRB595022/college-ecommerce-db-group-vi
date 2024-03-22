const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const content = document.getElementById('content');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid email or password');
        }

        const { token } = await response.json();
        localStorage.setItem('token', token);

        loginContainer.style.display = 'none';
        content.style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
});