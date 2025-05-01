document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email-input');
    const checkEmailBtn = document.getElementById('check-email-btn');
    const breachFeedbackDiv = document.getElementById('breach-feedback');

    if (!emailInput || !checkEmailBtn || !breachFeedbackDiv) return;

    checkEmailBtn.addEventListener('click', checkBreach);

    async function checkBreach() {
        const email = emailInput.value.trim();

        if (email === "") {
            breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>Please enter an email address to check.</span>";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>Please enter a valid email address.</span>";
            return;
        }

        breachFeedbackDiv.innerHTML = "<span style='color:#FACC15; font-weight:bold;'>Checking...</span>";

        try {
            // Use Heroku backend URL here!
            const response = await fetch('https://cybersafe-hub-762e7d7f2358.herokuapp.com/check_breach', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email }),
            });

            const result = await response.json();

            // Handle the response from your backend
            if (response.ok) { // Status code is 2xx
                if (result.status === 'pwned') {
                    // Email found in breaches
                    let breachList = result.breaches.map(b => `<li>${b.Name} (${b.Title})</li>`).join('');
                    breachFeedbackDiv.innerHTML = `
                        <span style='color:#FF6B6B; font-weight:bold;'>Oh no! This email was found in ${result.breaches.length} breach(es):</span>
                        <ul>${breachList}</ul>
                        <p><strong>Action:</strong> It's highly recommended to change your password for services using this email, especially for the sites listed above.</p>
                    `;
                } else if (result.status === 'not pwned') {
                    // Email not found in breaches
                    breachFeedbackDiv.innerHTML = `
                        <span style='color:#34D399; font-weight:bold;'>Good news! This email was NOT found in any known breaches.</span>
                        <p><strong>Action:</strong> Great! But always use strong, unique passwords and enable two-factor authentication where possible.</p>
                    `;
                } else {
                    // Unexpected successful response format
                    console.error("Unexpected backend response format:", result);
                    breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>An unexpected issue occurred. Please try again later.</span>";
                }
            } else { // Status code is not 2xx (error from backend)
                console.error("Backend error:", result.error);
                let errorMessage = result.error || "An error occurred while checking the email.";
                let errorColor = "#FF6B6B"; // Default error color

                if (response.status === 429) { // Rate limit specific message
                    errorMessage = "Too many checks recently. Please wait a moment and try again.";
                    errorColor = "#FACC15"; // Yellow for rate limit
                }

                breachFeedbackDiv.innerHTML = `<span style='color:${errorColor}; font-weight:bold;'>Error:</span> ${errorMessage}`;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>Could not connect to the server. Please try again later.</span>";
        }
    }
});
