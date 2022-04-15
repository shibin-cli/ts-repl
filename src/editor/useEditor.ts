import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import './userWorker'
import { onMounted, Ref } from 'vue';
export type Language = 'javascript' | 'typescript'
interface UseEditorOpts {
	value?: string
	language?: Language
	readOnly?: boolean,
	emitChange(val: string): void
}

type CrateEditorOpts = Omit<UseEditorOpts, 'emitChange'>
function createEditor(el: HTMLElement, { value = '', language = 'javascript', readOnly = false }: CrateEditorOpts) {
	return monaco.editor.create(el, {
		value: value,
		language,
		theme: 'vs-dark',
		lineNumbers: 'off',
		roundedSelection: false,
		scrollBeyondLastLine: false,
		readOnly,
	})
}
export const useEditor = (refEl: Ref<null | HTMLElement>, { value = '', language = 'javascript', readOnly, emitChange }: UseEditorOpts) => {
	let editor: monaco.editor.IStandaloneCodeEditor
	onMounted(() => {
		editor = createEditor(refEl.value as HTMLElement, {
			language,
			value,
			readOnly
		})
		editor.onDidChangeModelContent(() => {
			emitChange && emitChange(editor.getValue())
		})
	})
	function setValue(value: string){
		editor.setValue(value)
	}
	return {
		setValue
	}
}