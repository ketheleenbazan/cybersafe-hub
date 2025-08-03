// wait until the page content is fully loaded before running anything
document.addEventListener('DOMContentLoaded', function() {
    // grab the password input box where the user types their password
    const passwordInput = document.getElementById('password-input');
    // grab the area where we’ll show strength feedback
    const feedbackDiv = document.getElementById('password-strength-feedback');
    // grab the "Check Password" button
    const checkBtn = document.getElementById('check-password-btn');

    // if any of these elements don’t exist, just stop (prevents errors)
    if (!passwordInput || !feedbackDiv || !checkBtn) return;

    // main function: runs whenever the user types or clicks check
    function updateFeedback() {
        const password = passwordInput.value; // get what user typed
        const result = checkPasswordStrength(password); // run analysis
        // show feedback in the page with color + message
        feedbackDiv.innerHTML = `<span style="color:${result.color}; font-weight:bold;">${result.strength}</span><br>${result.message}`;
    }

    // as the user types, update feedback instantly
    passwordInput.addEventListener('input', updateFeedback);
    // also allow clicking the button to check
    checkBtn.addEventListener('click', updateFeedback);

    // function that actually analyzes how strong the password is
    function checkPasswordStrength(password) {
        let score = 0;           // this keeps track of how strong it is
        let suggestions = [];    // store tips if password is weak

        // check password length
        if (password.length >= 8) score++;
        else suggestions.push("Use at least 8 characters.");

        // check for uppercase letters
        if (/[A-Z]/.test(password)) score++;
        else suggestions.push("Add uppercase letters.");

        // check for lowercase letters
        if (/[a-z]/.test(password)) score++;
        else suggestions.push("Add lowercase letters.");

        // check for numbers
        if (/[0-9]/.test(password)) score++;
        else suggestions.push("Add numbers.");

        // check for special characters (symbols)
        if (/[^A-Za-z0-9]/.test(password)) score++;
        else suggestions.push("Add special symbols (like !, @, #, $).");

        // penalize if password looks too common (like "password" or "1234")
        if (/password|1234|qwerty|letmein|admin/i.test(password)) {
            suggestions.push("Avoid common words or easy patterns.");
            score = Math.min(score, 2); // cap the score if it's too predictable
        }

        // now decide strength and color based on score
        let strength = "";
        let color = "";
        if (password.length === 0) {
            // nothing typed yet → show no rating
            strength = "";
            color = "";
            suggestions = [];
        } else if (score <= 2) {
            strength = "Weak";     // 2 or less checks passed
            color = "#FF6B6B";     // red
        } else if (score === 3 || score === 4) {
            strength = "Moderate"; // decent, but could be better
            color = "#FACC15";     // yellow
        } else if (score === 5) {
            strength = "Strong";   // passed all checks
            color = "#34D399";     // green
        }

        // create the message for the user
        let message = "";
        if (password.length === 0) {
            message = "Start typing a password and click 'Check Password' to see feedback.";
        } else if (score === 5) {
            message = "Great job! Your password is strong.";
        } else {
            // list suggestions with bullet points
            message = "Suggestions:<br>• " + suggestions.join("<br>• ");
        }

        // return everything so updateFeedback() can use it
        return { strength, color, message };
    }
});
