document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchBox = document.getElementById('search');
    const userList = document.getElementById('user-list');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      fetch(`https://api.github.com/search/users?q=${searchBox.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(response => response.json())
        .then(data => displayUsers(data.items));
    });
  
    function displayUsers(users) {
      // Clear previous search results
      userList.innerHTML = '';
  
      users.forEach(user => {
        const userElement = document.createElement('div');
        const usernameElement = document.createElement('h3');
        const avatarElement = document.createElement('img');
        const profileLinkElement = document.createElement('a');
  
        usernameElement.textContent = user.login;
        avatarElement.src = user.avatar_url;
        profileLinkElement.href = user.html_url;
        profileLinkElement.textContent = 'Profile';
  
        userElement.appendChild(usernameElement);
        userElement.appendChild(avatarElement);
        userElement.appendChild(profileLinkElement);
  
        userList.appendChild(userElement);
      });
    }
  });