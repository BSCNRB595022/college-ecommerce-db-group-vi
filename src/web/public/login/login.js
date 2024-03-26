// login.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Client-side validation
        if (!email || !password) {
            alert('Email and password are required.');
            return;
        }

        // Send login data to server
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            console.log('Response:', response);

            const responseData = await response.json();

            console.log('Response data:', responseData);

            if (response.status === 200) {
                const { role } = responseData;
                // Redirect to the appropriate dashboard based on the user's role
                if (role === 'admin') {
                    window.location.href = '/dashboard/admin';
                } else {
                    window.location.href = '/dashboard/user';
                }
            } else {
                alert(responseData.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    });
});
