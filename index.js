import express from 'express'
import {connection} from './database.js'
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import sendEmail from './services/nodemailer.js';

const app = express();
//const PORT = process.env.PORT;
const PORT = 3000;


const corsOptions = {
    origin: [process.env.CLIENT_URL_1,process.env.CLIENT_URL_2],
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions)); 
//app.use(cors());
app.use(express.json()); 

app.get('/', ( req,  res) =>{
    res.send('Server is ok');
});

app.get('/questions', async (req, res) => {
    const query = 'SELECT * FROM questions';
  
    try {

      const results = await new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
  
      res.json(results);
  
    } catch (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).json({ error: 'Error fetching questions from the database' });
    }
});
  

app.post('/submit-detail', async (req, res) => {
  const { name, designation, email, mobile, institution, questionRes } = req.body;
  if (!name || !email || !mobile) {
    return res.status(400).json({ error: 'Name, Email, and Mobile are required.' });
  }
  try {
    const checkQuery = `SELECT * FROM users WHERE email = ? OR phone_number = ?`;
    const [results] = await connection.promise().query(checkQuery, [email, mobile]);
    if (results.length > 0) {
      return res.status(400).json({ message: 'Duplicate entry: Email or Phone Number already exists.' });
    }

    const insertQuery = `INSERT INTO users (name, email, designation, phone_number, institution_name) VALUES (?, ?, ?, ?, ?)`;
    const [userResult] = await connection.promise().query(insertQuery, [name, email, designation, mobile, institution]);
    if (questionRes.length > 0) {
      const insertQuestionsQuery = `
        INSERT INTO user_questions (user_id, question_id, answer)
        VALUES ?
      `;
      const questionData = questionRes.map((item) => [
        userResult.insertId,  
        item.id,       
        item.answer          
      ]);
      await connection.promise().query(insertQuestionsQuery, [questionData]);
    }
    res.status(200).json({ message: 'Form data submitted successfully.'});
  } catch (err) {
    console.error('Database error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});




app.post('/submit-answers', ( req, res) =>{

  console.log('Getting Answers:', req.body);
  res.send('message');
});

app.listen(PORT, () =>{
    console.log(`Server is running at ${PORT}`);
});


