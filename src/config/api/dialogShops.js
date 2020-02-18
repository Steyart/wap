import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'


/**
 * 获取 shops 列表
 * 
 * @param {object} o - 传递过来的配置信息
 * @return 返回一个 promise 
 */
function getShops(o, oF){
    return axios.post(getUrl(`console&c=${window.apiAuthority}&a=storeList`),qs.stringify({
        page_size:o.pageSize || 15,
        keyword:o.kwords || '',
        page:o.currentPage || 1
    }))
}

/**
 *获取 选中的 shops 列表
 *  
 * @param {Object} o - 请求信息 
 */
function getShopsSel(o){
    return axios.post(getUrl(`console&c=view&a=storeList`),qs.stringify({
        ids :o.selectShopsId || '',
        display_goods_number:o.number,
        region_id:o.region_id,
        category_id:o.category_id,
        order:o.order,
        is_promote:o.is_promote
    }))
}

export default{
    getShops,
    getShopsSel
}