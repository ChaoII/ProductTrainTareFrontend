import {defineStore} from 'pinia'
import type {UserInfo} from '@/stores/interface'

export const useUserInfo = defineStore('userInfo', {
    state: (): UserInfo => {
        return {
            username: '',
            nickname: '',
            token: '',
        }
    },
    actions: {
        removeToken() {
            this.username = ""
            this.token = ''
            this.nickname = ""
        },
        setUserInfo(data: UserInfo) {
            this.username = data.username
            this.nickname = data.nickname
            this.token = data.token
        },
        getToken() {
            return this.token
        },
    },
    persist: {
        key: "userInfo",
    },
})

export default useUserInfo
