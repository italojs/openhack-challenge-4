'use strict'

const routes = require('./routes')
const config = require('../config')
const Client = require('kubernetes-client').Client
const clientConfig = require('kubernetes-client').config
const bigbang = require('@italojs/bigbang-rest')
const KubernetesSvcService = require('./services/kubernetes-svc')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
module.exports = bigbang((api, config) => {
  const ksClient = new Client({ config: clientConfig.getInCluster(), version: '1.10' });

  const kubernetesSvcService = new KubernetesSvcService(ksClient)

  api.post('/', routes.kubernetes.create.factory(kubernetesSvcService))
  api.get('/', routes.kubernetes.find.factory(kubernetesSvcService))
  api.delete('/', routes.kubernetes.delete.factory(kubernetesSvcService))
})
