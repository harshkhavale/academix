const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sentiment = require('sentiment');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Mentor schema
const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  enrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, required: true },
  keywords: [{ type: String, required: true }],
  education: [{ type: String, required: true }],
  experience: { type: String, required: true },
  interests: { type: String, required: true },
  profilepicture: { type: String, required: true },
  coverpicture: { type: String, required: true },
}, { timestamps: true });

const Mentor = mongoose.model('Mentor', mentorSchema);

// Student schema
const studentSchema = new mongoose.Schema({
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
  insights: [{ type: String }],
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

// Sentiment analysis function
function performSentimentAnalysis(answers) {
  const insights = [];
  answers.forEach(answer => {
    const result = sentiment(answer);
    insights.push({
      text: answer,
      score: result.score,
      comparative: result.comparative,
      tokens: result.tokens,
      positive: result.positive,
      negative: result.negative,
    });
  });
  return insights;
}

// Suggest mentors endpoint
app.post('/suggest-mentors', async (req, res) => {
  try {
    const student = new Student({
      fullname: req.body.fullname,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
    });
    student.insights = performSentimentAnalysis(req.body.answers);

    const mentors = await Mentor.find();
    const matchedMentors = mentors.filter(mentor =>
      req.body.answers.some(answer => mentor.keywords.includes(answer.toLowerCase()))
    );

    res.json(matchedMentors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
