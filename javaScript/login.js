// Function to set a cookie with a given name, value, and expiration time
function setCookie(name, value, expiration) {
    console.log('Setting cookie');  // Add this line
    const date = new Date();
    date.setTime(date.getTime() + expiration);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    //console.log('Cookie set');  // Add this line
}


// Function to get the value of a cookie by name
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Function to delete a cookie by name
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function submitLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (testUserExistence(username, password)) {
        // User exists with correct credentials
        // Set a cookie for the user
        setCookie('user', username, inactivityTimeout);

        setInactivityTimeout();
        //alert('good');
        window.location.href = "../html/homePage.html";
    } else {
        alert("User does not exist or incorrect credentials. Please try again.");
    }
}

function testUserExistence(username, password) {
    const usersStr = localStorage.getItem('users');

    if (usersStr) {
        const users = JSON.parse(usersStr);
        let x = users.some(user => user.name === username && user.password === password);
        return x;
    }

    return false;
}


const inactivityTimeout = 15 * 60 * 1000; // 15 minutes

// Set a timeout to automatically log out the user after the specified duration
let inactivityTimer;

function setInactivityTimeout() {
    inactivityTimer = setTimeout(logout, inactivityTimeout);
}

function resetInactivityTimeout() {
    clearTimeout(inactivityTimer);
    setInactivityTimeout();
}

document.addEventListener('mousemove', function () {
    resetInactivityTimeout();
    const username = getCookie('user');
    if (username) {
        setCookie('user', username, inactivityTimeout);
    }
});

document.addEventListener('keydown', function () {
    resetInactivityTimeout();
    const username = getCookie('user');
    if (username) {
        setCookie('user', username, inactivityTimeout);
    }
});

function logout() {
    deleteCookie('user');
    alert('Logout due to inactivity');
    window.location.href = 'login.html';
}

