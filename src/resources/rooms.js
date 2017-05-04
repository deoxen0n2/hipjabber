import { Resource, Resources } from 'rexource'
import { Messages } from './messages'
import { Notifications } from './notifications'

export const Room = Resource.extend({
  messages: Messages,

  notifications: Notifications
})

export const Rooms = Resources.extend('room', {
  Resource: Room
})
