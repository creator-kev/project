const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const dbUser = encodeURIComponent("gachokakevin"); // Encode special characters
const dbPass = encodeURIComponent("kevingac");    // Encode special characters
const dbName = "expense_tracker"; // Database name

mongoose.connect(`mongodb://${dbUser}:${dbPass}@localhost:27017/${dbName}?authSource=admin`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB Connected'))
.catch(err => console.error(' MongoDB Connection Error:', err.message));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const expenseRoutes = require('./expense-tracker/routes/expenseRoutes.js');
app.use('/api/expenses', expenseRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
