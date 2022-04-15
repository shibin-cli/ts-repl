<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useEditor, Language } from './useEditor'

const emit = defineEmits<(e: 'change', value: string) => void>()
const props = defineProps<{
    language?: Language
    value?: string,
    readOnly?: boolean
}>()

const editorRef: Ref<HTMLElement | null> = ref(null)
function emitChange(value: string) {
    emit('change', value)
}

const { setValue } = useEditor(editorRef, {
    language: props.language,
    value: props.value,
    readOnly: props.readOnly,
    emitChange
})
defineExpose({ setValue })


</script>

<template>
    <h1>{{ props.language }} editor</h1>
    <div class="editor" ref="editorRef"></div>
</template>

<style>
.editor {
    height: 700px;
}
</style>
