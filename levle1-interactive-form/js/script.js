document.addEventListener('DOMContentLoaded', () => {
    
    
    const form = document.getElementById('registration-form');
    const fullname = document.getElementById('fullname');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const successToast = document.getElementById('success-toast');

    
    const meter1 = document.getElementById('meter-1');
    const meter2 = document.getElementById('meter-2');
    const meter3 = document.getElementById('meter-3');
    const strengthText = document.getElementById('strength-text');

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Allows optional + at start, strictly 9 to 13 digits total
    const phoneRegex = /^\+?\d{9,13}$/;

    
    const showError = (input, message) => {
        const formControl = input.closest('.form-control');
        const errorDisplay = formControl.querySelector('.error-message');
        
        formControl.classList.remove('success');
        formControl.classList.add('error');
        errorDisplay.innerText = message;
        input.setAttribute('aria-invalid', 'true');
    };

    
    const showSuccess = (input) => {
        const formControl = input.closest('.form-control');
        formControl.classList.remove('error');
        formControl.classList.add('success');
        input.setAttribute('aria-invalid', 'false');
    };

    
    const validateFullName = () => {
        const val = fullname.value.trim();
        if (val === '') {
            showError(fullname, 'Full name is required');
            return false;
        } else if (val.length < 3) {
            showError(fullname, 'Full name must contain at least 3 characters');
            return false;
        } else {
            showSuccess(fullname);
            return true;
        }
    };

    const validateEmail = () => {
        const val = email.value.trim();
        if (val === '') {
            showError(email, 'Email address is required');
            return false;
        } else if (!emailRegex.test(val)) {
            showError(email, 'Please enter a valid email address');
            return false;
        } else {
            showSuccess(email);
            return true;
        }
    };

    const validatePhone = () => {
        const val = phone.value.trim();
        if (val === '') {
            showError(phone, 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(val)) {
            showError(phone, 'Phone must be 9-13 digits (e.g., +251912345678)');
            return false;
        } else {
            showSuccess(phone);
            return true;
        }
    };

    const validatePassword = () => {
        const val = password.value;
        const hasUpper = /[A-Z]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasNum = /\d/.test(val);

       
        updateStrengthMeter(val, hasUpper, hasLower, hasNum);

        if (val === '') {
            showError(password, 'Password is required');
            return false;
        } else if (val.length < 8) {
            showError(password, 'Password must be at least 8 characters');
            return false;
        } else if (!hasUpper || !hasLower || !hasNum) {
            showError(password, 'Must contain uppercase, lowercase, and a number');
            return false;
        } else {
            showSuccess(password);
            
            
            if(confirmPassword.value !== '') {
                validateConfirmPassword();
            }
            return true;
        }
    };

    const validateConfirmPassword = () => {
        const val = confirmPassword.value;
        if (val === '') {
            showError(confirmPassword, 'Please confirm your password');
            return false;
        } else if (val !== password.value) {
            showError(confirmPassword, 'Passwords do not match');
            return false;
        } else {
            showSuccess(confirmPassword);
            return true;
        }
    };

    const updateStrengthMeter = (val, hasUpper, hasLower, hasNum) => {
        
        meter1.style.backgroundColor = 'var(--border-color)';
        meter2.style.backgroundColor = 'var(--border-color)';
        meter3.style.backgroundColor = 'var(--border-color)';
        strengthText.innerText = '';
        strengthText.style.color = 'var(--text-muted)';

        if (val.length === 0) return;

        let strength = 0;
        if (val.length >= 8) strength += 1;
        if (hasUpper && hasLower) strength += 1;
        if (hasNum) strength += 1;

        if (strength === 0 || val.length < 6) {
            // Weak
            meter1.style.backgroundColor = 'var(--error-red)';
            strengthText.innerText = 'Weak';
            strengthText.style.color = 'var(--error-red)';
        } else if (strength === 1 || strength === 2) {
            // Medium
            meter1.style.backgroundColor = 'var(--secondary-orange)';
            meter2.style.backgroundColor = 'var(--secondary-orange)';
            strengthText.innerText = 'Medium';
            strengthText.style.color = 'var(--secondary-orange)';
        } else if (strength >= 3) {
            // Strong
            meter1.style.backgroundColor = 'var(--primary-green)';
            meter2.style.backgroundColor = 'var(--primary-green)';
            meter3.style.backgroundColor = 'var(--primary-green)';
            strengthText.innerText = 'Strong';
            strengthText.style.color = 'var(--primary-green)';
        }
    };

    
    fullname.addEventListener('input', validateFullName);
    email.addEventListener('input', validateEmail);
    phone.addEventListener('input', validatePhone);
    password.addEventListener('input', validatePassword);
    confirmPassword.addEventListener('input', validateConfirmPassword);

    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        
        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPassValid = validatePassword();
        const isConfirmValid = validateConfirmPassword();

        if (isNameValid && isEmailValid && isPhoneValid && isPassValid && isConfirmValid) {
            
            successToast.classList.add('show');
            
            
            setTimeout(() => {
                successToast.classList.remove('show');
            }, 3000);

            
            form.reset();
            const formControls = document.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.classList.remove('success');
            });
            updateStrengthMeter('', false, false, false);
        }
    });

});