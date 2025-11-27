     // Form elements
     const form = document.getElementById('demoBookingForm');
     const successMessage = document.getElementById('successMessage');
     const errorMessage = document.getElementById('errorMessage');
     const submitBtn = document.getElementById('submitBtn');
     const spinner = document.getElementById('spinner');
     const submitText = document.getElementById('submitText');

     // Form submission
     form.addEventListener('submit', async function(e) {
         e.preventDefault();

         // Reset messages
         successMessage.classList.remove('show');
         errorMessage.classList.remove('show');

         // Validate interests
         const interests = document.querySelectorAll('input[name="interests"]:checked');
         if (interests.length === 0) {
             document.getElementById('interestsFeedback').textContent = 'Please select at least one area of interest';
             document.getElementById('interestsFeedback').style.display = 'block';
             return;
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
         submitText.textContent = 'Booking...';

         try {
             // Collect form data
             const formData = new FormData(form);
             const selectedInterests = Array.from(interests).map(cb => cb.value);
             
             const data = {
                 fullName: formData.get('fullName'),
                 email: formData.get('email'),
                 phone: formData.get('phone'),
                 companyName: formData.get('companyName'),
                 industry: formData.get('industry'),
                 companySize: formData.get('companySize'),
                 position: formData.get('position'),
                 preferredDate: formData.get('preferredDate'),
                 preferredTime: formData.get('preferredTime'),
                 interests: selectedInterests,
                 message: formData.get('message')
             };

             // Log form data for demonstration
             console.log('Demo Booking Data:', data);

             // Simulate API delay
             await new Promise(resolve => setTimeout(resolve, 1500));

             // Success response
             successMessage.classList.add('show');
             form.reset();
             form.classList.remove('was-validated');
             
             // Scroll to success message
             successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

         } catch (error) {
             errorMessage.textContent = 'An error occurred while booking your demo. Please try again.';
             errorMessage.classList.add('show');
             console.error('Error:', error);
         } finally {
             // Reset button state
             submitBtn.disabled = false;
             spinner.classList.remove('show');
             submitText.textContent = 'Book Your Demo';
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

     // Clear interests feedback when checkbox is clicked
     document.querySelectorAll('input[name="interests"]').forEach(checkbox => {
         checkbox.addEventListener('change', function() {
             const interests = document.querySelectorAll('input[name="interests"]:checked');
             if (interests.length > 0) {
                 document.getElementById('interestsFeedback').style.display = 'none';
             }
         });
     });