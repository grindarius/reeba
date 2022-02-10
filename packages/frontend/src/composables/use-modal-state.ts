import { Ref, ref } from 'vue'

interface UseModalState {
  state: Ref<boolean>
  open: () => void
  close: () => void
}

export const useModalState = (): UseModalState => {
  const state = ref(false)

  const open = (): void => {
    state.value = true
  }

  const close = (): void => {
    state.value = false
  }

  return {
    state,
    open,
    close
  }
}
