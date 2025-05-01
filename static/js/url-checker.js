document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('url-input');
    const checkUrlBtn = document.getElementById('check-url-btn');
    const urlFeedbackDiv = document.getElementById('url-feedback');

    if (!urlInput || !checkUrlBtn || !urlFeedbackDiv) return;

    checkUrlBtn.addEventListener('click', checkUrl);

    function checkUrl() {
        const url = urlInput.value.trim();
        if (url === "") {
            urlFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>Please enter a URL to check.</span>";
            return;
        }

        let isSuspicious = false;
        let feedbackMessages = [];

        // Basic URL parsing (can be more robust)
        let domain = '';
        try {
            const urlObject = new URL(url);
            domain = urlObject.hostname;
        } catch (e) {
            urlFeedbackDiv.innerHTML = "<span style='color:#FF6B6B; font-weight:bold;'>Invalid URL format. Please enter a full URL starting with http:// or https://</span>";
            return;
        }

        // Rule 1: Check for IP address instead of domain name
        const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (ipRegex.test(domain)) {
            isSuspicious = true;
            feedbackMessages.push("Uses an IP address instead of a domain name.");
        }

        // Rule 2: Check for too many subdomains (heuristic)
        const parts = domain.split('.');
        // Consider domains like co.uk, .gov.uk as single parts for simplicity
        const effectiveParts = parts.filter(part => !['co', 'gov', 'org', 'net', 'com'].includes(part));
        if (effectiveParts.length > 3) { // More than 3 parts (e.g., sub.sub.domain.com)
             isSuspicious = true;
             feedbackMessages.push("Has many subdomains, which can be suspicious.");
        }


        // Rule 3: Basic check for common misspellings (simple example)
        const commonBrands = ['google', 'amazon', 'paypal', 'microsoft', 'apple'];
        const lowerDomain = domain.toLowerCase();
        let misspelled = false;
        for(const brand of commonBrands) {
            // Simple check: if domain contains brand name but has non-alphanumeric chars mixed in
            if (lowerDomain.includes(brand) && !/^[a-z0-9.-]+$/.test(lowerDomain)) {
                 misspelled = true;
                 break;
            }
             // More specific misspelling checks (can add more regex patterns here)
             if (lowerDomain.includes(brand.replace('o', '0')) || lowerDomain.includes(brand.replace('l', '1'))) {
                 misspelled = true;
                 break;
             }
        }
        if (misspelled) {
             isSuspicious = true;
             feedbackMessages.push("May contain misspellings of known brand names.");
        }


        // Rule 4: Check for lack of HTTPS (less critical but worth noting)
        if (!url.startsWith('https://')) {
             feedbackMessages.push("Does not use HTTPS (connection may not be secure).");
        }


        // Provide feedback
        if (isSuspicious) {
            urlFeedbackDiv.innerHTML = `
                <span style='color:#FF6B6B; font-weight:bold;'>Likely Suspicious!</span>
                <br>Reasons:
                <ul>
                    ${feedbackMessages.map(msg => `<li>${msg}</li>`).join('')}
                </ul>
                <p>Be very careful before clicking links or entering information on this site.</p>
            `;
        } else {
             if (feedbackMessages.length > 0) {
                 urlFeedbackDiv.innerHTML = `
                    <span style='color:#FACC15; font-weight:bold;'>Potentially Suspicious.</span>
                    <br>Things to note:
                    <ul>
                        ${feedbackMessages.map(msg => `<li>${msg}</li>`).join('')}
                    </ul>
                    <p>Always double-check the URL and look for other signs of phishing.</p>
                 `;
             } else {
                 urlFeedbackDiv.innerHTML = `
                    <span style='color:#34D399; font-weight:bold;'>Looks OK based on basic checks.</span>
                    <p>However, always stay vigilant! Phishing scams are constantly evolving.</p>
                 `;
             }
        }
    }
});
