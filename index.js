const express = require("express");
const app = express();
const PORT = 3000; 
app.listen(PORT, () => {
  console.log("Servidor levantado en el puerto  "+PORT);
});

const db = require('./config/database.js');


app.use(express.json())


app.use("/products",require("./routes/products.js"))
app.use("/categories",require("./routes/categories.js"))

app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE happyCommerce';
    db.query(sql,(err,result)=>{
      if(err)throw err;
      console.log(result);
      res.send('Database created...')
    })
  })
  
  app.get('/createproductststable',(req,res)=>{
    let sql = `CREATE TABLE Products (
                id INT AUTO_INCREMENT,
                name_product VARCHAR(50),
                price INT,
                PRIMARY KEY(id)
            );`
      db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send('Products table created...')
      })
    })
    
    app.get('/createcategoriestable',(req,res)=>{
        let sql = `CREATE TABLE Categories(
                        id INT AUTO_INCREMENT,
                        name_category VARCHAR(50),
                        _description VARCHAR(50),
                        PRIMARY KEY(id)
                    );
                    CREATE TABLE ProductsCategories(
                        id INT AUTO_INCREMENT,
                        product_id INT,
                        category_id INT,
                        PRIMARY KEY(id),
                        FOREIGN KEY(product_id) REFERENCES Products(id) ON DELETE CASCADE,
                        FOREIGN KEY(category_id) REFERENCES Categories(id)
                    );`
          db.query(sql,(err,result)=> {
            if(err) throw err;
            console.log(result);
            res.send('Categories table created...')
          })
        })
          
          
          

  


  
  