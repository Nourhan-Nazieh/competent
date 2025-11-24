    // Elements
    const otpInputs = document.querySelectorAll('.otp-input');
    const verifyBtn = document.getElementById('verifyBtn');
    const resendBtn = document.getElementById('resendBtn');
    const timerElement = document.getElementById('timer');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Timer variables
    let timeLeft = 300; // 5 minutes in seconds
    let timerInterval;
    
    // Auto-focus and navigation
    otpInputs.forEach((input, index) => {
        // Focus first input on load
        if (index === 0) {
            input.focus();
        }
        
        // Handle input
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            // Only allow numbers
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Add filled class
            if (value) {
                e.target.classList.add('filled');
                
                // Move to next input
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            } else {
                e.target.classList.remove('filled');
            }
            
            // Remove error state
            e.target.classList.remove('error');
            errorMessage.classList.remove('show');
            
            // Check if all inputs are filled
            checkAllFilled();
        });
        
        // Handle backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
        
        // Handle paste
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').trim();
            
            // Only allow 6 digits
            if (/^\d{6}$/.test(pastedData)) {
                pastedData.split('').forEach((char, i) => {
                    if (otpInputs[i]) {
                        otpInputs[i].value = char;
                        otpInputs[i].classList.add('filled');
                    }
                });
                otpInputs[5].focus();
                checkAllFilled();
            }
        });
    });
    
    // Check if all inputs are filled
    function checkAllFilled() {
        const allFilled = Array.from(otpInputs).every(input => input.value !== '');
        verifyBtn.disabled = !allFilled;
    }
    
    // Verify button click
    verifyBtn.addEventListener('click', function() {
        const otp = Array.from(otpInputs).map(input => input.value).join('');
        
        // Hide previous messages
        errorMessage.classList.remove('show');
        successMessage.classList.remove('show');
        
        // Show loading
        verifyBtn.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            // Hide loading
            verifyBtn.classList.remove('loading');
            
            // TODO: Replace with actual verification
            const isValid = otp === '123456'; // Example
            
            if (isValid) {
                // Success
                successMessage.classList.add('show');
                otpInputs.forEach(input => {
                    input.classList.remove('error');
                    input.classList.add('filled');
                    input.disabled = true;
                });
                verifyBtn.disabled = true;
                resendBtn.disabled = true;
                clearInterval(timerInterval);
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                // Error
                errorMessage.classList.add('show');
                otpInputs.forEach(input => {
                    input.classList.add('error');
                    input.value = '';
                    input.classList.remove('filled');
                });
                otpInputs[0].focus();
                verifyBtn.disabled = true;
            }
            
            // TODO: Add your OTP verification logic here
            console.log('Verifying OTP:', otp);
            
        }, 1500);
    });
    
    // Timer countdown
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = '00:00';
                resendBtn.disabled = false;
                otpInputs.forEach(input => input.disabled = true);
                verifyBtn.disabled = true;
            }
        }, 1000);
    }
    
    // Resend code
    resendBtn.addEventListener('click', function() {
        // Reset timer
        timeLeft = 300;
        startTimer();
        resendBtn.disabled = true;
        
        // Clear inputs
        otpInputs.forEach(input => {
            input.value = '';
            input.classList.remove('filled', 'error');
            input.disabled = false;
        });
        otpInputs[0].focus();
        
        // Hide messages
        errorMessage.classList.remove('show');
        successMessage.classList.remove('show');
        
        // TODO: Add your resend code logic here
        console.log('Resending OTP...');
    });
    
    // Start timer on load
    startTimer();
    
    // Get email from URL parameter (optional)
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        document.getElementById('userEmail').textContent = email;
    }
