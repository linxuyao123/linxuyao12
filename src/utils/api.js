import requests from "@/utils/request.js";


export function BusinessList (params) {
    return requests.get('/manage/shop/selectPage',{
        params: params
    })
}

// 线下交易
export function OfflineDeal  (params) {
    return requests.get('/manage/orderLog/selectPage',{
        params: params
    })
}
//商家列表
export function BusinessListings  (params) {
    return requests.get('/manage/shop/selectPage',{
        params: params
    })
}

export function setStatusFn  (params) {
    return requests.get('/manage/shop/selectPage',{
        params: params
    })
}

export function batchUnseal  (params) {
    return requests.get('/manage/shop/selectPage',{
        params: params
    })
}
