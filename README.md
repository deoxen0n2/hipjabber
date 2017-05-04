A promise-based HipChat NodeJS client.

> **Development status:** Room messaging and notifications are there but not other API. Since I don't have time I will just add more supported API as needed. PR is always welcome.

## Usage

```js
import HipJabber from 'hipjabber'

const hipJabber = new HipJabber({
  baseURL: 'https://[your-team-name].hipchat.com/v2',
  authToken: 'auth_token_here'
})

const name = 'Room-Name'

hipJabber.rooms(name).messages.create({
  message: 'test message from HipJabber'
})
.then((message) => {
  // Calling `#toJSON()` on any instance returned will always return the actual result
  // returned from the API. In this case, the response is described at
  // [https://www.hipchat.com/docs/apiv2/method/send_message]
  const messageJSON = message.toJSON()

  assert(typeof messageJSON.id === 'string')
  assert(typeof messageJSON.timestamp === 'string')
})
.catch((error) => {
  // All HTTP error is an error from `axios` [https://github.com/mzabriskie/axios] module.
  console.log('error.response:', error.response)
})
```

## Tests

Update `test/integration/config.js` and run:

```sh
$ yarn test-integration   # or npm run test-integration
```

# API

## Rooms

### Get all rooms

For all query parameters and response, see https://www.hipchat.com/docs/apiv2/method/get_all_rooms. Returns a promise that will be resolved to a `Rooms` instance.

```js
const query = {
  // ...
}

hipJabber.rooms.list(query)
  .then(rooms => console.log(rooms.toJSON())
```

### Create room

For all body parameters and response, see https://www.hipchat.com/docs/apiv2/method/create_room. Returns a promise that will be resolved to a `Room` instance.

```js
const name = 'Room-Name'

const body = {
  name,
  privacy: 'private',
  topic: 'Room-Topic'
}

hipJabber.rooms.create(body)
  .then(room => room.messages.create({ message: '...' })) // See `Messages` API subsection below.
```

### Get room

For all query parameters and response, see https://www.hipchat.com/docs/apiv2/method/get_room. Returns a promise that will be resolved to a `Room` instance.

```js
const name = 'Room-Name'

const body = {
  name,
  privacy: 'private',
  topic: 'Room-Topic'
}

hipJabber.rooms(name).retrieve()
  .then(room => room.messages.create({ message: '...' })) // See `Messages` API subsection below.
```

### Update room

For all body parameters and response, see https://www.hipchat.com/docs/apiv2/method/update_room. Returns a promise that will be resolved to a `Room` instance.

```js
const name = 'Room-Name'

hipJabber.rooms(name).update({
  name: `${name}-Updated`,
  privacy: 'private',
  topic: 'HipJabber Topic Updated',
  is_archived: false,
  is_guest_accessible: false,
  owner: {
    id: '4943927'
  }
})
.then(room => room.messages.create({ message: '...' })) // See `Messages` API subsection below.
```

### Delete room

For all query parameters and response, see https://www.hipchat.com/docs/apiv2/method/delete_room. Returns a promise.

```js
const name = 'Room-Name'

hipJabber.rooms(name).destroy()
  .then(() => console.log('Room deleted'))
```

## Messages

### Get room history

For all query parameters and response, see https://www.hipchat.com/docs/apiv2/method/view_room_history. Returns a promise that will be resolved to a `Messages` instance.

```js
const name = 'Room-Name'

const query = {
  // ...
}

hipJabber.rooms(name).messages.list(query)
  .then(messages => console.log(messages.toJSON())
```

### Get recent room history

For all query parameters and response, see https://www.hipchat.com/docs/apiv2/method/view_recent_room_history. Returns a promise that will be resolved to a `Messages` instance.

```js
const name = 'Room-Name'

const query = {
  // ...
}

hipJabber.rooms(name).messages.latest(query)
  .then(messages => console.log(messages.toJSON())
```

### Send message

For all body parameters and response, see https://www.hipchat.com/docs/apiv2/method/send_message. Returns a promise that will be resolved to a `Message` instance.

```js
const name = 'Room-Name'

const body = {
  message: 'Test message from HipJabber'
}

hipJabber.rooms(name).messages.create(body)
  .then(message => console.log(message.toJSON())
```

## Notifications

### Send notification

For all body parameters and response, see https://www.hipchat.com/docs/apiv2/method/send_room_notification. Returns a promise that will be resolved to a `Notification` instance.

```js
const name = 'Room-Name'

const body = {
  message: 'Test notification from HipJabber, (image by Wikipedia with https://creativecommons.org/licenses/by-sa/3.0/ license)',
  notify: false,
  card: {
    id: '1',
    style: 'image',
    title: 'Test card title',
    description: 'Test notification from HipJabber, (image by Wikipedia with https://creativecommons.org/licenses/by-sa/3.0/ license)',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
    thumbnail: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png'
    }
  }
}

hipJabber.rooms(name).notifications.create(body)
  .then(notification => console.log(notification.toJSON())
```

# License

Copyright 2017 Saran Siriphantnon &lt;deoxen0n2@gmail.com&gt; MIT License.
