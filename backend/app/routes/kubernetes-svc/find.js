'use strict'

const rescue = require('express-rescue')

const factory = (service) => ([

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const result = await service.find()

    res.status(200)
       .json(result)
  })
])

module.exports = { factory }
