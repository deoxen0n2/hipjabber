import test from 'tape'
import HipJabber from '../../src'
import { Rooms, Room } from '../../src/resources/rooms'

import config from './config'

const hipJabber = new HipJabber(config)

const testContext = {
  testRoom: {
    name: `HipJabberTesting#${Math.random() * 100 | 0}`
  }
}

test('creating room', (t) => {
  t.plan(3)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms.create({
    name,
    privacy: 'private',
    topic: 'HipJabber Testing'
  })
  .then((room) => {
    const roomsJSON = room.toJSON()

    t.ok(room instanceof Room)
    t.equal(typeof roomsJSON.id, 'number')
    t.equal(typeof roomsJSON.links.self, 'string')
  })
})

test('listing rooms', (t) => {
  t.plan(2)

  hipJabber.rooms.list()
    .then((rooms) => {
      const roomsJSON = rooms.toJSON()

      t.ok(Array.isArray(roomsJSON.items), 'items is an array')
      t.ok(rooms instanceof Rooms)
    })
})

test('retrieving room', (t) => {
  t.plan(30)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms(name).retrieve()
    .then((room) => {
      const roomJSON = room.toJSON()

      t.equal(roomJSON.avatar_url, null)
      t.equal(typeof roomJSON.created, 'string')
      t.equal(roomJSON.delegate_admin_visibility, null)
      t.equal(roomJSON.guest_access_url, null)
      t.equal(typeof roomJSON.id, 'number')
      t.equal(roomJSON.is_archived, false)
      t.equal(roomJSON.is_guest_accessible, false)
      t.equal(roomJSON.last_active, null)
      t.equal(typeof roomJSON.links, 'object')
      t.equal(typeof roomJSON.links.members, 'string')
      t.equal(typeof roomJSON.links.participants, 'string')
      t.equal(typeof roomJSON.links.self, 'string')
      t.equal(typeof roomJSON.links.webhooks, 'string')
      t.equal(roomJSON.name, name)
      t.equal(typeof roomJSON.owner, 'object')
      t.equal(typeof roomJSON.owner.id, 'number')
      t.equal(typeof roomJSON.owner.links, 'object')
      t.equal(typeof roomJSON.owner.links.self, 'string')
      t.equal(typeof roomJSON.owner.mention_name, 'string')
      t.equal(typeof roomJSON.owner.name, 'string')
      t.equal(typeof roomJSON.owner.version, 'string')
      t.ok(Array.isArray(roomJSON.participants), 'participants is an array')
      t.equal(roomJSON.privacy, 'private')
      t.equal(typeof roomJSON.statistics, 'object')
      t.equal(typeof roomJSON.statistics.links, 'object')
      t.equal(typeof roomJSON.statistics.links.self, 'string')
      t.equal(roomJSON.topic, 'HipJabber Testing')
      t.equal(typeof roomJSON.version, 'string')
      t.equal(typeof roomJSON.xmpp_jid, 'string')
      t.ok(room instanceof Room)
    })
})

test('updating room', (t) => {
  t.plan(1)

  const { testRoom } = testContext
  const { name } = testRoom

  hipJabber.rooms(name).update({
    name: `${name}-Updated`,
    privacy: 'private',
    topic: 'HipJabber Testing Updated',
    is_archived: false,
    is_guest_accessible: false,
    owner: {
      id: '4943927'
    }
  })
  .then((room) => {
    t.ok(room instanceof Room)
  })
  .catch((error) => {
    console.log('error.response:', error.response)

    t.error(error)
  })
})

test('deleting room', (t) => {
  t.plan(1)

  const { testRoom } = testContext
  const { name } = testRoom

  const updatedName = `${name}-Updated`

  hipJabber.rooms(updatedName).destroy()
    .then((room) => {
      t.ok(room instanceof Room)
    })
    .catch((error) => {
      console.log('error.response:', error.response)

      t.error(error)
    })
})
