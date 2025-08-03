from flask import Flask, redirect, url_for, request, flash, jsonify, send_from_directory, make_response, render_template, render_template_string
from flask_pymongo import PyMongo
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from datetime import datetime
from dotenv import load_dotenv
import requests
from PIL import Image
import io
import base64
import os

# load secrets and config from .env file
load_dotenv()

# setup the flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # should come from .env for better security
# hide API key
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')

mongo = PyMongo(app)

# setup login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# user model for flask-login
class User(UserMixin):
    def __init__(self, user_id, email, password):
        self.id = user_id
        self.email = email
        self.password = password

    @staticmethod
    def get(user_id):
        user_data = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if user_data:
            return User(str(user_data['_id']), user_data['email'], user_data['password'])
        return None

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

# signup route
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email').strip().lower()
        password = request.form.get('password')
        
        # check if email already exists
        existing_user = mongo.db.users.find_one({'email': email})
        if existing_user:
            flash('Email already registered. Please log in instead.', 'error')
            return redirect(url_for('signup'))  # stop here if duplicate

        # hash password and create new user
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = {
            'name': request.form.get('name'),
            'surname': request.form.get('surname'),
            'address': request.form.get('address'),
            'phone': request.form.get('phone'),
            'user_type': request.form.get('user_type'),
            'email': email,
            'password': hashed_password
        }
        result = mongo.db.users.insert_one(new_user)

        # log user in immediately
        user = User(str(result.inserted_id), new_user['email'], new_user['password'])
        login_user(user)

        return redirect(url_for('dashboard'))  # go straight to dashboard
    return render_template('signup.html')


# login route
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user_data = mongo.db.users.find_one({'email': email})

        if user_data:
            if check_password_hash(user_data['password'], password):
                user = User(str(user_data['_id']), user_data['email'], user_data['password'])
                login_user(user)
                return redirect(url_for('dashboard'))
            else:
                flash('Incorrect password. Please try again.', 'error')
        else:
            flash('Email not found. Please check your email address.', 'error')

    return render_template('login.html')


# logout route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

# dashboard and protected pages
@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/encrypted-notes')
@login_required
def encrypted_notes():
    return send_from_directory('pages', 'encrypted-notes.html')

@app.route('/cipher-playground')
@login_required
def cipher_playground():
    return send_from_directory('pages', 'cipher-playground.html')

# endpoint to get user info for frontend
@app.route('/api/user', methods=['GET'])
@login_required
def get_user_data():
    user_data = mongo.db.users.find_one({"_id": ObjectId(current_user.id)})
    if user_data:
        return jsonify({
            'name': user_data.get('name', 'user')
        })
    return jsonify({'error': 'user not found'}), 404

# encrypted notes api
@app.route('/api/notes', methods=['GET'])
@login_required
def get_notes():
    notes = list(mongo.db.notes.find({"user_id": current_user.id}))
    for note in notes:
        note['id'] = str(note['_id'])
        del note['_id']
    return jsonify(notes)

@app.route('/api/notes', methods=['POST'])
@login_required
def add_note():
    data = request.get_json()
    encrypted_note = data.get('encrypted_note')
    if not encrypted_note:
        return jsonify({'error': 'missing note'}), 400
    note = {
        'user_id': current_user.id,
        'encrypted_note': encrypted_note,
        'created_at': datetime.utcnow().isoformat()
    }
    mongo.db.notes.insert_one(note)
    return jsonify({'success': True})

@app.route('/api/notes/<note_id>', methods=['DELETE'])
@login_required
def delete_note(note_id):
    try:
        mongo.db.notes.delete_one({'_id': ObjectId(note_id), 'user_id': current_user.id})
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/notes/delete_all', methods=['DELETE'])
@login_required
def delete_all_notes():
    result = mongo.db.notes.delete_many({'user_id': current_user.id})
    return jsonify({'success': True, 'deleted_count': result.deleted_count})

# breach checker api with hibp
HIBP_API_KEY = os.getenv("HIBP_API_KEY")

@app.route('/check_breach', methods=['POST'])
@login_required
def check_breach():
    if not HIBP_API_KEY:
        return jsonify({"error": "server configuration error: api key missing."}), 500
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"error": "no email provided."}), 400
    hibp_url = f"https://haveibeenpwned.com/api/v3/breachedaccount/{email}"
    headers = {
        "hibp-api-key": HIBP_API_KEY,
        "User-Agent": "cybersafehub - cybersecurity awareness project",
        "Accept": "application/json"
    }
    try:
        response = requests.get(hibp_url, headers=headers)
        if response.status_code == 200:
            breaches = response.json()
            return jsonify({"status": "pwned", "breaches": breaches}), 200
        elif response.status_code == 404:
            return jsonify({"status": "not pwned"}), 200
        elif response.status_code == 401:
            print("hibp api error: invalid api key")
            return jsonify({"error": "authentication failed with hibp api."}), 500
        elif response.status_code == 403:
            print("hibp api error: forbidden (rate limit?)")
            return jsonify({"error": "rate limit exceeded or forbidden by hibp api."}), 429
        elif response.status_code == 429:
            print("hibp api error: too many requests")
            return jsonify({"error": "rate limit exceeded with hibp api. please try again later."}), 429
        else:
            print(f"hibp api error: status {response.status_code}, response: {response.text}")
            return jsonify({"error": f"error checking email with hibp api. status: {response.status_code}"}), response.status_code
    except requests.exceptions.RequestException as e:
        print(f"request error: {e}")
        return jsonify({"error": "could not connect to hibp api."}), 500
    except Exception as e:
        print(f"unexpected error: {e}")
        return jsonify({"error": "an internal server error occurred."}), 500

# steganography api
@app.route('/api/steg/encode', methods=['POST'])
@login_required
def steg_encode():
    if 'image' not in request.files or 'message' not in request.form:
        return jsonify({'error': 'image and message required'}), 400
    image_file = request.files['image']
    message = request.form['message']
    image = Image.open(image_file.stream)
    stego_image = lsb.hide(image, message)
    img_io = io.BytesIO()
    stego_image.save(img_io, format='PNG')
    img_io.seek(0)
    b64_img = base64.b64encode(img_io.read()).decode('utf-8')
    return jsonify({'stego_image': b64_img})

@app.route('/api/steg/decode', methods=['POST'])
@login_required
def steg_decode():
    if 'image' not in request.files:
        return jsonify({'error': 'image required'}), 400
    image_file = request.files['image']
    image = Image.open(image_file.stream)
    message = lsb.reveal(image)
    if message is None:
        return jsonify({'error': 'no hidden message found'}), 404
    return jsonify({'message': message})

# sitemap generator
SITEMAP_TEMPLATE = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {% for page in pages %}
    <url>
        <loc>{{ page.loc }}</loc>
        <lastmod>{{ page.lastmod }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    {% endfor %}
</urlset>"""

@app.route('/sitemap.xml')
def sitemap():
    public_pages = [
        'index.html', 'about.html', 'password.html', 'phishing.html',
        'url-checker.html', 'breach-checker.html', 'quiz.html',
        'url-reporter.html', 'steganography.html', 'login.html', 'signup.html'
    ]
    pages_for_sitemap = []
    lastmod_date = datetime.now().strftime('%Y-%m-%d')
    base_url = request.url_root
    for page_path in public_pages:
        url = base_url + page_path if page_path != 'index.html' else base_url
        pages_for_sitemap.append({
            "loc": url,
            "lastmod": lastmod_date
        })
    sitemap_xml = render_template_string(SITEMAP_TEMPLATE, pages=pages_for_sitemap)
    response = make_response(sitemap_xml)
    response.headers["Content-Type"] = "application/xml"
    return response

# serve index and other static pages
@app.route('/')
def index():
    return send_from_directory('pages', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    if filename.endswith('.html'):
        return send_from_directory('pages', filename)
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
