import { atom } from 'jotai'

// const tokenAtom = atom<string>(() => localStorage.getItem('token') || '')
const tokenAtom = atom<string>(localStorage.getItem('token') || '')

export default tokenAtom