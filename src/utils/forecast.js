const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/ffad6618529da625897b07830884d497/${lat},${long}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(new Error('Unable to connect to weather service.'))
    } else if (body.error) {
      callback(new Error('Unable to find location.'))
    } else {
      const { temperature, precipProbability } = body.currently
      const { summary } = body.daily.data[0]
      callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast
