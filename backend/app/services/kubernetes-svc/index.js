'use strict'

const templates = require('../../kubernetes-templates')

const DEPLOY_NAME = 'minecraft'

class kubernetesSvcService {
  
  constructor(client){
    this.$client =client
  }

  async create ({ serviceName, deploymentName }) {
    const deployment = templates.deployment

    deployment.metadata.name = deploymentName
    deployment.metadata.labels.app = deploymentName
    deployment.spec.selector.matchLabels.app = deploymentName
    deployment.spec.template.metadata.labels.app = deploymentName

    const services = templates.service
    services.metadata.name = serviceName
    services.metadata.labels.app = serviceName
    services.spec.selector.app = deploymentName

    this.$client.apis.apps.v1beta1.namespaces('default').deployments.post({ body: deployment })
    this.$client.api.v1.namespaces('default').services.post({ body: services})
  }

  async find(){
    const response = await this.$client.api.v1.namespaces('default').services.get()
    const promises = await response.body.items.map(async(item) => {
      console.log(item)
      const ingress = item.status.loadBalancer.ingress
      if(!ingress){
        return
      }
      const services = await ingress.map( async(element) => {
        return {
          name: item.metadata.name,
          ip: element.ip,
        }
      })
      const result = await Promise.all(services)
      return result[0]
    })
    const result = await Promise.all(promises)
    return result.filter(n => n)
  }

  async delete({ serviceName, deploymentName }){
    this.$client.apis.apps.v1.namespaces('default').deployments(deploymentName).delete()
    this.$client.api.v1.namespaces('default').services(serviceName).delete()
  }
}

module.exports = kubernetesSvcService
