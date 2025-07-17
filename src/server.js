const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
});
