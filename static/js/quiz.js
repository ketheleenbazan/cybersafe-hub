// This is the full list of quiz questions the game can use
// each question has: the text, a list of answers, which one is correct, and an explanation

const allQuizQuestions = [
    {
        question: "What is a strong password?",
        answers: [
            "Your pet's name",
            "12345678",
            "A mix of letters, numbers, and symbols",
            "Your birthday"
        ],
        correct: 2,
        explanation: "A strong password uses a mix of letters, numbers, and symbols. Avoid using personal info or common words."
    },
    // ... more questions below (all same structure) ...
    {
        question: "What should you do if you receive an email from your bank asking for your password?",
        answers: [
            "Reply with your password",
            "Click the link and enter your details",
            "Ignore it or contact your bank directly",
            "Forward it to your friends"
        ],
        correct: 2,
        explanation: "Banks will never ask for your password by email. If unsure, contact your bank using official channels."
    },
    {
        question: "Which of these is a sign of a phishing email?",
        answers: [
            "Spelling mistakes and urgent language",
            "Email from a known contact",
            "Personalized greeting",
            "No links in the email"
        ],
        correct: 0,
        explanation: "Phishing emails often have spelling mistakes and try to create a sense of urgency."
    },
    {
        question: "Why should you avoid using the same password for multiple accounts?",
        answers: [
            "It's hard to remember",
            "If one account is hacked, others are at risk",
            "Websites require different passwords",
            "It takes too long to type"
        ],
        correct: 1,
        explanation: "If you reuse passwords and one site is hacked, attackers can access your other accounts."
    },
    {
        question: "What is two-factor authentication (2FA)?",
        answers: [
            "Using two passwords",
            "A security step that requires something you know and something you have",
            "Logging in from two devices",
            "Changing your password twice"
        ],
        correct: 1,
        explanation: "2FA means you need your password and a second step (like a code sent to your phone) to log in."
    },
    {
        question: "What should you do if you get a suspicious link in a text message?",
        answers: [
            "Click it to see what it is",
            "Ignore or delete the message",
            "Forward it to your friends",
            "Reply asking who sent it"
        ],
        correct: 1,
        explanation: "Never click suspicious links. Ignore or delete the message."
    },
    {
        question: "Which device is safest to use for online banking?",
        answers: [
            "A public computer at a library",
            "A friend's phone",
            "Your own device on a secure network",
            "Any device with internet"
        ],
        correct: 2,
        explanation: "Always use your own device on a secure network for sensitive activities."
    },
    {
        question: "What is a common sign of a fake website?",
        answers: [
            "A padlock icon in the address bar",
            "Strange web address and poor design",
            "Lots of information about security",
            "It loads quickly"
        ],
        correct: 1,
        explanation: "Fake websites often have odd addresses and look unprofessional."
    },
    {
        question: "If your friend sends you a strange message with a link, what should you do?",
        answers: [
            "Click the link immediately",
            "Ignore your friend",
            "Ask your friend if they really sent it",
            "Forward it to others"
        ],
        correct: 2,
        explanation: "Check with your friend before clicking suspicious links, even if they seem to come from someone you know."
    },
    {
        question: "What is the safest way to store your passwords?",
        answers: [
            "Write them on a sticky note",
            "Use a password manager",
            "Email them to yourself",
            "Use the same password everywhere"
        ],
        correct: 1,
        explanation: "A password manager is the safest way to store and manage your passwords."
    },
    {
        question: "What should you do before clicking a link in an email?",
        answers: [
            "Check where the link leads",
            "Click it quickly",
            "Forward it to a friend",
            "Ignore the email"
        ],
        correct: 0,
        explanation: "Always check where a link leads before clicking, especially in emails."
    },
    {
        question: "What is malware?",
        answers: [
            "A type of computer hardware",
            "A malicious software that can harm your device",
            "A safe program",
            "A password manager"
        ],
        correct: 1,
        explanation: "Malware is software designed to harm or exploit any programmable device or network."
    },
    {
        question: "Which of these is a good way to keep your software safe?",
        answers: [
            "Never update it",
            "Only use old versions",
            "Keep it updated with the latest patches",
            "Download updates from random websites"
        ],
        correct: 2,
        explanation: "Always keep your software updated to protect against security vulnerabilities."
    },
    {
        question: "What is phishing?",
        answers: [
            "A way to catch fish",
            "A scam to trick you into giving personal information",
            "A type of password",
            "A computer virus"
        ],
        correct: 1,
        explanation: "Phishing is a scam where attackers try to trick you into giving up sensitive information."
    },
    {
        question: "What should you do if you receive a suspicious email attachment?",
        answers: [
            "Open it to see what it is",
            "Delete the email or ask the sender to confirm",
            "Forward it to your friends",
            "Ignore it"
        ],
        correct: 1,
        explanation: "Never open suspicious attachments. Delete the email or confirm with the sender."
    },
    {
        question: "What is a firewall?",
        answers: [
            "A wall that stops fires",
            "A security system that controls incoming and outgoing network traffic",
            "A type of virus",
            "A password"
        ],
        correct: 1,
        explanation: "A firewall helps protect your device by controlling network traffic."
    },
    {
        question: "Why is it important to log out of accounts on shared computers?",
        answers: [
            "To save battery",
            "So others can't access your information",
            "To make the computer faster",
            "It's not important"
        ],
        correct: 1,
        explanation: "Logging out prevents others from accessing your accounts on shared devices."
    },
    {
        question: "What is a VPN?",
        answers: [
            "A type of virus",
            "A Virtual Private Network that helps protect your privacy online",
            "A password manager",
            "A social media app"
        ],
        correct: 1,
        explanation: "A VPN encrypts your internet connection and helps protect your privacy."
    },
    {
        question: "What should you do if a website asks for more information than necessary?",
        answers: [
            "Give all the information",
            "Only provide what's required",
            "Ignore the website",
            "Tell your friends"
        ],
        correct: 1,
        explanation: "Only provide the minimum information required to use a service."
    },
    {
        question: "What is the best way to create a memorable but strong password?",
        answers: [
            "Use your name and birthdate",
            "Use a phrase with numbers and symbols",
            "Use 'password123'",
            "Use your favorite color"
        ],
        correct: 1,
        explanation: "A phrase with numbers and symbols is both strong and memorable."
    },
    {
        question: "What is social engineering?",
        answers: [
            "Building social networks",
            "Tricking people into giving up confidential information",
            "Programming social media apps",
            "A type of firewall"
        ],
        correct: 1,
        explanation: "Social engineering is manipulating people to give up confidential information."
    },
    {
        question: "What should you do if your device is lost or stolen?",
        answers: [
            "Do nothing",
            "Change your passwords and report it",
            "Tell your friends",
            "Buy a new device"
        ],
        correct: 1,
        explanation: "Change your passwords and report the loss to protect your information."
    },
    {
        question: "What is the safest way to connect to public Wi-Fi?",
        answers: [
            "Connect without any protection",
            "Use a VPN",
            "Share your password with others",
            "Do online banking"
        ],
        correct: 1,
        explanation: "Use a VPN when connecting to public Wi-Fi to protect your data."
    },
    {
        question: "What is an example of personal information you should protect?",
        answers: [
            "Your favorite movie",
            "Your home address",
            "Your pet's name",
            "Your favorite color"
        ],
        correct: 1,
        explanation: "Protect sensitive information like your home address."
    },
    {
        question: "What is a scam?",
        answers: [
            "A fun game",
            "A dishonest scheme to trick people",
            "A type of software",
            "A password"
        ],
        correct: 1,
        explanation: "A scam is a dishonest scheme to trick people out of money or information."
    },
    {
        question: "What should you do if you receive a call asking for your password?",
        answers: [
            "Give your password",
            "Hang up and report the call",
            "Ask for their name",
            "Tell them your username"
        ],
        correct: 1,
        explanation: "Never give your password over the phone. Hang up and report the call."
    },
    {
        question: "What is a security update?",
        answers: [
            "A new game",
            "A fix for software vulnerabilities",
            "A password change",
            "A new device"
        ],
        correct: 1,
        explanation: "Security updates fix vulnerabilities and keep your device safe."
    },
    {
        question: "What is the purpose of antivirus software?",
        answers: [
            "To make your computer slower",
            "To protect your device from malware",
            "To delete your files",
            "To create passwords"
        ],
        correct: 1,
        explanation: "Antivirus software helps protect your device from malware and viruses."
    },
    {
        question: "What is a secure website address?",
        answers: [
            "http://",
            "https://",
            "ftp://",
            "www."
        ],
        correct: 1,
        explanation: "A secure website uses 'https://' which means the connection is encrypted."
    },
    {
        question: "What is a data breach?",
        answers: [
            "A new app",
            "When personal information is stolen from a company",
            "A password manager",
            "A type of firewall"
        ],
        correct: 1,
        explanation: "A data breach is when personal information is stolen from a company or website."
    },
    {
        question: "What should you do if you think your account has been hacked?",
        answers: [
            "Do nothing",
            "Change your password and contact support",
            "Tell your friends",
            "Delete your account"
        ],
        correct: 1,
        explanation: "Change your password and contact support if you think your account has been hacked."
    },
    {
        question: "What is a pop-up scam?",
        answers: [
            "A helpful message",
            "A fake window that tries to trick you",
            "A password manager",
            "A type of firewall"
        ],
        correct: 1,
        explanation: "Pop-up scams are fake windows that try to trick you into clicking or giving information."
    },
    {
        question: "What is the best way to check if an email is real?",
        answers: [
            "Check the sender's address and look for mistakes",
            "Click all the links",
            "Reply to the email",
            "Forward it to friends"
        ],
        correct: 0,
        explanation: "Check the sender's address and look for mistakes to spot fake emails."
    },
    {
        question: "What is a password manager?",
        answers: [
            "A person who remembers your passwords",
            "A tool that stores and creates strong passwords",
            "A type of virus",
            "A social media app"
        ],
        correct: 1,
        explanation: "A password manager is a tool that stores and creates strong passwords for you."
    },
    {
        question: "What is the risk of using public computers for sensitive tasks?",
        answers: [
            "No risk at all",
            "Others may access your information",
            "It's faster",
            "It's more secure"
        ],
        correct: 1,
        explanation: "Public computers can be unsafe for sensitive tasks because others may access your information."
    },
    {
        question: "What is a good practice for creating security questions?",
        answers: [
            "Use answers that are easy to guess",
            "Use fake answers only you know",
            "Use your real birthday",
            "Use your pet's name"
        ],
        correct: 1,
        explanation: "Use fake answers that only you know to make security questions harder to guess."
    },
    {
        question: "What is ransomware?",
        answers: [
            "A type of password",
            "Malware that locks your files and demands payment",
            "A security update",
            "A firewall"
        ],
        correct: 1,
        explanation: "Ransomware is malware that locks your files and demands payment to unlock them."
    },
    {
        question: "What is the safest way to download apps?",
        answers: [
            "From official app stores",
            "From random websites",
            "From email links",
            "From social media"
        ],
        correct: 0,
        explanation: "Always download apps from official app stores to avoid malware."
    },
    {
        question: "What is a digital footprint?",
        answers: [
            "Your shoe size",
            "The information you leave online",
            "A type of virus",
            "A password"
        ],
        correct: 1,
        explanation: "Your digital footprint is the information you leave behind when using the internet."
    },
    {
        question: "What is the best way to protect your social media accounts?",
        answers: [
            "Use strong passwords and enable 2FA",
            "Share your password with friends",
            "Use your name as your password",
            "Never log out"
        ],
        correct: 0,
        explanation: "Use strong passwords and enable two-factor authentication to protect your accounts."
    },
    {
        question: "What is a scammer likely to do?",
        answers: [
            "Offer you free money",
            "Ask for your personal information",
            "Threaten you with urgent messages",
            "All of the above"
        ],
        correct: 3,
        explanation: "Scammers may use all these tricks to get your information or money."
    },
    {
        question: "What is the best way to handle suspicious emails?",
        answers: [
            "Open all attachments",
            "Click all links",
            "Delete or report them",
            "Reply with your information"
        ],
        correct: 2,
        explanation: "Delete or report suspicious emails. Never click links or open attachments."
    }
];

//little helper to shuffle questions randomly so the quiz feels different each time
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// variables to keep track of the quiz state
let quizQuestions = [];   // stores the actual set of 5 questions for this game
let userAnswers = [];     // stores what the user picked for each question
let currentQuestion = 0;  // index of the question we’re currently on

// grab references to elements in the page
const questionDiv = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const feedbackDiv = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreDiv = document.getElementById('score');

// create a "Previous" button so the user can go back
const prevBtn = document.createElement('button');
prevBtn.id = 'prev-btn';
prevBtn.textContent = 'Previous';
prevBtn.style.marginRight = '1em';

// function to start the quiz
function startQuiz() {
    quizQuestions = shuffle([...allQuizQuestions]).slice(0, 5); // pick 5 random questions
    userAnswers = Array(quizQuestions.length).fill(null); // reset answers
    currentQuestion = 0;
    scoreDiv.innerHTML = '';
    showQuestion(); // show the first question
}

// show the current question and its answers
function showQuestion() {
    feedbackDiv.textContent = '';
    answersDiv.innerHTML = '';
    questionDiv.textContent = `Q${currentQuestion + 1}: ${quizQuestions[currentQuestion].question}`;

    // create buttons for each possible answer
    quizQuestions[currentQuestion].answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.className = 'answer-btn';
        btn.style.display = 'block';
        btn.style.margin = '0.5em 0';
        btn.onclick = () => selectAnswer(idx);

        // if user already answered, highlight their previous choice
        if (userAnswers[currentQuestion] === idx) {
            btn.style.background = '#005fa3';
            btn.style.color = '#fff';
        }

        answersDiv.appendChild(btn);
    });

    //set up the "Next" button
    nextBtn.style.display = 'inline-block';
    nextBtn.textContent = (currentQuestion === quizQuestions.length - 1) ? 'See Results' : 'Next';
    nextBtn.disabled = userAnswers[currentQuestion] === null;

    //only show the Previous button if we’re not on the first question
    if (currentQuestion > 0) {
        if (!answersDiv.contains(prevBtn)) {
            answersDiv.prepend(prevBtn);
        }
        prevBtn.style.display = 'inline-block';
    } else {
        prevBtn.style.display = 'none';
    }

    //if they already answered, show the feedback again
    if (userAnswers[currentQuestion] !== null) {
        showFeedback(userAnswers[currentQuestion]);
    }
}

//handles what happens when a user selects an answer
function selectAnswer(idx) {
    userAnswers[currentQuestion] = idx;

    //highlight the button the user chose
    Array.from(answersDiv.children).forEach((btn, i) => {
        if (btn.className === 'answer-btn') {
            btn.style.background = (i === idx) ? '#005fa3' : '#0074D9';
            btn.style.color = '#fff';
        }
    });

    nextBtn.disabled = false; // allow moving forward
    showFeedback(idx);        // show if they were right or wrong
}

// show feedback ("Correct!" or "Incorrect.") plus explanation
function showFeedback(selected) {
    const q = quizQuestions[currentQuestion];
    if (selected === q.correct) {
        feedbackDiv.innerHTML = `<span style="color:green;">Correct!</span> ${q.explanation}`;
    } else {
        feedbackDiv.innerHTML = `<span style="color:red;">Incorrect.</span> ${q.explanation}`;
    }
}

// move forward when clicking Next
nextBtn.onclick = () => {
    if (userAnswers[currentQuestion] === null) {
        feedbackDiv.innerHTML = `<span style="color:red;">Please select an answer before proceeding.</span>`;
        return;
    }
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showScore();
    }
};

// go back when clicking Previous
prevBtn.onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
};

// after the last question, show the score
function showScore() {
    const score = userAnswers.reduce((acc, ans, idx) => acc + (ans === quizQuestions[idx].correct ? 1 : 0), 0);
    let scoreColor = '';
    let feedbackMsg = '';

    if (score <= 2) {
        scoreColor = 'var(--score-red)';
        feedbackMsg = "Don't worry! Review the questions and try again. Practice makes perfect!";
    } else if (score === 3) {
        scoreColor = 'var(--score-yellow)';
        feedbackMsg = "Good effort! You're getting there. Review the material and try for a higher score!";
    } else if (score >= 4) {
        scoreColor = 'var(--score-green)';
        feedbackMsg = "Excellent! You're a CyberSafe star! 🌟";
    }

    // clear quiz elements and show the results
    questionDiv.textContent = '';
    answersDiv.innerHTML = '';
    feedbackDiv.textContent = '';
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';

    scoreDiv.innerHTML = `
        <h3 style="color:${scoreColor};">Your Score: ${score} / ${quizQuestions.length}</h3>
        <p style="color:${scoreColor}; font-weight:bold;">${feedbackMsg}</p>
        <button id="restart-btn">Try Again</button>
    `;
    document.getElementById('restart-btn').onclick = startQuiz;
}

// make sure Previous button is placed in DOM
if (!document.getElementById('prev-btn')) {
    nextBtn.parentNode.insertBefore(prevBtn, nextBtn);
}

// start the quiz right away
startQuiz();