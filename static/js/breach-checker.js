// this script runs only after the page has fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // grab the elements from the page that we’ll be working with
    const emailInput = document.getElementById('email-input'); // where the user types their email
    const checkEmailBtn = document.getElementById('check-email-btn'); // the button they click
    const breachFeedbackDiv = document.getElementById('breach-feedback'); // the box where feedback will appear

    // if for some reason the page doesn’t have these elements, we just stop the script
    if (!emailInput || !checkEmailBtn || !breachFeedbackDiv) return;

    // when the user clicks the button, we run the checkBreach function
    checkEmailBtn.addEventListener('click', checkBreach);

    // the main function that checks if the email has been found in any data breaches
    async function checkBreach() {
        // get the email typed by the user, and trim removes extra spaces at the start/end
        const email = emailInput.value.trim();

        // if the email box is empty, show a message and stop here
        if (email === "") {
            breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>please enter an email address to check.</span>";
            return;
        }

        // this regular expression (regex) checks if the email looks like a real email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>please enter a valid email address.</span>";
            return;
        }

        // while waiting for the server to respond, we show a “checking…” message
        breachFeedbackDiv.innerHTML = "<span style='color:#FACC15; font-weight:bold;'>checking...</span>";

        try {
            // here we make a request to our backend server
            // this backend connects to “Have I Been Pwned?” (a well‑known site that checks breaches)
            const response = await fetch('https://cybersafe-hub-762e7d7f2358.herokuapp.com/check_breach', {
                method: 'POST', // we are sending data, so we use POST
                headers: {
                    'Content-Type': 'application/json', // we tell the server we’re sending JSON data
                },
                body: JSON.stringify({ email: email }), // here we send the email the user typed
            });

            // the server sends back a response, and we convert it from JSON so we can use it
            const result = await response.json();

            // if the server says everything is okay (status code between 200 and 299)
            if (response.ok) { 
                if (result.status === 'pwned') {
                    // this means the email was found in one or more data breaches
                    // we make a list of all the breaches where it was found
                    let breachList = result.breaches.map(b => `<li>${b.Name} (${b.Title})</li>`).join('');
                    breachFeedbackDiv.innerHTML = `
                        <span style='color:#FF6B6B; font-weight:bold;'>oh no! this email was found in ${result.breaches.length} breach(es):</span>
                        <ul>${breachList}</ul>
                        <p><strong>what to do:</strong> change your password for these sites right away. 
                        also, make sure you don’t use the same password anywhere else.</p>
                    `;
                } else if (result.status === 'not pwned') {
                    // this means the email was not found in any breach
                    breachFeedbackDiv.innerHTML = `
                        <span style='color:#34D399; font-weight:bold;'>good news! this email wasn’t found in any known breaches.</span>
                        <p><strong>still a tip:</strong> keep using strong, unique passwords 
                        and turn on two‑factor authentication if you can. staying safe is better than being sorry.</p>
                    `;
                } else {
                    // this is a fallback in case the server sends something unexpected
                    console.error("unexpected response from server:", result);
                    breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>something went wrong. please try again later.</span>";
                }
            } else {
                // if the server responded but with an error (for example, 500 or 404)
                console.error("server error:", result.error);
                let errorMessage = result.error || "something went wrong while checking the email.";
                let errorColor = "#FF6B6B"; // red for general errors

                // if the user checks too many emails too fast, we show a specific message
                if (response.status === 429) { 
                    errorMessage = "too many checks in a short time. wait a bit and try again.";
                    errorColor = "#FACC15"; // yellow instead of red to show it’s not a critical error
                }

                breachFeedbackDiv.innerHTML = `<span style='color:${errorColor}; font-weight:bold;'>error:</span> ${errorMessage}`;
            }
        } catch (error) {
            // if the fetch itself fails (like no internet or server down)
            console.error('could not reach the server:', error);
            breachFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>could not connect to the server. please try again later.</span>";
        }
    }
});
