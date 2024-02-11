
function submitLogin() {
    // Get the username and password entered by the user
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Perform a test for user existence and correct credentials (replace this with your actual logic)
    if (testUserExistence(username, password)) {
        // User exists with correct credentials
        // Redirect to the game.html page
        window.location.href = "games.html";
    } else {
        // User does not exist or incorrect credentials
        // Show an error message
        alert("User does not exist or incorrect credentials. Please try again.");
    }
}


async function testUserExistence(username, password) {
    try {
      const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
      const data = await response.json();
  
      return data.length > 0;
    } catch (error) {
      console.error('Error fetching data:', error);
      return false;
    }
  }

  


  


// function submitLogin() {

//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;

//     let user = JSON.parse(window.localStorage.getItem(email));

//     if (user == undefined || user == null) {
//       alert('אינך קיים במערכת! לצורך כניסה יש להרשם');
//     }
//     else if(user.email == email && user.password == password){
//         console.log(email);
//         document.cookie = `email=${email}; path=/`;
//         document.getElementById('login_form').submit();
//     }
//     else {
//       alert('שם משתמש או סיסמא שגויים');
//     }

// }
// function goBegining() {
//     location.href = 'index.html';
// }