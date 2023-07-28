import {post, get, put, del} from "@/utils/service"
import type {LoginReq, UserListReq} from "@/api/interface";

export const loginApi = (data: LoginReq) => {
    return post({
        url: "/user/login",
        data: data
    })
}
// 获取用户列表
export const userListApi = (data: UserListReq) => {
    return get({
        url: "/user/getUser",
        data: data
    })
}

// 新增用户列表
export const userAddApi = data => {
    return put({
        url: "/user/addUser",
        data
    })
}
//  用户列表更改状态
export const userEditApi = data => {
    return post({
        url: "user/editUser",
        data
    })
}

// 删除用户
export const userDeleteApi = data => {
    return del({
        url: "user/delUser",
        data
    })
}


export const attendInfoListApi = data => {
    return post({
        url: "attend/getAttendInfos",
        data
    })

}
export const faceListApi = data => {
    return get({
        url: "attend/getFaceLibraries",
        data
    })
}

export const addFaceApi = data => {
    return put({
        url: "attend/addFaceLibs",
        data
    })
}

export const deleteFaceApi = data => {
    return del({
        url: "attend/deleteFace",
        data
    })
}

export const restartApi = data => {
    return get({
        url: "attend/restart",
    })
}


