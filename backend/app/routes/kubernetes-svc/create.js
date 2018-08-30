'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@italojs/bigbang-rest')

const factory = (service) => ([

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const result = await service.create(req.body.label)

    res.status(201)
       .json(result)
  })
])

module.exports = { factory }
