const express = require('express')
const sqlite=require('sqlite3').verbose()
const app = express()
const port = 3001
app.use(express.json())
const cors = require('cors');
app.use(cors())

const db = new sqlite.Database('product.db',(err)=> {
    if(err){
        console.log(err)
    }else{
        console.log('OK')
    }
});

app.get('/', (req, res) => {
  db.all('SELECT * FROM products', [], (err, data)=>{
    res.send(data)
  })
})
app.get('/product/:id', (req, res) => {
    const id= req.params.id
    db.get('SELECT * FROM products WHERE id=?', [id], (err, data)=>{
      res.send(data)
    })
  });
  app.post("/new", (req, res)=>{
    db.run('INSERT INTO products (image, name, price, places) values (?,?,?,?)', 
    [req.body.image, req.body.name, req.body.price, req.body.places], (err)=> {
        res.send('OK')
    })
  })

  app.put("/update/:id", (req, res)=>{
    const id= req.params.id
    db.run('UPDATE products SET image=?, name=?, price=?, places=? WHERE id=?', 
    [req.body.image, req.body.name, req.body.price, req.body.places, id], (err)=> {
        res.send('OK')
    })
  })
  
  app.delete("/delete/:id", (req, res)=>{
    const id= req.params.id
    db.run('DELETE FROM products  WHERE id=?', 
    [id], (err)=> {
        res.send('OK')
    })
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})