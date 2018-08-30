'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@italojs/bigbang-rest')

const factory = (service) => ([

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    await service.delete(req.body)

    res.status(200)
       .end()
  })
])

module.exports = { factory }
