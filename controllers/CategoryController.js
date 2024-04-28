const db = require("../config/database");
const CategoryController = {
    showAllCategories (req,res) {
        let sql = `SELECT * FROM Categories WHERE 1`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      },
      newCategory (req, res) {
        let sql = `INSERT INTO 
                   Categories (name_category,_description) 
                   values ('${req.body.name}','${req.body.description}');`;
         db.query(sql, (err, result) => {
           if (err) throw err;
           console.log(result);
           res.send("Category '"+req.body.name+"' added...");
         });
      },
      updateCategory (req, res) {
        let sql = `UPDATE Categories
                   SET name_category='${req.body.newName}' 
                   WHERE id = '${req.body.id}';`;
         db.query(sql, (err, result) => {
           if (err) throw err;
           console.log(result);
           res.send("Category '"+req.body.newName+"' updated...");
         });
      },
      showCategoryById (req,res) {
        const categoryId = req.params.id
        let sql = `SELECT * FROM Categories WHERE id = '${categoryId}'`;
        db.query(sql,(err,result)=> {
          if(err) throw err;
          res.send(result)
        })
      }

}
module.exports = CategoryController
