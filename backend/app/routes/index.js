'use strict'

module.exports = {
  kubernetes: {
    create: require('./kubernetes-svc/create'),
    find: require('./kubernetes-svc/find'),
    delete: require('./kubernetes-svc/delete')
  }
}
