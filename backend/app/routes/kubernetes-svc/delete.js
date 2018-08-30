'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@italojs/bigbang-rest')

const factory = (service) => ([

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const result = await service.delete(req.params.label)

    res.status(200)
       .end()
  })
])

module.exports = { factory }
