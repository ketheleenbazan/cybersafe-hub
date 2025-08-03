// wait until the page has fully loaded before running any of this
document.addEventListener('DOMContentLoaded', function() {
    // grab the input where the user types their password
    const input = document.getElementById('attack-password-input');
    // grab the "simulate attack" button
    const btn = document.getElementById('simulate-attack-btn');
    // grab the div where feedback/results will be displayed
    const feedback = document.getElementById('attack-simulator-feedback');

    // create an animation area below the feedback if it doesn’t already exist
    let animationDiv = document.getElementById('attack-simulator-animation');
    if (!animationDiv) {
        animationDiv = document.createElement('div');
        animationDiv.id = 'attack-simulator-animation';
        animationDiv.style.marginTop = '1em';
        feedback.parentNode.insertBefore(animationDiv, feedback.nextSibling);
    }

    // if for some reason elements don’t exist, stop the script
    if (!input || !btn || !feedback) return;

    // when the user clicks the "simulate attack" button
    btn.addEventListener('click', function() {
        const password = input.value;
        animationDiv.innerHTML = ""; // clear any previous animation

        // if nothing was typed, show a warning
        if (!password) {
            feedback.innerHTML = "<span style='color:#FF6B6B;'>Please enter a password.</span>";
            return;
        }

        // run the analysis function to check how strong the password is
        const result = analyzePasswordAttack(password);

        // show the results in the feedback area
        feedback.innerHTML = `
            <b>Character sets used:</b> ${result.charsets.join(', ')}<br>
            <b>Entropy:</b> ${result.entropyBits.toFixed(2)} bits (${result.poolSize}<sup>${result.length}</sup>)<br>
            <b>Brute-force time:</b><br>
            &nbsp;&nbsp;Online (1K/sec): <b>${result.timeOnline}</b><br>
            &nbsp;&nbsp;Offline (10B/sec): <b>${result.timeOffline}</b><br>
            <b>Risk level:</b> <span style="color:${result.riskColor}; font-weight:bold;">${result.riskLevel}</span>
            ${result.warning ? `<br><span style="color:#FF6B6B; font-weight:bold;">${result.warning}</span>` : ""}
        `;

        // if the password is super weak (cracked instantly), just show that
        if (result.instantCrack) {
            animationDiv.innerHTML = `<b>Simulating attack:</b> <span style="color:#FF6B6B;">Password cracked instantly!</span>`;
        } else {
            // otherwise, run the fake brute force animation
            animateBruteForce(result.guesses, result.timeOfflineRaw);
        }
    });

    // this function fakes a brute-force attack animation so users can "see" the guessing process
    function animateBruteForce(guesses, seconds) {
        const maxSteps = 100; // we limit the animation so it doesn’t take forever
        let steps = [];

        // if there are a crazy number of guesses, spread them out logarithmically
        if (guesses > maxSteps) {
            for (let i = 1; i <= maxSteps; i++) {
                steps.push(Math.floor(Math.pow(guesses, i / maxSteps)));
            }
        } else {
            // if the guesses number is small, just go step by step
            for (let i = 1; i <= guesses; i++) {
                steps.push(i);
            }
        }

        // set up the HTML structure for the animation
        animationDiv.innerHTML = `<b>Simulating attack:</b> 
        <span id="brute-counter" style="font-family:monospace;"></span><br>
        <span id="brute-time"></span>`;

        const counter = document.getElementById('brute-counter');
        const timeSpan = document.getElementById('brute-time');

        // recursive function to update the counter and time
        function update(stepIdx) {
            if (stepIdx >= steps.length) {
                counter.textContent = steps[steps.length - 1].toLocaleString();
                timeSpan.innerHTML = `<b>Time to crack (offline):</b> ${formatTime(seconds)}`;
                return;
            }
            counter.textContent = steps[stepIdx].toLocaleString();
            let currentTime = (steps[stepIdx] / 10_000_000_000); // offline rate
            timeSpan.innerHTML = `<b>Time elapsed:</b> ${formatTime(currentTime)}`;
            setTimeout(() => update(stepIdx + 1), 20); // run again after 20ms
        }
        update(0);
    }

    // main logic to analyze the password strength
    function analyzePasswordAttack(password) {
        // list of the most common passwords hackers try first
        const commonPasswords = ["password", "123456", "123456789", "qwerty", "letmein", "iloveyou", "admin", "welcome", "monkey", "football", "dragon", "111111", "abc123"];

        // common keyboard patterns (easy to type, easy to guess)
        const keyboardPatterns = ["qwerty", "asdf", "zxcv", "1234", "1111", "0000", "1q2w3e"];

        // regex to check for "name + year" style passwords (e.g., John1990)
        const nameYearPattern = /^([A-Za-z]+)(19|20)\d{2}[^A-Za-z0-9]*$/;

        // check for repeated sequences (like ababab or 121212)
        const repeatedPattern = /(.+)\1{1,}/;

        // check for date-style passwords (01011990, 19900101, etc.)
        const datePattern = /^(?:\d{2}[-\/]?\d{2}[-\/]?\d{2,4}|\d{4}[-\/]?\d{2}[-\/]?\d{2})$/;

        // detect leetspeak versions of common words (e.g., p@ssw0rd)
        const leetPattern = /[a@4][s$5][s$5][wvv][o0][r][d]/i;

        // reversed versions of the common passwords
        const reversedCommon = commonPasswords.map(pw => pw.split('').reverse().join(''));

        // figure out which character sets the password uses
        let poolSize = 0;
        let charsets = [];
        if (/[a-z]/.test(password)) { poolSize += 26; charsets.push('lowercase'); }
        if (/[A-Z]/.test(password)) { poolSize += 26; charsets.push('uppercase'); }
        if (/[0-9]/.test(password)) { poolSize += 10; charsets.push('digits'); }
        if (/[^A-Za-z0-9]/.test(password)) { poolSize += 32; charsets.push('special chars'); }

        // measure entropy: higher bits = harder to crack
        const length = password.length;
        const entropyBits = length * Math.log2(poolSize || 1);

        // total number of guesses a brute force attack would need
        const guesses = Math.pow(poolSize || 1, length);

        // estimate cracking time at different speeds
        let timeOnline = formatTime(guesses / 1_000); // 1,000 guesses per sec
        let timeOffline = formatTime(guesses / 10_000_000_000); // 10 billion guesses per sec

        // default risk settings
        let riskLevel = "Low", riskColor = "#34D399"; // green
        let warning = "";
        let instantCrack = false;

        // check against all the common weakness patterns
        if (commonPasswords.includes(password.toLowerCase())) {
            warning = "This password is found in a common password list!";
            instantCrack = true;
        } else if (keyboardPatterns.some(pat => password.toLowerCase().includes(pat))) {
            warning = "This password matches a common keyboard pattern!";
            instantCrack = true;
        } else if (nameYearPattern.test(password)) {
            warning = "This password looks like a name followed by a year!";
            instantCrack = true;
        } else if (repeatedPattern.test(password)) {
            warning = "This password contains repeated sequences!";
            instantCrack = true;
        } else if (datePattern.test(password)) {
            warning = "This password looks like a date!";
            instantCrack = true;
        } else if (leetPattern.test(password)) {
            warning = "This password looks like a leetspeak version of a common word!";
            instantCrack = true;
        } else if (reversedCommon.includes(password.toLowerCase())) {
            warning = "This password is a reversed common password!";
            instantCrack = true;
        } else if (entropyBits < 40) { // weak if entropy < 40
            riskLevel = "High";
            riskColor = "#FF6B6B";
        } else if (entropyBits < 60) { // medium if < 60
            riskLevel = "Medium";
            riskColor = "#FACC15";
        }

        // if flagged as instant crack, force times to "<1 second" and risk high
        if (instantCrack) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
        }

        return {
            charsets: charsets.length ? charsets : ['none'],
            poolSize,
            length,
            entropyBits,
            timeOnline,
            timeOffline,
            riskLevel,
            riskColor,
            warning,
            guesses,
            timeOfflineRaw: guesses / 10_000_000_000,
            instantCrack
        };
    }

    // turns seconds into a human-readable time (like "2 days, 3 hours")
    function formatTime(seconds) {
        if (seconds < 1) return "<1 second";
        const units = [
            { label: "years", secs: 31536000 },
            { label: "days", secs: 86400 },
            { label: "hours", secs: 3600 },
            { label: "minutes", secs: 60 },
            { label: "seconds", secs: 1 }
        ];
        let time = [];
        for (const u of units) {
            const amt = Math.floor(seconds / u.secs);
            if (amt > 0) {
                time.push(`${amt} ${u.label}`);
                seconds -= amt * u.secs;
            }
        }
        return time.slice(0,2).join(", "); // only show the 2 biggest units
    }
});
