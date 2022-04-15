<script setup lang="ts">
import Editor from './editor/index.vue'
import { useEditorStore } from '@/store/index'
import { Component, onMounted, Ref, ref } from 'vue'
import { debounce } from '@/utils'
const text = ref('')
const output:Ref<InstanceType<typeof Editor> | null> = ref(null)
const editorStore = useEditorStore()

const onChange = debounce(async (val:string) => {
   await editorStore.transformTS(val)
    console.log(editorStore.text)
    output.value?.setValue(editorStore.text)
}, 250)
onMounted(() =>{

})
</script>

<template>
    <div class="playground-container">
        <div class="ts-editor">
            <Editor language="typescript" @change="onChange" />
        </div>
        <div class="js-editor">
            <Editor language="javascript" :readOnly="true" ref="output"/>
        </div>
    </div>
</template>

<style>
.playground-container {
    display: flex;
}

.ts-editor,
.js-editor {
    flex: 1;
}
</style>
