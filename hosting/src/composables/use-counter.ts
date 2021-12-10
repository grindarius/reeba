import { Ref, ref } from 'vue'

interface UseCounter {
  count: Ref<number>
  increment: () => void
  decrement: () => void
}

export const useCounter = (): UseCounter => {
  const count = ref(0)

  const increment = (): void => {
    count.value += 1
  }

  const decrement = (): void => {
    count.value -= 1
  }

  return {
    count,
    increment,
    decrement
  }
}
