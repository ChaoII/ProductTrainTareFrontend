import {post, get, put, del} from "@/utils/service"
import type {GetComingTimeInterface, GetHistoryInterface} from "@/api/interface";

export const getComingTimeApi = (data: GetComingTimeInterface) => {
    return post({
        url: "/train/coming_time",
        data: data
    })
}

export const getHistoryApi = (data: GetHistoryInterface) => {
    return post({
        url: "/train/history",
        data: data
    })
}



