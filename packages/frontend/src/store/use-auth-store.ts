import ky from 'ky'
import { defineStore } from 'pinia'

import { SigninBody, SigninReplyBody, SignupBody } from '@reeba/common'

import { signin as signinEndpoint, signup as signupEndpoint } from '@/api/endpoints'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    const isAuthenticated: boolean = Object.keys(JSON.parse(localStorage.getItem('reebaUser') ?? '{}')).length !== 0
    const userData: SigninReplyBody = JSON.parse(localStorage.getItem('reebaUser') ?? '{}')

    return {
      isAuthenticated,
      userData
    }
  },
  actions: {
    async signin (body: SigninBody): Promise<void> {
      const { method, url } = signinEndpoint

      try {
        const response = await ky(url, {
          method,
          json: body
        }).json<SigninReplyBody>()

        this.userData = response
        this.isAuthenticated = true
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error.response.json()
        throw new Error(json.message)
      }
    },
    async signup (body: SignupBody): Promise<void> {
      const { method, url } = signupEndpoint

      try {
        await ky(url, {
          method,
          json: body
        })
      } catch (error) {
        // @ts-expect-error error is unknown
        const json = await error.response.json()
        throw new Error(json.message)
      }
    },
    signout (): void {
      localStorage.clear()
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      this.userData = {} as SigninReplyBody
      this.isAuthenticated = false
    }
  }
})
