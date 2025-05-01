import os
from flask import Flask, request, jsonify
import requests
from dotenv import load_dotenv
from flask_cors import CORS  

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # <-- And this line


# Get API key from environment variables
HIBP_API_KEY = os.getenv("HIBP_API_KEY")

# Check if API key is loaded
if not HIBP_API_KEY:
    print("Error: HIBP_API_KEY not found in environment variables or .env file.")
    # You might want to handle this more gracefully in a production app

@app.route('/check_breach', methods=['POST'])
def check_breach():
    """
    Receives an email, calls HIBP API, and returns results.
    """
    if not HIBP_API_KEY:
        return jsonify({"error": "Server configuration error: API key missing."}), 500

    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "No email provided."}), 400

    # HIBP API endpoint for breached accounts
    hibp_url = f"https://haveibeenpwned.com/api/v3/breachedaccount/{email}"

    # Set headers, including the API key and a user agent
    headers = {
        "hibp-api-key": HIBP_API_KEY,
        "User-Agent": "CyberSafeHub - Cybersecurity Awareness Project",
        "Accept": "application/json"
    }

    try:
        # Make the GET request to the HIBP API
        response = requests.get(hibp_url, headers=headers)

        # Handle different response statuses
        if response.status_code == 200:
            # Account found in breaches
            breaches = response.json()
            return jsonify({"status": "pwned", "breaches": breaches}), 200
        elif response.status_code == 404:
            # Account not found in any breaches
            return jsonify({"status": "not pwned"}), 200
        elif response.status_code == 401:
            # Invalid API key
            print("HIBP API Error: Invalid API key.")
            return jsonify({"error": "Authentication failed with HIBP API."}), 500
        elif response.status_code == 403:
             # Forbidden (e.g., rate limit exceeded)
             print("HIBP API Error: Forbidden (Rate limit?).")
             return jsonify({"error": "Rate limit exceeded or forbidden by HIBP API."}), 429 # Too Many Requests
        elif response.status_code == 429:
             # Too Many Requests (rate limit)
             print("HIBP API Error: Too Many Requests.")
             return jsonify({"error": "Rate limit exceeded with HIBP API. Please try again later."}), 429
        else:
            # Other API errors
            print(f"HIBP API Error: Status Code {response.status_code}, Response: {response.text}")
            return jsonify({"error": f"Error checking email with HIBP API. Status: {response.status_code}"}), response.status_code

    except requests.exceptions.RequestException as e:
        # Handle network or request errors
        print(f"Request Error: {e}")
        return jsonify({"error": "Could not connect to HIBP API."}), 500
    except Exception as e:
        # Catch any other unexpected errors
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 7000))
    app.run(debug=False, host="0.0.0.0", port=port)

