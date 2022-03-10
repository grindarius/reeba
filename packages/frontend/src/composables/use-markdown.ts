import MarkdownIt from 'markdown-it'
// @ts-expect-error no definitelytyped module
import abbr from 'markdown-it-abbr'
import emoji from 'markdown-it-emoji'
import { computed, ComputedRef, Ref, ref } from 'vue'

interface UseMarkdown {
  markdown: Ref<MarkdownIt>
  renderMarkdown: ComputedRef<string>
}

export const useMarkdown = (description: string): UseMarkdown => {
  const markdown = ref(
    new MarkdownIt('default', {
      breaks: true,
      linkify: true,
      typographer: true,
      html: true
    })
      .use(emoji)
      .use(abbr)
  )
  const renderMarkdown = computed(() => {
    return markdown.value.render(description)
  })

  return {
    markdown,
    renderMarkdown
  }
}
