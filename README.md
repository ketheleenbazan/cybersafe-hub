# CyberSafe Hub

Designed to assist digital novices and non-technical users to understand online threats, CyberSafe Hub is an interactive cybersecurity awareness website with a gamified approach to cybersecurity education. It offers practical lessons through hands-on tools and games as well as transformative educational resources, breaking down sophisticated ideas in cybersecurity. The platform particularly targets students and seniors, using engaging approaches to help users understand online safety.

---

## Live Demo

View and share the site using **GitHub Pages**:  
https://ketheleenbazan.github.io/cybersafe-hub/

---

## Features

- **Password Strength Checker:**  
  - Instantly processes any password entered.
  - Instant feedback using colors green, yellow, and red.
  - Provides feedback on how to improve weaker passwords.
  - Identifies common weak patterns like the birthdays, names, or sequences that are easy to guess.
  - Nothing but clear, simple, and non-technical explanations.

- **Password Attack Simulator (Exclusive Feature!):**  
  - Demonstrates how long it takes for a hacker to crack passwords using brute-force methods.
  - Computes how long it would take to crack a password based on its length, entropy, and diversity of characters.
  - Detects common dictionary words, simple numeric sequences like 1234, or common patterns.
  - Shows simple yet effective explanations using animations of brute-force methods so that users understand how attackers operate.
  - The system also gives risk ratings of High, Medium, or Low.
  - Custom brute-force risk detection logic with no third-party dependencies.

- **Phishing Awareness Game:**  
  - Phishing Awareness Game consists of 30+ realistic Phishing emails that are designed to be interactive.
  - Phishing: users must identify whether each email presented to them is real, computer-generated, or contains phishing content. Automated, tailored explanations of each evaluation are given right after scoring.
  - Realistic stimulation: the messages are crafted to resemble genuine email threads, increasing the difficulty of the task.

- **Cybersecurity Quiz Game:**  
  - Playful evaluation to reinforce previously learned material.
  - Players are given five questions per session, drawn from a database of more than 40 questions.
  - Questions can be answered in any order, and participants can change their responses at any time.
  - Results are presented in a score report, associating each question with color-coded performance levels, enabling users to easily gauge their results.
  - Sessions are replayable and yield different questions with each attempt.

- **Fake URL Detector:**  
  - Examining potentially dangerous links.
  - URL evaluation is done in real-time and the results are processed instantly.
  - Flagged content includes:
    - Dashes or other distinct characters prior to or after the web addressIP.
    - Addresses that are not in the standard format.
    - Domains that do not qualify as brand names (ex. “Brand 100” could be shortened to “bg100” or “b100”).
    - Brand names with the “.com” extension.
    - Ports that are not secured (missing HTTPS).
    - Can be annotated with explanations.
  - Classification ranges from green, yellow, and red, or red as a predefined warning with rationale.

- **Email Breach Checker (Real API Integration!):**  
  - Enter your email address to check if it has appeared in any known data breaches.
  - Uses a secure Flask backend (deployed on Heroku) to call the Have I Been Pwned API.
  - Real-time, actionable feedback with a list of breached sites if found.
  - **Test the backend directly with Postman:**  
    - **POST** to `https://cybersafe-hub-762e7d7f2358.herokuapp.com/check_breach`  
    - Body (raw JSON):  
      ```json
      { "email": "your@email.com" }
      ```
- **Encrypted Notes Vault:**  
  - Encrypt and decrypt notes using AES.
  - Notes are saved locally or optionally in Firebase.

- **Cipher Builder:**  
  - Experiment with ciphers (Caesar, Vigenère).
  - Encrypt or decrypt text with custom keys.

- **Threat Library:**  
  - Browse topics like ransomware, phishing, social engineering, Wi-Fi risks, GDPR, and more.
  - Content includes images, text, videos, and links.

---

## Getting Started

1. **Clone or download this repository.**
2. **Open `index.html` in your web browser** to use locally.
3. **Or deploy to GitHub Pages** for a live, shareable version (see below).

---

## Deploying to GitHub Pages

1. **Create a GitHub repository** and push your project files.
2. Go to your repo’s **Settings > Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Click **Save** and wait for your site link to appear.

---

## Navigation

- The top navigation bar provides links to all sections of the site.
- On smaller screens, a simple breadcrumb shows your current location.

---

## Tech Stack

- HTML
- CSS (custom palette: navy, teal, green, yellow, red, white)
- JavaScript
- Python (Flask backend for breach checker)
- Heroku (backend deployment)

---

## Accessibility & Usability

- Designed for users with zero technical background.
- Uses plain English and clear instructions.
- Responsive and mobile-friendly layout.
- High-contrast colors and readable fonts for accessibility.
- Footer remains at the bottom of every page.

---

## Project Goals

- Empower everyday users to recognize and avoid common cyber threats.
- Make cybersecurity education approachable, practical, and fun.
- Provide a resource suitable for schools, libraries, community centers, and home use.

---

## License

This project is open source and free to use for educational purposes.

---

*Created as part of a digital literacy and cybersecurity education initiative.*
