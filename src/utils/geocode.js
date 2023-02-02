const request=require('request')

const geocode=(address,callback)=>{
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoicG9vamEtc3dhbWktMzAtMTAiLCJhIjoiY2xjaGxkdjV4MDA5azNubGo1Y2E1czdiaSJ9.zI2NcrerBAfNp4mxi08LhQ'
  // request({url:url,json:true},(error,response)=>{
  //   if(error){
  //     callback("unable to connect to loaction services!",undefined)
  //   }
  //   else if(response.body.features.length===0){
  //     callback('Unable to find loaction. try another search',undefined)
  //   }
  //   else{
  //     callback(undefined,{
  //       test:response.body.features[0].center[0]
  //     })
  //   }
  // })
  request({url,json:true},(error,{body})=>{
    if(error){
      callback("unable to connect to loaction services!",undefined)
    }
    else if(body.features.length===0){
      callback('Unable to find loaction. try another search',undefined)
    }
    else{
      callback(undefined,{
        latitude:body.features[0].center[0]
      })
    }
  })
}

module.exports=geocode