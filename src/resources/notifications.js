import { Resource, Resources } from 'rexource'

export const Notification = Resource.extend({
})

export const Notifications = Resources.extend('notification', {
  Resource: Notification
})
