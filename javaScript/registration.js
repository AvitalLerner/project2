function registerUser(event) {
    event.preventDefault();

    // Retrieve form values
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Perform validation (you can add more validation logic)
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Create user object with the entered details
    const user = {
        name: username,
        phone: phone,
        email: email,
        password: password
    };
    alert(user);

    alert(user.name);

    // Save the user object to local storage
    saveUserToLocalStorage(user);

    // Optionally, redirect to another page or perform other actions
    alert("Registration successful! You can now log in.");
}

function saveUserToLocalStorage(user) {
    // Retrieve existing users from local storage
    const existingUsersStr = localStorage.getItem("users");
    const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];

    // Add the new user to the array
    existingUsers.push(user);

    // Save the updated array back to local storage
    localStorage.setItem("users", JSON.stringify(existingUsers));
}

// Attach the registerUser function to the form's onsubmit event
document.getElementById("registrationForm").addEventListener("submit", registerUser);
