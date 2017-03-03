// https://github.com/danmademe/express-vue-super-simple
// https://zellwk.com/blog/crud-express-mongodb/


const path = require('path')
const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const expressVue = require('express-vue')
const app = express()
var db

app.engine('vue', expressVue)
app.set('view engine', 'vue')
app.set('views', path.join(__dirname, '/views'))
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

//using mLab here for cloud-hosted mongoDB
MongoClient.connect('mongodb://<USERNAME>:<PASSWORD>@ds113670.mlab.com:13670/<DATABASE-NAME>', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))

//test data set here instead of from mongo

var pageTitle = 'The VENoM stack'
var message = ""

//sample users
var users = []
users.push({ name: 'tobi', age: 12 })
users.push({ name: 'loki', age: 14  })
users.push({ name: 'jane', age: 16  })

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/index.html')
  var cursor = db.collection('quotes').find().toArray((err, result) => {
    res.render('index', {
      data: {
        title: pageTitle,
        message: message,        
        quotes: result
      },
      vue: {
        head: {
          title: pageTitle,
          meta: [
              { property:'og:title', content: pageTitle},
              { name:'twitter:title', content: pageTitle},
          ]
        }
      }
    })
  })  
})

app.get('/users/:userName', (req, res) => {
  //could use same data from above
  //var result = users
  var cursor = db.collection('users').find().toArray((err, result) => {
    
    var user = result.filter(function(item) {
          return item.name === req.params.userName;
      })[0]
    
    res.render('user', {
      data: {
        title: pageTitle,
        message: 'Hello!',
        user: user
      },
      vue: {
        head: {
          title: pageTitle,
          meta: [
              { property:'og:title', content: pageTitle},
              { name:'twitter:title', content: pageTitle},
          ]
        }
      }
    })
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to database')
      res.redirect('/')
  })
})