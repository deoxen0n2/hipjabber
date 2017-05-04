import test from 'tape'
import HipJabber from '../../src'
import { Notification } from '../../src/resources/notifications'

import config from './config'

const hipJabber = new HipJabber(config)

const after = test

const testContext = {
  testRoom: {
    name: `HipJabberTesting#${Math.random() * 100 | 0}`
  }
}

test('sending notification from created room instance', (t) => {
  t.plan(1)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms.create({
    name,
    privacy: 'private',
    topic: 'HipJabber Testing'
  })
  .then((room) => {
    return room.notifications.create({
      message: 'test notification from HipJabber, from created room instance (image by Wikipedia with https://creativecommons.org/licenses/by-sa/3.0/ license)',
      notify: false,
      card: {
        id: '1',
        style: 'image',
        title: 'Test card title',
        description: 'test notification from HipJabber, from created room instance (image by Wikipedia with https://creativecommons.org/licenses/by-sa/3.0/ license)',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
        thumbnail: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png'
        }
      }
    })
  })
  .then((notification) => {
    t.ok(notification instanceof Notification)
  })
  .catch((error) => {
    console.log('error.response:', error.response)

    t.error(error)
  })
})

test('sending notification from rooms(name).notifications.create()', (t) => {
  t.plan(1)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms(name).notifications.create({
    message: 'test message from HipJabber, from rooms(name).notifications.create() https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
    notify: false,
    card: {
      id: '1',
      style: 'image',
      title: 'Test card title',
      description: 'test message from HipJabber, from rooms(name).notifications.create() https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
      thumbnail: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png'
      }
    }
  })
  .then((notification) => {
    t.ok(notification instanceof Notification)
  })
  .catch((error) => {
    console.log('error.response:', error.response)

    t.error(error)
  })
})

after('destroying created test room', (t) => {
  t.plan(1)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms(name).destroy()
    .then((room) => {
      t.ok(true)
    })
    .catch((error) => {
      console.log('error.response:', error.response)

      t.error(error)
    })
})
