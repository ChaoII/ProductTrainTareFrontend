import {userListApi} from "@/api/users";

export interface LoginReq {
    username: string,
    password: string
}

export interface QueryInterface {
    searchName: string,
    pageSize: number,
    pageIndex: number
}

export interface AddUserInterface {
    username: string,
    password: string,
    nickname: string
}

export interface EditUserInterface {
    id: string
    username: string,
    nickname: string
}

export interface DeleteUserInterface {
    id: string
}

export interface GetComingTimeInterface {
    startTime: any,
    endTime: any
}

export interface GetHistoryInterface {
    trainId: string,
    pageSize: number,
    pageIndex: number
}

export interface SettingFormInterface {
    distanceSteel: number
    distanceCamera: number
    cameraAddress: string
}

export interface ModifyPasswordInterface {
    username:string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
