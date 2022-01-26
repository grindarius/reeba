import got from 'got'

import { faker } from '@faker-js/faker'
import { SignupBody } from '@reeba/common'

const users = Array.from<SignupBody, SignupBody>({ length: 10 }, () => {
  const card = faker.helpers.userCard()

  return {
    username: card.username,
    email: card.email,
    password: 'asdfghjkl123'
  }
})

async function seed (): Promise<void> {
  try {
    await got.get('http://localhost:3000/').json<{ author: string, description: string }>()
  } catch (error) {
    throw new Error('server has not been yet started')
  }

  for await (const user of users) {
    try {
      const response = await got.post('http://localhost:3000/auth/signup', {
        json: user
      })

      console.log('inserting', response.request)
    } catch (error) {
      // @ts-expect-error error is unknown
      const json = error.response.json()
      throw new Error(json.message)
    }
  }
}

void seed().then(() => {
  console.log('successfully inserted 10 users')
})
