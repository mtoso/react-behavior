const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

// Experience Engine
function generateExperiences({ userId, page}, cb) {
  // pass userId and page to behavior API and get back an object with the eperience ??
  const behaviorAPIResponse = {
    showComponentA: true
  };

  // start building the experience
  let experiences = [];
  if (behaviorAPIResponse.showComponentA) {
    fs.readFile('./components/componentA.js', 'utf8', function(err, source) {
      experiences.push({
        // where to load the component in the dom
        placement: 'experience',
        // component data
        component: {
          name: 'ComponentA',
          src: source,
          props: {}
        }
      })
      return cb(experiences);
    });
  }
}

const app = express()
app.use(express.static('public'));
app.use(bodyParser.json())

app.post('/experience', (req, res) => {
  generateExperiences(req.body, (experiences) => {
    res.json({ experiences });
  });
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))