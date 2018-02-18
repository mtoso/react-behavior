// this lib goes in the client and is not aware of the components. It only load components that are coming back from the server

function loadUserExperience(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
  })
  .then(response => response.json())
}

loadUserExperience('http://localhost:3000/experience', {userId: 42, page: 'home'})
  .then(data => {
    data.experiences.map((experience) => {
      window.eval(experience.component.src)
      const componentName = eval(experience.component.name);
      ReactDOM.render(
        componentName,
        document.getElementById(experience.placement)
      );
    })
  })
  .catch(error => console.error(error))