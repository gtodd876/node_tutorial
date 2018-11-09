const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const errorController = require('./controllers/error')
const shopRoutes = require('./routes/shop.js')
const adminRoutes = require('./routes/admin.js')
const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)

app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000, () => { console.log(`Listening at http://localhost:3000`) })
