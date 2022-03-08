import { computed, ComputedRef, Ref, ref } from 'vue'
import { meaningOfLife } from '@reeba/common'

import { defineStore } from 'pinia'
interface UseCounter {
  count: Ref<number>
  increment: () => void
  decrement: () => void
  life: ComputedRef<number>
}

export const useCounterStore = defineStore('main', {
  state: () => ({
    counter: 0,
    name: 'app'
  }),
  getters: {
    doubleCount: state => {
      state.counter * 2;
    }
  },
  actions: {
    reset () {
      this.counter = 0;
    },
    addOne () {
      this.counter++;
    }
  }
});

export const useCounter = (): UseCounter => {
  const count = ref(0)

  const increment = (): void => {
    count.value += 1
  }

  const decrement = (): void => {
    count.value -= 1
  }

  const life = computed(() => {
    return meaningOfLife
  })

  return {
    count,
    increment,
    decrement,
    life
  }
}
