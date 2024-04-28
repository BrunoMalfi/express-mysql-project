const db = require("../config/database");
const ProductController ={
    showAllProducts (req,res) {
        let sql = `SELECT * FROM Products WHERE 1`;
        db.query(sql,(err,result)=> {
        if(err) throw err;
        res.send(result);
        })
    },
    newProduct (req, res) {
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
      },
      updateProduct(req, res){
        let sql = `UPDATE Products
                   SET name_product='${req.body.newName}' 
                   WHERE id = '${req.body.id}';`;
         db.query(sql, (err, result) => {
           if (err) throw err;
           console.log(result);
           res.send("Product '"+req.body.newName+"' updated...");
         });
      },
      showAllProductsWithCategory (req,res) {
        let sql = `SELECT Products.id,name_product,price, name_category FROM ProductsCategories 
                   INNER JOIN Categories ON Categories.id = ProductsCategories.category_id
                   INNER JOIN Products ON Products.id = ProductsCategories.product_id;`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      showProductById (req,res) {
        const productId = req.params.id
        let sql = `SELECT * FROM Products WHERE id = '${productId}'`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      showProductByName (req,res) {
        const productName = req.params.name
        let sql = `SELECT * FROM Products WHERE name_product = '${productName}'`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      deleteProductById (req,res) {
        const productId = req.params.id
        let sql = `DELETE FROM Products WHERE id = ${productId}`;
        db.query(sql, (err,result)=> {
          if(err) throw err;
          res.send('Product deleted')
        })
      },
      showAllProductsDesc (req,res) {
        let sql = `SELECT * FROM Products WHERE 1 ORDER BY id DESC`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      }
}

module.exports = ProductController