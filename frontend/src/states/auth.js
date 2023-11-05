import { atom } from 'jotai'

const tokenAtom = atom(() => localStorage.getItem('token') ?? '')

export default tokenAtom
