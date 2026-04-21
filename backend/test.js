const express = require('express');
const app = express();
app.use(express.json());
app.post('/signup', (req, res) => {
  res.json({ success: true, body: req.body });
});
app.listen(5001, () => console.log('Test server on 5000'));