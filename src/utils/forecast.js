const request =require('request')

const forecast=(latitude,longitude,callback)=>{
  const url = 'http://api.weatherstack.com/current?access_key=a78f582aac85980df93e84f4b07dcd0d&query='+latitude+','+longitude+'&units=f'
  // request({url:url,json:true},(error,response)=>{
  //   if(error){
  //     callback("Uanable to connect",undefined)
  //   }else if(response.body.error){
  //     callback('unable to find location',undefined)
  //   }else{
  //     callback(undefined,response.body.current.weather_descriptions[0] + ' It is currently ' + temp + ' degrees out. there is ' + feelslike + '% chance of rain')
  //   }
  // })

  request({url,json:true},(error,{body})=>{
    if(error){
      callback("Uanable to connect",undefined)
    }else if(body.error){
      callback('unable to find location',undefined)
    }else{
      callback(undefined,body.current.weather_descriptions[0] + ' It is currently ' + temp + ' degrees out. there is ' + feelslike + '% chance of rain')
    }
  })
}

module.exports= forecast