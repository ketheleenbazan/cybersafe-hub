// wait until the page has loaded before running any of this code
document.addEventListener('DOMContentLoaded', function() {
    // grab the input field, the button, and the div where we’ll show feedback
    const urlInput = document.getElementById('url-input');
    const checkUrlBtn = document.getElementById('check-url-btn');
    const urlFeedbackDiv = document.getElementById('url-feedback');

    // if for some reason any of those elements don’t exist, just stop here
    if (!urlInput || !checkUrlBtn || !urlFeedbackDiv) return;

    // when the user clicks the button, run the checkUrl function
    checkUrlBtn.addEventListener('click', checkUrl);

    function checkUrl() {
        // take the value from the input and trim spaces
        const url = urlInput.value.trim();

        // if the input is empty, let the user know
        if (url === "") {
            urlFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>please enter a url to check.</span>";
            return;
        }

        // set up some variables
        let isSuspicious = false;
        let feedbackMessages = [];

        // try to break down the url into parts we can work with
        let domain = '';
        try {
            const urlObject = new URL(url); // native browser url parser
            domain = urlObject.hostname;
        } catch (e) {
            // if it doesn’t parse correctly, show an error
            urlFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>invalid url format. make sure it starts with http:// or https://</span>";
            return;
        }

        // rule 1: see if the url uses a raw ip instead of a proper domain
        // phishing sites often do this to hide their identity
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (ipRegex.test(domain)) {
            isSuspicious = true;
            feedbackMessages.push("uses an ip address instead of a domain name.");
        }

        // rule 2: check if the domain has way too many parts (subdomains)
        // lots of subdomains can sometimes be used to trick people
        const parts = domain.split('.');
        const effectiveParts = parts.filter(part => !['co', 'gov', 'org', 'net', 'com'].includes(part));
        if (effectiveParts.length > 3) {
            isSuspicious = true;
            feedbackMessages.push("has many subdomains, which can be suspicious.");
        }

        // rule 3: check for common brand names that look misspelled
        // e.g. amaz0n instead of amazon
        const commonBrands = ['google', 'amazon', 'paypal', 'microsoft', 'apple'];
        const lowerDomain = domain.toLowerCase();
        let misspelled = false;
        for (const brand of commonBrands) {
            // if the brand name is there but with weird characters
            if (lowerDomain.includes(brand) && !/^[a-z0-9.-]+$/.test(lowerDomain)) {
                misspelled = true;
                break;
            }
            // look for simple tricks like replacing letters with numbers
            if (lowerDomain.includes(brand.replace('o', '0')) || lowerDomain.includes(brand.replace('l', '1'))) {
                misspelled = true;
                break;
            }
        }
        if (misspelled) {
            isSuspicious = true;
            feedbackMessages.push("may contain misspellings of known brand names.");
        }

        // rule 4: check if the site doesn’t use https
        // not always phishing, but definitely less safe
        if (!url.startsWith('https://')) {
            feedbackMessages.push("does not use https (connection may not be secure).");
        }

        // now, depending on what we found, show the feedback
        if (isSuspicious) {
            // pretty strong signs it’s dodgy
            urlFeedbackDiv.innerHTML = `
                <span style='color:#FF6B6B; font-weight:bold;'>likely suspicious!</span>
                <br>reasons:
                <ul>
                    ${feedbackMessages.map(msg => `<li>${msg}</li>`).join('')}
                </ul>
                <p>be very careful before clicking links or entering information on this site.</p>
            `;
        } else {
            if (feedbackMessages.length > 0) {
                // not super shady, but still some yellow flags
                urlFeedbackDiv.innerHTML = `
                    <span style='color:#FACC15; font-weight:bold;'>potentially suspicious.</span>
                    <br>things to note:
                    <ul>
                        ${feedbackMessages.map(msg => `<li>${msg}</li>`).join('')}
                    </ul>
                    <p>always double-check the url and look for other signs of phishing.</p>
                `;
            } else {
                // nothing suspicious found
                urlFeedbackDiv.innerHTML = `
                    <span style='color:#34D399; font-weight:bold;'>looks ok based on basic checks.</span>
                    <p>however, always stay vigilant! phishing scams are constantly evolving.</p>
                `;
            }
        }
    }
});
