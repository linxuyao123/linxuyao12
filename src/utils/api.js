import requests from "@/utils/request.js";


export function BusinessList (params) {
    return requests.get('/manage/shop/selectPage',{
        params: params
    })
}


export function setStatusFn  (params) {
    return requests.get('/manage/shop/selectPage',{
        params: params
    })
}



export function NumList  (params) {
    return requests.get('/brand/list',{
        params: params
    })
}
//
export function productCategory (params) {
    return requests.get('/productCategory/list/0',{
        params: params
    })
}
//订单设置
export function orderSetting (params) {
    return requests.get('/orderSetting/1',{
        params: params
    })
}

//订单列表
export function orderList (params) {
    return requests.get('/order/list/',{
        params: params
    })
}
//删除按钮
export function deleteOrder (params) {
    return requests.post('/order/delete', params)
}

//获取退货申请的表格
export function returnApply (params) {
    return requests.get('/returnApply/list/',{
        params: params
    })
}
export function deleteApply (params) {
    return requests.post('/returnApply/delete', params)
}

export function fetchList (params) {
    return requests.get('returnReason/list/',{
        params: params
    })
}
export function getReasonDetail (params) {
    return requests.post('returnReason/update/1',params)
}

export function flashList (params) {
    return requests.get('flash/list/',{
        params: params
    })
}

export function flashSession (params) {
    return requests.get('flashSession/list/',{
        params: params
    })
}

export function fetchSelectList (params) {
    return requests.get('flashSession/selectList',{
        params: params
    })
}
export function productRelationList (params) {
    return requests.get('flashProductRelation/list',{
        params: params
    })
}

export function couponList (params) {
    return requests.get('coupon/list',{
        params: params
    })
}
export function couponHistoryList (params) {
    return requests.get('couponHistory/list',{
        params: params
    })
}