import { defineStore } from 'pinia'
import { transformTS } from '../transform'
export const useEditorStore = defineStore('editor', {
    state: () => ({
        text: '1',
    }),
    actions: {
        async transformTS(code: string) {
            const res = await transformTS(code)
            this.text = res
        },
    },
})