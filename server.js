const express = require('express')
const app = express()

//QUESTION 1
app.get('/greetings/:name', (req, res) => {
  console.log(req.params.name);
  res.send(`Hello there ${req.params.name}! How are you?`);
});

//QUESTION 2
app.get('/roll/:number', (req, res) => {
  const numParam = req.params.number;
  const number = parseInt(numParam);
  if (isNaN(number)) {
    res.status(400).send("You must specify a number!");
  } else {
    const roll = Math.floor(Math.random() * (number + 1))
    res.send(`You rolled a ${roll}!`)
  }
});


//QUESTION 3 
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);

  if (!isNaN(index) && index >= 0 && index < collectibles.length) {
    const saleItem = collectibles[index]
    res.send(`So you want the ${saleItem.name}? For $${saleItem.price}, it can be yours!`)
  } else {
    res.status(400).send("This item is not yet in stock. Check back soon!")
  }
})


//QUESTION 4
// app.get('/hello', (req, res) => {
//   res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
//  });

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let saleShoe = shoes;

  const minPrice = parseInt(req.query['min-price'])
    if (!isNaN(minPrice)) {
      saleShoe = saleShoe.filter(shoes => shoes.price >= minPrice)
    }

  const maxPrice = parseInt(req.query['max-price'])
    if (!isNaN(maxPrice)) {
      saleShoe = saleShoe.filter(shoes => shoes.price <= maxPrice)
    } 

  const type = req.query['type'] 
     if (type) {
      saleShoe = saleShoe.filter(shoe => shoe.type === type)
     };
     res.json(saleShoe)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})