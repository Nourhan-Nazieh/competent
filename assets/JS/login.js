// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Handle Form Submit
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // TODO: Add your login logic here
    console.log('Login attempt:', { email, password, remember });
    
    // Simulate login
    alert('Login successful!');
    
    // Redirect to dashboard
    // window.location.href = 'dashboard.html';
});

// Social Login
function socialLogin(provider) {
    // TODO: Implement social login
    alert(`Login with ${provider} - Coming soon!`);
}
