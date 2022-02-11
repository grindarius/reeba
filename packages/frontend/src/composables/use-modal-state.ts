import { Ref, ref } from 'vue'

interface UseModalState {
  state: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

export const useModalState = (): UseModalState => {
  const state = ref(false)

  const open = (): void => {
    state.value = true
  }

  const close = (): void => {
    state.value = false
  }

  const toggle = (): void => {
    state.value = !state.value
  }

  return {
    state,
    open,
    close,
    toggle
  }
}
