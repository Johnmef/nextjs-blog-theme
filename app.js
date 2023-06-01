const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Initial light switches data
let switches = [
  { id: 1, name: 'bedroom light', state: 'off' },
  { id: 2, name: 'kitchen light', state: 'on' },
  // ... add more switches here
];

// POST endpoint to update a switch's state
app.post('/switches/:switchId', (req, res) => {
  const switchId = parseInt(req.params.switchId);
  const newState = req.body.state;

  const foundSwitch = switches.find(switchObj => switchObj.id === switchId);
  if (!foundSwitch) {
    return res.status(404).json({ error: 'Switch not found' });
  }

  foundSwitch.state = newState;
  res.json(foundSwitch);
});

// GET endpoint to fetch switch state
app.get('/switches', (req, res) => {
  const query = req.query.q;
  if (query) {
    const foundSwitch = switches.find(switchObj => switchObj.name.toLowerCase() === query.toLowerCase());
    if (!foundSwitch) {
      return res.status(404).json({ error: 'Switch not found' });
    }
    return res.json(foundSwitch);
  }

  res.json(switches);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
