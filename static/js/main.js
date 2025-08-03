// just a welcome message so you know the script is running
console.log("Welcome to CyberSafe Hub!");


// ----------------------
// cyber lab expand/collapse on the homepage feature section
// ----------------------
document.addEventListener('DOMContentLoaded', function() {
    // look for the Cyber Lab feature button (the big box on the homepage)
    var cyberBtn = document.querySelector('.feature-btn.cyberlab-expand-btn');
    // find the little arrow inside the button (so we can flip it up/down)
    var arrow = cyberBtn ? cyberBtn.querySelector('.cyberlab-arrow') : null;

    if (cyberBtn) {
        // function that changes the arrow depending on if it's open or closed
        function setArrow() {
            if (cyberBtn.classList.contains('active')) {
                arrow.innerHTML = '&#x25BC;'; // ▼ arrow points down when expanded
            } else {
                arrow.innerHTML = '&#x25B2;'; // ▲ arrow points up when closed
            }
        }

        // when the user clicks the Cyber Lab box
        cyberBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // stops click from affecting other things
            cyberBtn.classList.toggle('active'); // add/remove 'active' class
            setArrow(); // update the arrow accordingly
        });

        // if the user clicks anywhere else on the page, close the Cyber Lab section
        document.addEventListener('click', function() {
            cyberBtn.classList.remove('active');
            setArrow();
        });

        // make it work with keyboard as well (for accessibility)
        cyberBtn.addEventListener('keydown', function(e) {
            if (e.key === "Enter" || e.key === " ") { // pressing enter or space toggles it
                e.preventDefault();
                cyberBtn.classList.toggle('active');
                setArrow();
            }
            if (e.key === "Escape") { // pressing escape always closes it
                cyberBtn.classList.remove('active');
                setArrow();
            }
        });

        // set the arrow correctly on page load
        setArrow();
    }
});


// ----------------------
// cyber lab dropdown in the top navigation bar
// ----------------------
document.addEventListener('DOMContentLoaded', function() {
    // find the dropdown menu and the button that opens it
    var dropdown = document.getElementById('cyberlab-dropdown');
    var dropbtn = document.getElementById('cyberlab-dropbtn');

    if (dropdown && dropbtn) {
        // when the user clicks the "Cyber Lab" menu button
        dropbtn.addEventListener('click', function(e) {
            e.stopPropagation(); // don’t trigger other click events
            dropdown.classList.toggle('show'); // add/remove the 'show' class
        });

        // close the dropdown if the user clicks anywhere else
        document.addEventListener('click', function() {
            dropdown.classList.remove('show');
        });

        // keyboard support for the dropdown
        dropbtn.addEventListener('keydown', function(e) {
            if (e.key === "Enter" || e.key === " ") { // enter/space opens/closes
                e.preventDefault();
                dropdown.classList.toggle('show');
            }
            if (e.key === "Escape") { // escape closes it
                dropdown.classList.remove('show');
            }
        });
    }
});


// ----------------------
// login/logout button logic
// ----------------------
document.addEventListener('DOMContentLoaded', function() {
    const authBtn = document.getElementById('auth-btn'); // find the login/logout button

    // if there’s no auth button on the page, we stop
    if (!authBtn) return;

    // check if the user is logged in by asking the server
    fetch('/api/user')
        .then(res => res.json()) // turn the response into a JS object
        .then(data => {
            if (data && data.name) {
                // if the server sends back a user with a name, we assume they’re logged in
                authBtn.textContent = 'Logout'; // change button to say "Logout"
                authBtn.href = '/logout'; // link it to the logout route
            } else {
                // if no user found, show login
                authBtn.textContent = 'Login';
                authBtn.href = '/login';
            }
        })
        .catch(() => {
            // if the server request fails (maybe offline), default to showing login
            authBtn.textContent = 'Login';
            authBtn.href = '/login';
        });
});
