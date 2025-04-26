const allPhishingExamples = [
    // 30 EXAMPLES: Mix of phishing and not phishing, realistic and varied
    {
        subject: "Your Account Will Be Closed!",
        from: "support@yourbannk.com",
        body: `Dear Customer,<br><br>Your account will be closed in 24 hours unless you confirm your details.<br><a href="#">Click here to login</a>.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is suspicious and they're trying to scare you into clicking a link."
    },
    {
        subject: "Order Confirmation",
        from: "orders@amaz0n.com",
        body: `Thank you for your purchase! If you did not make this order, <a href="#">click here to cancel</a>.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is fake (amaz0n.com) and the link could be dangerous."
    },
    {
        subject: "Family Photos",
        from: "yourfriend@gmail.com",
        body: `Hey! Check out these photos from our trip! <a href="#">Download here</a>.`,
        isPhishing: false,
        explanation: "This is probably not phishing, but always be careful with unexpected links, even from friends. If you weren't expecting this, double-check with your friend before clicking."
    },
    {
        subject: "Security Alert: New Login Detected",
        from: "security@yourbank.com",
        body: `We detected a new login to your account. If this was not you, <a href="#">reset your password here</a>.`,
        isPhishing: true,
        explanation: "This is likely phishing. Even if the sender looks real, never click links in unexpected security emails. Go directly to your bank's website."
    },
    {
        subject: "Welcome to Our Newsletter!",
        from: "newsletter@trustedsite.com",
        body: `Thank you for subscribing to our newsletter. No action is needed.`,
        isPhishing: false,
        explanation: "This is not phishing. It's a typical welcome email with no suspicious links or urgent requests."
    },
    {
        subject: "Unusual Activity Detected",
        from: "alert@paypall.com",
        body: `We've noticed unusual activity on your account. Please <a href="#">verify your identity</a> to avoid suspension.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is misspelled (paypall.com) and asks you to verify your identity via a link."
    },
    {
        subject: "Invoice Attached",
        from: "billing@company.com",
        body: `Please see the attached invoice for your recent purchase.<br><a href="#">Download Invoice</a>`,
        isPhishing: true,
        explanation: "This is likely phishing. Unexpected invoices with download links are a common trick."
    },
    {
        subject: "Password Change Successful",
        from: "no-reply@yourbank.com",
        body: `Your password was changed successfully. If this wasn't you, contact us immediately.`,
        isPhishing: false,
        explanation: "This is a standard notification. It doesn't ask you to click any links or provide information."
    },
    {
        subject: "You've Won a Free iPhone!",
        from: "promo@freeprizes.com",
        body: `Congratulations! You've won a free iPhone. <a href="#">Claim your prize now</a>.`,
        isPhishing: true,
        explanation: "This is phishing. Promises of free prizes are a classic scam tactic."
    },
    {
        subject: "Your Tax Refund Is Ready",
        from: "taxoffice@gov-uk.com",
        body: `You are eligible for a tax refund. <a href="#">Submit your details</a> to receive your money.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is fake and asks for personal details."
    },
    {
        subject: "Meeting Tomorrow",
        from: "colleague@company.com",
        body: `Hi, just a reminder about our meeting tomorrow at 10am. Let me know if you need to reschedule.`,
        isPhishing: false,
        explanation: "This is a normal work email with no suspicious links or requests."
    },
    {
        subject: "Update Your Payment Information",
        from: "support@netfliix.com",
        body: `Your payment information needs to be updated. <a href="#">Click here to update</a>.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is misspelled (netfliix.com) and asks for payment info."
    },
    {
        subject: "Your Package Is On The Way",
        from: "tracking@shippingcompany.com",
        body: `Your package is on its way! Track it here: <a href="#">Track Package</a>`,
        isPhishing: false,
        explanation: "This is likely not phishing if you are expecting a package, but always check the sender and link."
    },
    {
        subject: "Action Required: Account Verification",
        from: "verify@bank-secure.com",
        body: `We need to verify your account information. <a href="#">Verify now</a> to avoid suspension.`,
        isPhishing: true,
        explanation: "This is phishing. Banks do not ask for verification via email links."
    },
    {
        subject: "Charity Donation Request",
        from: "help@charity4kids.com",
        body: `Please help children in need. <a href="#">Donate now</a>.`,
        isPhishing: true,
        explanation: "This is likely phishing. Unsolicited donation requests with links are suspicious."
    },
    {
        subject: "Your Subscription Has Been Renewed",
        from: "no-reply@musicstream.com",
        body: `Your subscription has been renewed. No action is required.`,
        isPhishing: false,
        explanation: "This is a standard notification. No links or requests for information."
    },
    {
        subject: "Important: Account Suspension Notice",
        from: "admin@apple-support.com",
        body: `Your Apple account will be suspended unless you <a href="#">confirm your details</a>.`,
        isPhishing: true,
        explanation: "This is phishing. Apple does not send such emails and the sender's address is fake."
    },
    {
        subject: "Weekly Newsletter",
        from: "newsletter@trustedsource.com",
        body: `Here's your weekly newsletter. Enjoy reading!`,
        isPhishing: false,
        explanation: "This is a normal newsletter with no suspicious content."
    },
    {
        subject: "Urgent: Confirm Your Email",
        from: "security@micros0ft.com",
        body: `We need you to confirm your email address. <a href="#">Confirm now</a>.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is misspelled (micros0ft.com)."
    },
    {
        subject: "Happy Birthday!",
        from: "friend@outlook.com",
        body: `Happy Birthday! Hope you have a wonderful day!`,
        isPhishing: false,
        explanation: "This is a friendly message with no suspicious links or requests."
    },
    {
        subject: "COVID-19 Relief Fund",
        from: "relief@covid19-support.com",
        body: `You are eligible for relief funds. <a href="#">Apply now</a>.`,
        isPhishing: true,
        explanation: "This is phishing. Unsolicited offers for relief funds are often scams."
    },
    {
        subject: "Your Receipt from Grocery Store",
        from: "receipts@grocerystore.com",
        body: `Thank you for shopping with us. Your receipt is attached.`,
        isPhishing: false,
        explanation: "This is a normal receipt email if you recently shopped there."
    },
    {
        subject: "Reset Your Password",
        from: "reset@secure-facebook.com",
        body: `We received a request to reset your password. <a href="#">Reset now</a>.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is not official and asks you to click a link."
    },
    {
        subject: "Conference Invitation",
        from: "events@university.edu",
        body: `You are invited to our annual conference. RSVP here: <a href="#">RSVP</a>`,
        isPhishing: false,
        explanation: "This is a normal invitation if you are associated with the university."
    },
    {
        subject: "Payment Received",
        from: "payments@paypal.com",
        body: `You have received a payment. No action is required.`,
        isPhishing: false,
        explanation: "This is a standard notification with no suspicious links."
    },
    {
        subject: "Update Required: Email Settings",
        from: "admin@emaillprovider.com",
        body: `Your email settings need to be updated. <a href="#">Update now</a>.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is misspelled (emaillprovider.com)."
    },
    {
        subject: "Job Opportunity",
        from: "recruiter@jobsearch.com",
        body: `We found your resume online. Please reply if interested.`,
        isPhishing: false,
        explanation: "This could be legitimate, but always verify the sender and never provide sensitive info."
    },
    {
        subject: "Bank Statement Ready",
        from: "statements@yourbank.com",
        body: `Your monthly bank statement is ready. Log in to your account to view it.`,
        isPhishing: false,
        explanation: "This is a standard notification. No links or requests for information."
    },
    {
        subject: "Action Needed: Confirm Your Account",
        from: "confirm@amazn-support.com",
        body: `Please confirm your account to continue using our services. <a href="#">Confirm now</a>.`,
        isPhishing: true,
        explanation: "This is phishing. The sender's address is misspelled (amazn-support.com)."
    },
    {
        subject: "Your Friend Tagged You in a Photo",
        from: "notification@facebook.com",
        body: `Your friend tagged you in a photo. <a href="#">View photo</a>`,
        isPhishing: false,
        explanation: "This is a standard notification if you use Facebook, but always check the sender."
    }
];

// Utility to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let phishingExamples = [];
let phishingCurrent = 0;
let phishingScore = 0;

function startPhishingGame() {
    phishingExamples = shuffle([...allPhishingExamples]).slice(0, 5);
    phishingCurrent = 0;
    phishingScore = 0;
    renderPhishingExample();
}

function renderPhishingExample() {
    const container = document.getElementById('phishing-game-container');
    const scoreDiv = document.getElementById('phishing-score');
    scoreDiv.innerHTML = '';
    if (phishingCurrent >= phishingExamples.length) {
        container.innerHTML = `
            <h3>Game Over!</h3>
            <p style="color:${phishingScore >= 4 ? '#34D399' : phishingScore === 3 ? '#FACC15' : '#FF6B6B'}; font-weight:bold;">
                Your Score: ${phishingScore} / ${phishingExamples.length}
            </p>
            <button id="phishing-restart-btn" class="phishing-btn">Play Again</button>
        `;
        document.getElementById('phishing-restart-btn').onclick = startPhishingGame;
        return;
    }
    const ex = phishingExamples[phishingCurrent];
    container.innerHTML = `
        <div class="phishing-email-card">
            <div class="phishing-email-header">
                <strong>Subject:</strong> ${ex.subject}<br>
                <strong>From:</strong> ${ex.from}
            </div>
            <div class="phishing-email-body" style="margin:1em 0;">${ex.body}</div>
        </div>
        <div class="phishing-game-actions">
            <button class="phishing-btn" id="phishing-yes">Phishing</button>
            <button class="phishing-btn" id="phishing-no">Not Phishing</button>
        </div>
        <div id="phishing-feedback"></div>
    `;
    document.getElementById('phishing-yes').onclick = () => handlePhishingAnswer(true);
    document.getElementById('phishing-no').onclick = () => handlePhishingAnswer(false);
}

function handlePhishingAnswer(userChoice) {
    const ex = phishingExamples[phishingCurrent];
    const feedbackDiv = document.getElementById('phishing-feedback');
    let correct = (userChoice === ex.isPhishing);
    if (correct) phishingScore++;
    feedbackDiv.innerHTML = `
        <span style="color:${correct ? '#34D399' : '#FF6B6B'}; font-weight:bold;">
            ${correct ? 'Correct!' : 'Incorrect.'}
        </span> ${ex.explanation}
        <br><button class="phishing-btn" id="phishing-next">Next</button>
    `;
    document.getElementById('phishing-yes').disabled = true;
    document.getElementById('phishing-no').disabled = true;
    document.getElementById('phishing-next').onclick = () => {
        phishingCurrent++;
        renderPhishingExample();
    };
}

// Start the first game
startPhishingGame();
