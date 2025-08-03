# CyberSafe Hub

Designed to assist digital novices and non-technical users to understand online threats, CyberSafe Hub is an interactive cybersecurity awareness website with a gamified approach to cybersecurity education. It offers practical lessons through hands-on tools and games as well as transformative educational resources, breaking down sophisticated ideas in cybersecurity. The platform particularly targets students and seniors, using engaging approaches to help users understand online safety.

---

## Live Demo

View and share the site using **Heroku**:  
https://cybersafe-hub-762e7d7f2358.herokuapp.com/index.html

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
  - A responsive algorithm checks and validates email addresses against data breaches to ascertain if it has potentially compromised email databases.
  - Interoperates with the Have I Been Pwned API.

- Results include:
  - A tally of breached accounts or databases.
  - Associated accounts or databases.
  - Actionable recommendations (e.g., suggest a password change).

- Part of the infrastructure is given with heroku, the backend is hosted securely with heroku, and programmed in flask.

  - Enter your email address to check if it has appeared in any known data breaches.
  - Uses a secure Flask backend (deployed on Heroku) to call the Have I Been Pwned API.
  - Real-time, actionable feedback with a list of breached sites if found.
  - **Test the backend directly with Postman:**  
    - **POST** to https://cybersafe-hub-762e7d7f2358.herokuapp.com/breach-checker.html 
    - Body (raw JSON):  
      ```json
      { "email": "ketheleenbazan@gmail.com" }
      ```
- **Encrypted Notes Vault:**  
  - Create personal notes that are stored privately and securely in a digital vault using AES software encoding.
  - Notes are stored in a database encrypted as ciphertext, and only decrypted with a user’s secret passphrase, ensuring the server remains blind to the contents.
  - Demonstrated the use of modern encryption techniques in practical scenarios.

- **Cipher Builder:**  
  - Hands-on learning with classic encryption:
  - Caesar Cipher.
  - Vigenère Cipher.
  - Applying personal secret codes, users can encrypt and decrypt text.
  - Learn cryptography through active engagement with key principles.

- **Threat Library:**  
  - Guides Focused On Risk Categories Above:
    - Phishing
    - Ransomware
    - Malware
    - Social Engineering
    - Risks In Wi-Fi
    - Privacy & Data Protection Information Focused On GDPR
  - Each entry features clarifying definitions, case studies, visuals, preventative measures, and more.
  - Great for peer educators and community educators.

---

## Tech Stack

  - Frontend: HTML5, CSS3 (custom palette: navy, teal, green, yellow, red, white), JavaScript.
  - Backend: Python Flask (for login, notes, breach checker).
  - Database: MongoDB Atlas (secure cloud storage).
  - Encryption: AES (CryptoJS), Stegano & PIL for steganography.
  - Deployment: GitHub Pages (frontend), Heroku (backend).
  - APIs: Have I Been Pwned.

---

## Getting Started

1. **Clone or download this repository.**
  ```bash git clone https://github.com/ketheleenbazan/cybersafe-hub.git
  cd cybersafe-hub
  ```
2. **Install required dependencies:**
  ```bash
  pip install -r requirements.txt
  ```
3. **Run the Flask app:**
  ```bash
  python app.py
  ```
4. **Access the app at `http://localhost:8000` in your browser.**

---

## Deploying to Heroku and GitHub repo

- Heroku 
  - Push your project to Heroku using Git.
  - Heroku hosts both the frontend and backend, ensuring smooth integration of Flask services and the static frontend pages.
  - GitHub is used as a repository to manage and store the project files, not for serving the live app.

---

## Navigation
- The top navigation bar provides links to all sections of the site.
- On smaller screens, a simple breadcrumb shows your current location.

---

## Accessibility & Usability

- Designed for users with zero technical background.
- Uses plain English and clear instructions.
- Responsive and mobile-friendly layout.
- High-contrast colors and readable fonts for accessibility.
- Footer remains at the bottom of every page.
- Keyboard navigation for all features.

---

## Project Goals

  - Equip the users with knowledge and skills to identify and evade basic cyber threats.
  - Present cybersecurity concepts in concise and captivating ways.
- offer and grant access to the resource with no restrictions to:
    - Educational institutions
    - Public or community libraries
    - Community resource centers
    - Parents and families.
    - Foster stronger hygiene practices for users. 

---

## License

This project is open source and free to use for educational purposes.

---
## Motivation ❤️

This project is dedicated to my grandparents, who often struggled with phishing emails, scams, and confusing security warnings. I wanted to create a safe, approachable space where people like them — and all digital beginners — can learn how to stay secure online with confidence.

