const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/ffad6618529da625897b07830884d497/${lat},${long}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service.')
    } else if (body.error) {
      callback('Unable to find location.')
    } else {
      const { temperature, precipProbability } = body.currently
      const { summary, temperatureHigh, temperatureLow } = body.daily.data[0]
      callback(undefined,
        `${summary} It is currently ${temperature} degrees out.
        The high today is ${temperatureHigh} with a low of ${temperatureLow}.
        There is a ${precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast
