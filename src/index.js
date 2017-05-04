import { Base } from 'rexource'
import { Rooms } from './resources/rooms'

export default class HipJabber extends Base {
  constructor (options) {
    const { baseURL } = options

    const baseOptions = {
      headers: {
        Authorization: `Bearer ${options.authToken}`
      }
    }

    super(baseURL, baseOptions)
  }

  get rooms () {
    return new Rooms(this.baseURL, this.options)
  }
}
