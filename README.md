# CyberSafe Hub

Designed to assist digital novices and non-technical users to understand online threats, CyberSafe Hub is an interactive cybersecurity awareness website with a gamified approach to cybersecurity education. It offers practical lessons through hands-on tools and games as well as transformative educational resources, breaking down sophisticated ideas in cybersecurity. The platform particularly targets students and seniors, using engaging approaches to help users understand online safety.

---

## Live Demo

View and share the site using **GitHub Pages**:  
https://ketheleenbazan.github.io/cybersafe-hub/

---

## Features

- **Password Strength Checker:**  
  - Clear instructions for creating strong passwords.
  - Input field and "Check Password" button.
  - Real-time, color-coded feedback and suggestions for improvement.
  - Detects common patterns and provides actionable tips.

- **🔐 Password Attack Simulator (Exclusive Feature!):**  
  - Enter any password to see how long it would take to crack using real-world attack strategies.
  - **Brute-force Estimation:** Calculates time to crack based on password length and character set (upper/lowercase, digits, special characters).
  - **Dictionary & Pattern Checks:** Instantly detects if the password is found in a common wordlist, matches keyboard patterns, dates, repeated sequences, leetspeak, or reversed common passwords.
  - **Risk Level Analysis:** Clearly shows if your password is Low, Medium, or High risk.
  - **Animated Attack Simulation:** Visually demonstrates a brute-force attack, making password security tangible and engaging.
  - 100% custom logic (no third-party APIs) and real-time feedback.

- **Phishing Awareness Game:**  
  - Practice spotting phishing emails with 30+ realistic, interactive examples.
  - Each game session presents 5 random emails.
  - Mimics real email formatting for authenticity.
  - Instant feedback and explanations for each answer.

- **Cybersecurity Quiz Game:**  
  - Test your knowledge with a fun, beginner-friendly quiz.
  - Each game presents 5 random questions from a pool of 40+.
  - Previous/Next navigation, answer changing, and color-coded score feedback.
  - Play again for new random questions.

- **Fake URL Detector:**  
  - Input a website address (URL) to check for common signs of phishing or suspicious links.
  - Uses basic checks for IP addresses, excessive subdomains, and common misspellings.
  - Provides instant feedback on potential risks.

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
