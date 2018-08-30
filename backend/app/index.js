'use strict'

const routes = require('./routes')
const bigbang = require('@italojs/bigbang-rest')
const KubernetesSvcService = require('./services/kubernetes-svc')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
module.exports = bigbang((api, config) => {

  const kubernetesSvcService = new KubernetesSvcService()

  api.post('/', routes.kubernetes.create.factory(kubernetesSvcService))
  api.get('/:label', routes.kubernetes.findAll.factory(kubernetesSvcService))
  api.delete('/:label', routes.kubernetes.delete.factory(kubernetesSvcService))
})
