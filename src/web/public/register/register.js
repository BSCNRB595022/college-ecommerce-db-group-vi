// registration.js

document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const role = document.getElementById('role').value;

        // Client-side validation
        if (!name || !email || !password || !confirmPassword || !role) {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Send registration data to server
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                })
            });

            console.log('Response:', response);

            const responseData = await response.json();

            console.log('Response data:', responseData);

            if (response.status === 201) {
                alert('Registration successful!');
                // Redirect to login page or perform any other action as needed
                window.location.href = '/login.html';
            } else {
                alert(responseData.error || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    });
});
