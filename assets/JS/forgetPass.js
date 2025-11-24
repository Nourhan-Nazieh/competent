
// Form Submit
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Hide previous messages
    emailError.classList.remove('show');
    successMessage.classList.remove('show');
    
    // Get values
    const email = emailInput.value.trim();
    
    // Validate email
    if (!isValidEmail(email)) {
        emailError.classList.add('show');
        emailInput.focus();
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        submitBtn.classList.remove('loading');
        
        // Show success message
        successMessage.classList.add('show');
        
        // Clear form
        form.reset();
        
        // TODO: Add your forgot password logic here
        console.log('Password reset requested for:', email);
        
        // Optional: Redirect to login after 3 seconds
        // setTimeout(() => {
        //     window.location.href = 'login.html';
        // }, 3000);
        
    }, 1500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Clear error on input
emailInput.addEventListener('input', function() {
    emailError.classList.remove('show');
});
