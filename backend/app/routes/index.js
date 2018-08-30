'use strict'

module.exports = {
  kubernetes: {
    create: require('./kubernetes-svc/create'),
    findAll: require('./kubernetes-svc/findAll'),
    delete: require('./kubernetes-svc/delete')
  }
}
