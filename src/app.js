//reference https://expressjs.com/en/4x/api.html#app.set

const path=require('path')
const express=require('express')
const hbs=require('hbs')

const app=express()

// Define paths for expres config
const publicDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// setup directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
  res.render('index',{
    title:'weather App test',
    name:'andrew mead'
  })
})


app.get('/about',(req,res)=>{
  res.render('about',{
    title:'it is about',
    name:'abfgdfsg'
  })
})

app.get('/help',(req,res)=>{
  res.render('about',{
    helpText:'this is help text',
    title:'it is help',
    name:'abfgdfsg'
  })
})



// // app.com 
// app.get('',(req,res)=>{
//   res.send('hello express!')
// })

// // app.com/help
// app.get('/help',(req,res)=>{
//   res.send('Help route works')
// })

// // app.com/about
// app.get('/about',(req,res)=>{
//   res.send('this is about node js')
// })

// app.get('/weather',(req,res)=>{
//   res.send("this is weather page")
// })

app.get('',(req,res)=>{
  res.send(`<h1>Weather</h1>`)
})

// app.get('/help',(req,res)=>{
//     res.send([{name:"test",age:26},{
//       name:"test2",
//       age:80
//     }])
//   })

// app.get('/about',(req,res)=>{
//   res.send(`<h1>About</h1>`)
// })

// app.get('/weather',(req,res)=>{
//   res.send([{forecast:34,location:'Pune'},
//   {forecast:67,location:'nanded'}])
// })

// app.get('/weather',(req,res)=>{
//   if(!req.query.address){
//     return res.send({
//       error:'Must provide address'
//     })
//   }
//   res.send([
//     {forecast:34,
//       location:'Pune',
//       address:req.query.address},
//     {forecast:67,
//       location:'nanded'}])
// })
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Must provide address'
    })
  }
  geocode(req.query.address ,(error,{latitude,longitutde,location}={})=>{
    if(error){
      return res.send({error})
    }
    forecast(latitude,longitutde,(error,forecastData)=>{
      if(error){
        return res.send(error)
      }

      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })

  res.send([
    {forecast:34,
      location:'Pune',
      address:req.query.address},
    {forecast:67,
      location:'nanded'}])
})

app.get('/product',(req,res)=>{

  if(!req.query.search){
    return res.send({
      error:'You must provide serach tearm'
    })
  }
  
  console.log(req.query)
  res.send({
    products:[]
  })
})


// match anything
// app.get('*',(req,res)=>{
//   res.send("My 404 page")
// })

app.get('/help/*',(req,res)=>{
  // res.send('Help article not found')
  res.render('404',{
    title:'404 help',
    name:'testing help',
    errorMessage:'Help not found'
  })
})
  
app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Testing',
    errorMessage:'Page not found'
  })
})





app.listen(3000,()=>{
  console.log('server is up on port 3000')
})

