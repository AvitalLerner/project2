  // Retrieve user details from local storage
  const currentUserStr = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserStr);

  // Display user details on the page
  if (currentUser) {
      const userInfoElement = document.getElementById('userInfo');
      userInfoElement.innerHTML = `
          <p><strong>Name:</strong> ${currentUser.name}</p>
          <p><strong>Email:</strong> ${currentUser.email}</p>
          <p><strong>Phone:</strong> ${currentUser.phone}</p>
      `;
  }

  function logout() {
      // Remove the current user from local storage and redirect to the login page
      localStorage.removeItem('currentUser');
      window.location.href = "login.html";
  }