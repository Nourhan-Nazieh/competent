
// Toggle Password Visibility
function togglePassword(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);
    
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
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Validate terms accepted
    if (!terms) {
        alert('Please accept the Terms & Conditions');
        return;
    }
    
    // TODO: Add your signup logic here
    console.log('Sign up attempt:', { fullname, email, password, terms });
    
    // Simulate signup
    alert('Account created successfully!');
    
    // Redirect to login or dashboard
    // window.location.href = 'login.html';
});

// Social Sign Up
function socialSignup(provider) {
    // TODO: Implement social signup
    alert(`Sign up with ${provider} - Coming soon!`);
}
