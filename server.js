const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname)));

mongoose.connect('mongodb+srv://user1:user@cluster0.mykzwh7.mongodb.net/DBsports', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const customerSchema = new mongoose.Schema({
  firstname: String,
  email: String,
  address: String,
  phone: String,
  sport: String,
  plan: String,
  cardname: String,
  cardnumber: String,
  expmonth: String,
  expyear: String,
  cvv: String
});

const concernSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String
});

const Customer = mongoose.model('Customer', customerSchema);
const Concern = mongoose.model('Concern', concernSchema);

// Routes
app.post('/submit', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send('Customer information saved successfully');
  } catch (err) {
    res.status(400).send('Error saving customer information');
  }
});

app.post('/contact', async (req, res) => {
  try {
    const concern = new Concern(req.body);
    await concern.save();
    res.status(201).send('Concern saved successfully');
  } catch (err) {
    res.status(400).send('Error saving concern');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
