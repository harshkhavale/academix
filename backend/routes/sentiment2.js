const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sentiment = require('sentiment');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MongoDB models
const Mentor = require('./models/mentor');

// Sentiment analysis function
function performSentimentAnalysis(answers) {
  const overallSentimentScores = [];
  const positiveWords = [];
  const negativeWords = [];

  answers.forEach(answer => {
    const result = sentiment(answer);
    overallSentimentScores.push(result.score);

    result.positive.forEach(word => {
      if (!positiveWords.includes(word)) {
        positiveWords.push(word);
      }
    });

    result.negative.forEach(word => {
      if (!negativeWords.includes(word)) {
        negativeWords.push(word);
      }
    });
  });

  const overallSentiment = calculateOverallSentiment(overallSentimentScores);
  const mainSentimentCategory = determineMainSentimentCategory(overallSentiment);
  return {
    overallSentiment,
    mainSentimentCategory,
    positiveWords,
    negativeWords,
  };
}

function calculateOverallSentiment(scores) {
  const totalScore = scores.reduce((acc, curr) => acc + curr, 0);
  const averageScore = totalScore / scores.length;
  return averageScore >= 0 ? 'Positive' : 'Negative';
}

function determineMainSentimentCategory(sentiment) {
  return sentiment === 'Positive' ? 'Happy' : 'Concerned';
}

// Suggest mentors endpoint
app.post('/suggest-mentors', async (req, res) => {
  try {
    const studentAnswers = req.body.answers;
    const insights = performSentimentAnalysis(studentAnswers);

    // Fetch mentors from MongoDB
    const mentors = await Mentor.find();

    // Filter mentors based on student's interests
    const matchedMentors = mentors.filter(mentor =>
      studentAnswers.some(answer => mentor.interests.includes(answer.toLowerCase()))
    );

    res.json({ mentors: matchedMentors, insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
