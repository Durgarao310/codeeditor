const express = require('express')
const axios = require('axios')
const querystring = require('querystring')
const app = express()
const port = process.env.PORT || 3000
const RUN_URL = 'https://api.hackerearth.com/v3/code/run/'
const cors = require('cors')

app.use(express.json())    // <==== parse request body as JSON

app.use(cors())

app.post('', async (request, response) => {
  const source = request.body.code
  let language = request.body.lang

  const run_data = {
    client_secret:"40be40a281731198560af01c05070b376a286142",
    async: 0,
    source: source,
    lang: language,
    time_limit: 5,
    memory_limit: 246323,
  }
  try {
    const heResponse = await axios.post(
      RUN_URL,
      querystring.stringify(run_data)
    )
    response.send(heResponse.data)

  } catch (err) {
    response
      .status(400)
      .send({ status: 'error', message: 'failed to run code!' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
