import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: '97.74.85.6',
  user: 'sodtdb_user',
  password: 'Intellect@2025',
  database: 'sodtdb',
  port: 3306,
   waitForConnections: true,
  connectionLimit: 10,  // 🔹 Only 10 connections max at a time
  queueLimit: 0
});



connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});

export { connection};   
