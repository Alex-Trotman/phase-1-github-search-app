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
      .then(data => displayUsers(data.items))
      .catch(error => console.log(error));
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

      userElement.addEventListener('click', () => {
        const username = user.login;
        const repoUrl = `https://api.github.com/users/${username}/repos`;

        fetch(repoUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
          }
        })
          .then(response => response.json())
          .then(data => displayUserRepos(data))
          .catch(error => console.log(error));
      });

      // ...

      function displayUserRepos(repos) {
        const repoContainer = document.getElementById('repos-list');
        repoContainer.innerHTML = ''; // Clear previous repository information

        repos.forEach(repo => {
          const repoElement = document.createElement('div');
          const repoNameElement = document.createElement('h4');
          const repoDescriptionElement = document.createElement('p');
          const repoLinkElement = document.createElement('a');

          repoNameElement.textContent = repo.name;
          repoDescriptionElement.textContent = repo.description;
          repoLinkElement.href = repo.html_url;
          repoLinkElement.textContent = 'View Repository';

          repoElement.appendChild(repoNameElement);
          repoElement.appendChild(repoDescriptionElement);
          repoElement.appendChild(repoLinkElement);

          repoContainer.appendChild(repoElement);
        });
      }

      userElement.appendChild(usernameElement);
      userElement.appendChild(avatarElement);
      userElement.appendChild(profileLinkElement);

      userList.appendChild(userElement);
    });
  }
});