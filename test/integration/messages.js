import test from 'tape'
import HipJabber from '../../src'

import config from './config'

const hipJabber = new HipJabber(config)

const after = test

const testContext = {
  testRoom: {
    name: `HipJabberTesting#${Math.random() * 100 | 0}`
  }
}

test('sending message from created room instance', (t) => {
  t.plan(2)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms.create({
    name,
    privacy: 'private',
    topic: 'HipJabber Testing'
  })
  .then((room) => {
    return room.messages.create({
      message: 'test message from HipJabber, from created room instance'
    })
  })
  .then((message) => {
    const messageJSON = message.toJSON()

    t.equal(typeof messageJSON.id, 'string')
    t.equal(typeof messageJSON.timestamp, 'string')
  })
  .catch((error) => {
    console.log('error.response:', error.response)

    t.error(error)
  })
})

test('sending message from rooms(name).messages.create()', (t) => {
  t.plan(2)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms(name).messages.create({
    message: 'test message from HipJabber, from rooms(name).messages.create()'
  })
  .then((message) => {
    const messageJSON = message.toJSON()

    t.equal(typeof messageJSON.id, 'string')
    t.equal(typeof messageJSON.timestamp, 'string')
  })
  .catch((error) => {
    console.log('error.response:', error.response)

    t.error(error)
  })
})

test('listing messages', (t) => {
  t.plan(3)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms(name).messages.list({
  })
  .then((messages) => {
    const messagesJSON = messages.toJSON()

    t.ok(Array.isArray(messagesJSON.items))
    t.equal(messagesJSON.items.length, 2)
    t.equal(messagesJSON.items[0].message, 'test message from HipJabber, from created room instance')
  })
  .catch((error) => {
    console.log('error.response:', error.response)

    t.error(error)
  })
})

test('listing latest messages', (t) => {
  t.plan(3)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms(name).messages.latest({
  })
  .then((messages) => {
    const messagesJSON = messages.toJSON()

    t.ok(Array.isArray(messagesJSON.items))
    t.equal(messagesJSON.items.length, 2)
    t.equal(messagesJSON.items[0].message, 'test message from HipJabber, from created room instance')
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
