const express = require("express");
const app = express();
const PORT = 3000; 
app.listen(PORT, () => {
  console.log("Servidor levantado en el puerto  "+PORT);
});

const db = require('./config/database.js');


app.use(express.json())



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

        app.post("/newproduct", (req, res) => {
            let sql = `INSERT INTO 
                       Products (name_product,price) 
                       values ('${req.body.name}','${req.body.price}');`;
            db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);            
            res.send("Product '"+req.body.name+"' added...");
             });
             req.body.categoryIdArr
             if(req.body.categoryIdArr && req.body.categoryIdArr.length != 0 ){
                //product id :
                let productId;  
                let sql2 = `SELECT * FROM Products WHERE 1 ORDER BY id DESC Limit 1`;
                db.query(sql2,(err,result)=> {
                    if(err) throw err; 
                    productId=result[0].id
                    //fulfilling intermediate table 
                    req.body.categoryIdArr.forEach((categoryId)=>{
                        let sql3 = `INSERT INTO 
                                   ProductsCategories (product_id,category_id) 
                                   values ('${productId}','${categoryId}');`;
                        db.query(sql3, (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        });//db.query
                    });//forEach
                });//db.query
             }//if
          });//app.post
        
          app.post("/newcategory", (req, res) => {
            let sql = `INSERT INTO 
                       Categories (name_category,_description) 
                       values ('${req.body.name}','${req.body.description}');`;
             db.query(sql, (err, result) => {
               if (err) throw err;
               console.log(result);
               res.send("Category '"+req.body.name+"' added...");
             });
          });

          app.put("/updateproduct", (req, res) => {
            let sql = `UPDATE Products
                       SET name_product='${req.body.newName}' 
                       WHERE id = '${req.body.id}';`;
             db.query(sql, (err, result) => {
               if (err) throw err;
               console.log(result);
               res.send("Product '"+req.body.newName+"' updated...");
             });
          });

          app.put("/updatecategory", (req, res) => {
            let sql = `UPDATE Categories
                       SET name_category='${req.body.newName}' 
                       WHERE id = '${req.body.id}';`;
             db.query(sql, (err, result) => {
               if (err) throw err;
               console.log(result);
               res.send("Category '"+req.body.newName+"' updated...");
             });
          });
          
          app.get('/showallproducts',(req,res)=>{
            let sql = `SELECT * FROM Products WHERE 1`;
            db.query(sql,(err,result)=> {
              if(err) throw err;
              res.send(result)
            })
          })

          app.get('/showallcategories',(req,res)=>{
            let sql = `SELECT * FROM Categories WHERE 1`;
            db.query(sql,(err,result)=> {
              if(err) throw err;
              res.send(result)
            })
          })

          app.get('/showallproductswithcategory',(req,res)=>{
            let sql = `SELECT Products.id,name_product,price, name_category FROM ProductsCategories 
                       INNER JOIN Categories ON Categories.id = ProductsCategories.category_id
                       INNER JOIN Products ON Products.id = ProductsCategories.product_id;`;
            db.query(sql,(err,result)=> {
              if(err) throw err;
              res.send(result)
            })
          })

          app.get('/showproductbyid/:id',(req,res)=>{
            const productId = req.params.id
            let sql = `SELECT * FROM Products WHERE id = '${productId}'`;
            db.query(sql,(err,result)=> {
              if(err) throw err;
              res.send(result)
            })
          })

          app.get('/showallproductsdesc',(req,res)=>{
            let sql = `SELECT * FROM Products WHERE 1 ORDER BY id DESC`;
            db.query(sql,(err,result)=> {
              if(err) throw err;
              res.send(result)
            })
          })
          
          app.get('/showcategorybyid/:id',(req,res)=>{
            const categoryId = req.params.id
            let sql = `SELECT * FROM Categories WHERE id = '${categoryId}'`;
            db.query(sql,(err,result)=> {
              if(err) throw err;
              res.send(result)
            })
          })

          app.get('/showproductbyname/:name',(req,res)=>{
            const productName = req.params.name
            let sql = `SELECT * FROM Products WHERE name_product = '${productName}'`;
            db.query(sql,(err,result)=> {
              if(err) throw err;
              res.send(result)
            })
          })

          app.delete('/deleteproductbyid/:id',(req,res)=>{
            const productId = req.params.id
            let sql = `DELETE FROM Products WHERE id = ${productId}`;
            db.query(sql, (err,result)=> {
              if(err) throw err;
              res.send('Post deleted')
            })
          })
          

  


  
  