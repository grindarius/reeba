<template>
  <div class="inline-block relative w-full">
    <button
      :class="colorStyle === 'black' ? 'dropdown-toggle-button black' : 'dropdown-toggle-button white'"
      @click.prevent="toggleDropdown">
      <span class="mr-1 font-sans text-lg">
        {{ buttonWord }}
      </span>
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path :fill="colorStyle === 'black' ? '#fff' : '#000'" d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </button>
    <ul
      :class="dropdownStatus ?'dropdown-list hidden' : 'dropdown-list block'">
      <li class="link-wrapper" v-for="(v, i) in values" :key="`dropdown-item-${i}`">
        <div
          :class="getDropdownClassname(v)"
          @click="onSelectedValue(v)">
          {{ v }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue'

export default defineComponent({
  name: 'r-dropdown',
  props: {
    selectedValue: {
      type: String,
      required: true,
      default: ''
    },
    values: {
      type: Object as PropType<Array<string>>,
      required: true,
      default: [] as Array<string>
    },
    colorStyle: {
      type: String as PropType<'black' | 'white'>,
      required: true,
      default: 'black'
    }
  },
  emits: ['update:selectedValue'],
  setup (props, context) {
    const localSelectedValue = ref(props.selectedValue)
    const dropdownStatus: Ref<boolean> = ref(true)

    const toggleDropdown = (): void => {
      dropdownStatus.value = !dropdownStatus.value
    }

    const closeDropdown = (): void => {
      dropdownStatus.value = false
    }

    const updateSelectedValue = (): void => {
      context.emit('update:selectedValue', localSelectedValue.value)
    }

    const onSelectedValue = (newValue: string): void => {
      localSelectedValue.value = newValue
      updateSelectedValue()
    }

    const buttonWord = computed((): string => {
      return localSelectedValue.value
    })

    const getDropdownClassname = (v: string): string => {
      if (props.selectedValue != null && v === localSelectedValue.value) {
        return props.colorStyle === 'black' ? 'dropdown-selector selected-black' : 'dropdown-selector selected-white'
      }
      return props.colorStyle === 'black' ? 'dropdown-selector not-selected-black' : 'dropdown-selector not-selected-white'
    }

    return {
      dropdownStatus,
      toggleDropdown,
      localSelectedValue,
      onSelectedValue,
      buttonWord,
      closeDropdown,
      getDropdownClassname
    }
  }
})
</script>

<style scoped lang="scss">
.link-wrapper:first-child > div {
  @apply rounded-t;
}

.link-wrapper:last-child > div {
  @apply rounded-b;
}

.selected-black {
  @apply bg-slate-700 text-white;
}

.not-selected-black {
  @apply bg-slate-900 text-white;
}

.selected-white {
  @apply bg-zinc-300 text-black;
}

.not-selected-white {
  @apply bg-white text-black;
}

.dropdown-toggle-button {
  @apply inline-flex justify-between items-center py-2 px-4 w-full h-9 font-sans rounded-lg;
}

.black {
  @apply text-white outline-none bg-slate-900;
}

.white {
  @apply rounded-xl shadow-lg outline-none focus:ring-2 text-pale-gray shadow-zinc-900 focus:ring-pale-gray bg-white;
}

.dropdown-list {
  @apply absolute pt-1 font-sans text-black filter drop-shadow-xl w-full;
}

.dropdown-selector {
  @apply block py-2 px-4 whitespace-nowrap cursor-pointer;
}
</style>
