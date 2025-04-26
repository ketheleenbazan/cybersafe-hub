document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password-input');
    const feedbackDiv = document.getElementById('password-strength-feedback');
    const checkBtn = document.getElementById('check-password-btn');

    if (!passwordInput || !feedbackDiv || !checkBtn) return;

    function updateFeedback() {
        const password = passwordInput.value;
        const result = checkPasswordStrength(password);
        feedbackDiv.innerHTML = `<span style="color:${result.color}; font-weight:bold;">${result.strength}</span><br>${result.message}`;
    }

    passwordInput.addEventListener('input', updateFeedback);
    checkBtn.addEventListener('click', updateFeedback);

    function checkPasswordStrength(password) {
        let score = 0;
        let suggestions = [];

        if (password.length >= 8) score++;
        else suggestions.push("Use at least 8 characters.");

        if (/[A-Z]/.test(password)) score++;
        else suggestions.push("Add uppercase letters.");

        if (/[a-z]/.test(password)) score++;
        else suggestions.push("Add lowercase letters.");

        if (/[0-9]/.test(password)) score++;
        else suggestions.push("Add numbers.");

        if (/[^A-Za-z0-9]/.test(password)) score++;
        else suggestions.push("Add special symbols (like !, @, #, $).");

        // Check for common patterns or words
        if (/password|1234|qwerty|letmein|admin/i.test(password)) {
            suggestions.push("Avoid common words or easy patterns.");
            score = Math.min(score, 2); // Penalize for common patterns
        }

        // Feedback based on score
        let strength = "";
        let color = "";
        if (password.length === 0) {
            strength = "";
            color = "";
            suggestions = [];
        } else if (score <= 2) {
            strength = "Weak";
            color = "#FF6B6B";
        } else if (score === 3 || score === 4) {
            strength = "Moderate";
            color = "#FACC15";
        } else if (score === 5) {
            strength = "Strong";
            color = "#34D399";
        }

        let message = "";
        if (password.length === 0) {
            message = "Start typing a password and click 'Check Password' to see feedback.";
        } else if (score === 5) {
            message = "Great job! Your password is strong.";
        } else {
            message = "Suggestions:<br>• " + suggestions.join("<br>• ");
        }

        return { strength, color, message };
    }
});
