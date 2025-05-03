// static/js/password-attack-simulator.js

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('attack-password-input');
    const btn = document.getElementById('simulate-attack-btn');
    const feedback = document.getElementById('attack-simulator-feedback');

    // Add animation div if not present
    let animationDiv = document.getElementById('attack-simulator-animation');
    if (!animationDiv) {
        animationDiv = document.createElement('div');
        animationDiv.id = 'attack-simulator-animation';
        animationDiv.style.marginTop = '1em';
        feedback.parentNode.insertBefore(animationDiv, feedback.nextSibling);
    }

    if (!input || !btn || !feedback) return;

    btn.addEventListener('click', function() {
        const password = input.value;
        animationDiv.innerHTML = ""; // Clear previous animation
        if (!password) {
            feedback.innerHTML = "<span style='color:#FF6B6B;'>Please enter a password.</span>";
            return;
        }
        const result = analyzePasswordAttack(password);

        feedback.innerHTML = `
            <b>Character sets used:</b> ${result.charsets.join(', ')}<br>
            <b>Entropy:</b> ${result.entropyBits.toFixed(2)} bits (${result.poolSize}<sup>${result.length}</sup>)<br>
            <b>Brute-force time:</b><br>
            &nbsp;&nbsp;Online (1K/sec): <b>${result.timeOnline}</b><br>
            &nbsp;&nbsp;Offline (10B/sec): <b>${result.timeOffline}</b><br>
            <b>Risk level:</b> <span style="color:${result.riskColor}; font-weight:bold;">${result.riskLevel}</span>
            ${result.warning ? `<br><span style="color:#FF6B6B; font-weight:bold;">${result.warning}</span>` : ""}
        `;

        // Animate only if not instantly crackable
        if (result.instantCrack) {
            animationDiv.innerHTML = `<b>Simulating attack:</b> <span style="color:#FF6B6B;">Password cracked instantly!</span>`;
        } else {
            animateBruteForce(result.guesses, result.timeOfflineRaw);
        }
    });

    function animateBruteForce(guesses, seconds) {
        // Cap the animation for performance
        const maxSteps = 100; // Number of animation steps
        let displayGuesses = guesses;
        let step = 0;
        let interval = 20; // ms per step

        // If guesses is huge, animate logarithmically
        let steps = [];
        if (guesses > maxSteps) {
            for (let i = 1; i <= maxSteps; i++) {
                steps.push(Math.floor(Math.pow(guesses, i / maxSteps)));
            }
        } else {
            for (let i = 1; i <= guesses; i++) {
                steps.push(i);
            }
        }

        animationDiv.innerHTML = `<b>Simulating attack:</b> <span id="brute-counter" style="font-family:monospace;"></span><br>
        <span id="brute-time"></span>`;

        const counter = document.getElementById('brute-counter');
        const timeSpan = document.getElementById('brute-time');

        function update(stepIdx) {
            if (stepIdx >= steps.length) {
                counter.textContent = steps[steps.length - 1].toLocaleString();
                timeSpan.innerHTML = `<b>Time to crack (offline):</b> ${formatTime(seconds)}`;
                return;
            }
            counter.textContent = steps[stepIdx].toLocaleString();
            // Show estimated time at this guess count
            let currentTime = (steps[stepIdx] / 10_000_000_000);
            timeSpan.innerHTML = `<b>Time elapsed:</b> ${formatTime(currentTime)}`;
            setTimeout(() => update(stepIdx + 1), interval);
        }
        update(0);
    }

    function analyzePasswordAttack(password) {
        // Expanded common password dictionary (top 25+)
        const commonPasswords = [
            "password", "123456", "123456789", "12345", "12345678", "qwerty", "abc123", "football", "monkey", "letmein",
            "shadow", "master", "666666", "qwertyuiop", "123321", "mustang", "1234567", "123123", "welcome", "dragon",
            "passw0rd", "starwars", "654321", "superman", "1qaz2wsx", "michael", "111111", "iloveyou", "admin", "login"
        ];

        // Keyboard patterns (expand as needed)
        const keyboardPatterns = [
            "qwerty", "asdf", "zxcv", "1234", "1111", "0000", "qazwsx", "1q2w3e", "wasd", "poiuy", "lkjhg"
        ];

        // Name + year pattern (simple)
        const nameYearPattern = /^([A-Za-z]+)(19|20)\d{2}[^A-Za-z0-9]*$/;

        // Repeated sequence pattern
        const repeatedPattern = /(.+)\1{1,}/;

        // Date pattern (e.g., 01011990, 19900101, 12-31-1999)
        const datePattern = /^(?:\d{2}[-\/]?\d{2}[-\/]?\d{2,4}|\d{4}[-\/]?\d{2}[-\/]?\d{2})$/;

        // Leetspeak pattern (e.g., p@ssw0rd, l33t)
        const leetPattern = /[a@4][s$5][s$5][wvv][o0][r][d]/i;

        // Simple reversal of common passwords
        const reversedCommon = commonPasswords.map(pw => pw.split('').reverse().join(''));

        // Character sets
        let poolSize = 0;
        let charsets = [];
        if (/[a-z]/.test(password)) { poolSize += 26; charsets.push('lowercase'); }
        if (/[A-Z]/.test(password)) { poolSize += 26; charsets.push('uppercase'); }
        if (/[0-9]/.test(password)) { poolSize += 10; charsets.push('digits'); }
        if (/[^A-Za-z0-9]/.test(password)) { poolSize += 32; charsets.push('special chars'); } // Approx 32 printable specials

        // Entropy
        const length = password.length;
        const entropyBits = length * Math.log2(poolSize || 1);

        // Brute-force guesses
        const guesses = Math.pow(poolSize || 1, length);

        // Time to crack
        let timeOnline = formatTime(guesses / 1_000); // 1K/sec
        let timeOffline = formatTime(guesses / 10_000_000_000); // 10B/sec

        // Risk level
        let riskLevel = "Low", riskColor = "#34D399";
        let warning = "";
        let instantCrack = false;

        // Dictionary check
        if (commonPasswords.includes(password.toLowerCase())) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
            warning = "This password is found in a common password list!";
            instantCrack = true;
        }
        // Keyboard pattern check
        else if (keyboardPatterns.some(pat => password.toLowerCase().includes(pat))) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
            warning = "This password matches a common keyboard pattern!";
            instantCrack = true;
        }
        // Name + year pattern
        else if (nameYearPattern.test(password)) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
            warning = "This password looks like a name followed by a year!";
            instantCrack = true;
        }
        // Repeated sequence
        else if (repeatedPattern.test(password)) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
            warning = "This password contains repeated sequences!";
            instantCrack = true;
        }
        // Date pattern
        else if (datePattern.test(password)) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
            warning = "This password looks like a date!";
            instantCrack = true;
        }
        // Leetspeak pattern
        else if (leetPattern.test(password)) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
            warning = "This password looks like a leetspeak version of a common word!";
            instantCrack = true;
        }
        // Reversed common password
        else if (reversedCommon.includes(password.toLowerCase())) {
            timeOnline = timeOffline = "<1 second";
            riskLevel = "High";
            riskColor = "#FF6B6B";
            warning = "This password is a reversed common password!";
            instantCrack = true;
        }
        // Entropy-based risk
        else if (entropyBits < 40) {
            riskLevel = "High";
            riskColor = "#FF6B6B";
        }
        else if (entropyBits < 60) {
            riskLevel = "Medium";
            riskColor = "#FACC15";
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
        return time.slice(0,2).join(", ");
    }
});
