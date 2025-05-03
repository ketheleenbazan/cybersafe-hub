// CyberSafe Hub main JS file
console.log("Welcome to CyberSafe Hub!");

// Cyber Lab feature button expand/collapse (feature section)
document.addEventListener('DOMContentLoaded', function() {
    var cyberBtn = document.querySelector('.feature-btn.cyberlab-expand-btn');
    var arrow = cyberBtn ? cyberBtn.querySelector('.cyberlab-arrow') : null;
    if (cyberBtn) {
        function setArrow() {
            if (cyberBtn.classList.contains('active')) {
                arrow.innerHTML = '&#x25BC;'; // ▼ down
            } else {
                arrow.innerHTML = '&#x25B2;'; // ▲ up
            }
        }
        cyberBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            cyberBtn.classList.toggle('active');
            setArrow();
        });
        // Close if clicking outside
        document.addEventListener('click', function() {
            cyberBtn.classList.remove('active');
            setArrow();
        });
        // Keyboard accessibility
        cyberBtn.addEventListener('keydown', function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                cyberBtn.classList.toggle('active');
                setArrow();
            }
            if (e.key === "Escape") {
                cyberBtn.classList.remove('active');
                setArrow();
            }
        });
        // Set initial arrow
        setArrow();
    }
});

// Cyber Lab navbar dropdown: click to open/close
document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.getElementById('cyberlab-dropdown');
    var dropbtn = document.getElementById('cyberlab-dropbtn');

    if (dropdown && dropbtn) {
        dropbtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdown.classList.remove('show');
        });
        // Keyboard accessibility
        dropbtn.addEventListener('keydown', function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                dropdown.classList.toggle('show');
            }
            if (e.key === "Escape") {
                dropdown.classList.remove('show');
            }
        });
    }
});
