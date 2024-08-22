const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

const checkTableExists = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT COUNT(*)
      FROM information_schema.tables 
      WHERE table_schema = '${process.env.MYSQL_DATABASE}' 
      AND table_name = 'people';
    `;
    
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      }

      const tableExists = results[0]['COUNT(*)'] > 0;
      if (tableExists) {
        console.log("Table 'people' exists.");
        resolve(true);
      } else {
        console.log("Table 'people' does not exist.");
        resolve(false);
      }
    });
  });
};

const waitForTable = async () => {
  while (true) {
    try {
      const exists = await checkTableExists();
      if (exists) {
        break;
      }
    } catch (err) {
      console.error('Error checking for table:', err);
    }

    console.log("Retrying in 5 seconds...");
    await new Promise(res => setTimeout(res, 5000));
  }
};

(async () => {
  await waitForTable();
  console.log("Starting the main application...");
  process.exit(0);
})();
