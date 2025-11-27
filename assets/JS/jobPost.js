// Form elements
const form = document.getElementById('jobPostingForm');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
const submitText = document.getElementById('submitText');
const fileInput = document.getElementById('jdFile');
const fileName = document.getElementById('fileName');

// File input change handler
fileInput.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        const file = this.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            errorMessage.textContent = 'File size exceeds 5MB limit';
            errorMessage.classList.add('show');
            fileInput.value = '';
            fileName.textContent = 'PDF, DOC, DOCX or TXT (Max 5MB)';
            return;
        }

        fileName.textContent = file.name;
        errorMessage.classList.remove('show');
    }
});

// Form submission
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Reset messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    // Validate form
    if (!form.checkValidity() === false) {
        e.stopPropagation();
    }

    // Add Bootstrap validation class
    form.classList.add('was-validated');

    // If form is invalid, stop
    if (!form.checkValidity()) {
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    spinner.classList.add('show');
    submitText.textContent = 'Submitting...';

    try {
        // Simulate form submission (replace with actual API call)
        const formData = new FormData(form);
        
        // Log form data for demonstration
        console.log('Form Data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success response
        successMessage.classList.add('show');
        form.reset();
        form.classList.remove('was-validated');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset file name
        fileName.textContent = 'PDF, DOC, DOCX or TXT (Max 5MB)';

    } catch (error) {
        errorMessage.textContent = 'An error occurred while submitting your request. Please try again.';
        errorMessage.classList.add('show');
        console.error('Error:', error);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        spinner.classList.remove('show');
        submitText.textContent = 'Submit Job Posting Request';
    }
});

// Add custom validation messages
const inputs = form.querySelectorAll('.form-control, .form-select');
inputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
        e.preventDefault();
        
        let message = '';
        if (this.type === 'email' && !this.validity.valid) {
            message = 'Please enter a valid email address';
        } else if (this.validity.valueMissing) {
            message = 'This field is required';
        } else if (this.validity.typeMismatch) {
            message = `Please enter a valid ${this.type}`;
        } else {
            message = this.validationMessage;
        }

        const feedback = this.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.textContent = message;
        }
    });
});
