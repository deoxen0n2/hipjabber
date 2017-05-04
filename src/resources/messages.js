import { Resource, Resources } from 'rexource'

export const Message = Resource.extend({
})

export const Messages = Resources.extend('message', {
  beforeList (query = {}) {
    const baseURL = this.baseURL.replace(/message\/?$/, 'history')

    return Promise.resolve({ baseURL, query })
  },

  latest (query = {}) {
    const baseURL = this.baseURL.replace(/message\/?$/, 'history/latest')

    return this.get(query, baseURL).then(response => this.afterList(response))
  },

  Resource: Message
})
