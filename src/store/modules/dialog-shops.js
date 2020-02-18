import {
    ON_OFF_DIALOG_SHOPS,
    SET_DIALOG_SHOPS,
    SELECT_SHOPS,
    SET_DIALOG_SEL_SHOPS,
    REMOVE_SELECT_SHOPS,
    CLEAR_SEL_SHOPS
} from "../mutation-type"

import Vue from 'vue'

import {
    Loading,
    Message
} from "element-ui"

import { apiDialogShops } from "config"

let loadingInstance
const state = {
    /**
     * 商品库商品列表
     * 
     * @type {Array}
     */
    goodsList: [],
    /**
     * 选中商品库列表
     * 
     * @type {Array}
     */
    selGoodsList: [],
    /**
     * dialogGoods 相关配置
     * 
     * @type {Object}
     */
    settingType: {
        bShowDialog: false,
        total: 0,
        pageSize: 0,
        currentPage: 0,
        modulesIndex: -1,
        catId: 0,
        brandId: 0,
        type: '',
        brandSelect: '',
        selGoodNum: 0
    },
    /**
     * dialogGoods 已选择商品的相关配置
     * 
     * @type {Object}
     */
    selectGoodsType: {
        total: 0,
        pageSize: 0,
        currentPage: 1
    }
}

const mutations = {
    /**
     * 显示隐藏dialogGoods
     * 
     * @param {*} state 
     * @param {* Object} o 
     */
    [ON_OFF_DIALOG_SHOPS](state, o) {
        if (o.bShowDialog) {
            state.settingType.bShowDialog = o.bShowDialog
            state.settingType.modulesIndex = o.modulesIndex
            state.settingType.brandSelect = o.brandSelect
            state.settingType.currentPage = o.currentPage
            state.settingType.catId = o.catId
            state.settingType.type = o.type
            state.settingType.pageSize = o.pageSize
        } else {
            state.settingType.bShowDialog = o.bShowDialog
        }
    },

    /**
     * 将goods列表赋值给goodsList
     * 
     * @param {* Object} state 
     * @param {* Object} o 
     */
    [SET_DIALOG_SHOPS](state, o) {
        let { rootState: { modules } } = o,
            selectShopsId = []
        if (modules[o.modulesIndex].data.allValue.selectShopsId) {
            selectShopsId = modules[o.modulesIndex].data.allValue.selectShopsId
        } else {
            modules[o.modulesIndex].data.allValue = { ...modules[o.modulesIndex].data.allValue, selectShopsId: [] }
        }
        o.list.map(item => {
            selectShopsId.map(itemId => {
                if (item.goods_id == itemId) {
                    item.bActive = true
                }
            })
        })
        state.goodsList = o.list
        state.settingType.total = o.total
    },

    /**
     * 点击选择商品库选中并将选中id放入selectShopsId中便于调用选中商品
     * 
     * @param {*} state 
     * @param {*} o 
     */
    [SELECT_SHOPS](state, o) {
        
        let { rootState: { modules } } = o,
            modulesIndex = state.settingType.modulesIndex,
            allValue = modules[modulesIndex].data.allValue
            console.log('select')
            console.log(modulesIndex)
        if(state.goodsList.length <= 30){
            if (!state.goodsList[o.index].bActive) {
                Vue.set(state.goodsList, o.index, {
                    ...state.goodsList[o.index],
                    bActive: true
                })
                allValue.selectShopsId.push(state.goodsList[o.index].goods_id)
            } else {
                state.goodsList[o.index].bActive = false
                let len = allValue.selectShopsId.length
                for (let i = 0; i < len; i++) {
                    if (state.goodsList[o.index].goods_id == allValue.selectShopsId[i]) {
                        allValue.selectShopsId.splice(i, 1)
                        break;
                    }
                }
            }
        }
    },
    /**
     * 获取已选择商品列表并赋值给selGoodsList
     * 
     * @param {* Object} state 
     * @param {* Object} o 
     */
    [SET_DIALOG_SEL_SHOPS](state, o) {
        state.selectGoodsType.pageSize = o.pageSize
        state.selectGoodsType.currentPage = o.currentPage
        state.selGoodsList = o.product
    },
    /**
     * 移除当前选中商品
     * 
     * @param {*} state 
     * @param {* Object} o - 移除当前商品的索引和 goodsId
     */
    [REMOVE_SELECT_SHOPS](state, o) {
        let {
            goodsId,
            pageSize,
            currentPage,
            modulesIndex,
            rootState: {
                modules
            }
        } = o,
            selectShopsId = modules[modulesIndex].data.allValue.selectShopsId,
            len = selectShopsId.length
        for (let i = 0; i < len; i++) {
            if (selectShopsId[i] == goodsId) {
                selectShopsId.splice(i, 1)
            }
        }
    },
    /**
     * 清空选中商品
     * 
     * @param {*} state 
     */
    [CLEAR_SEL_SHOPS](state, o) {
        let {
            modulesIndex,
            rootState: {
                modules
            }
        } = o
        modules[modulesIndex].data.allValue.selectShopsId = []

    }
}

const actions = {
    onOffDialogGoods({ commit }, o) {
        commit(ON_OFF_DIALOG_SHOPS, o)
    },
    setDialogGoods({ commit, rootState }, o) {
        loadingInstance = Loading.service({ target: "body", text: "加载中……" })
        apiDialogShops.getShops(o).then((e) => {
            let res = {
                "data": [
                    {
                        "shop_name": "农联自营",
                        "shop_logo": "",
                        "ru_id": "0"
                    },
                    {
                        "shop_name": "龙祥果业",
                        "shop_logo": "https://oss.nlyz365.com/images/seller/seller_logo/seller_logo2942.JPG?x-oss-process=image/resize,m_lfit,w_100,h_100",
                        "ru_id": "2942"
                    },
                    {
                        "shop_name": "成都天一绿科生态农业有限公司",
                        "shop_logo": "",
                        "ru_id": "2908"
                    },
                    {
                        "shop_name": "成都市璇祺商贸有限公司",
                        "shop_logo": "https://oss.nlyz365.com/images/seller/seller_logo/seller_logo2762.jpg?x-oss-process=image/resize,m_lfit,w_100,h_100",
                        "ru_id": "2762"
                    },
                    {
                        "shop_name": "小龙蔬菜",
                        "shop_logo": "",
                        "ru_id": "2994"
                    },
                    {
                        "shop_name": "李哥连藕",
                        "shop_logo": "",
                        "ru_id": "2998"
                    },
                    {
                        "shop_name": "邛崃市盛丰源家庭农场",
                        "shop_logo": "",
                        "ru_id": "3000"
                    },
                    {
                        "shop_name": "老晋辣椒批发",
                        "shop_logo": "",
                        "ru_id": "3003"
                    },
                    {
                        "shop_name": "河北山药产地直销",
                        "shop_logo": "",
                        "ru_id": "3014"
                    },
                    {
                        "shop_name": "高原红土豆批发pdl",
                        "shop_logo": "https://oss.nlyz365.com/b2b/wap/wxbd23b95c07d4b7cb0606ad7d12a7501a.png?x-oss-process=image/resize,m_lfit,w_100,h_100",
                        "ru_id": "3018"
                    }
                ],
                "total":10,
                "msg": "已获取数据",
                "code": 0
            };

            let list  = actions.setNewShops(res.data),
                total = res.data.length;
            commit(SET_DIALOG_SHOPS, {
                rootState,
                modulesIndex: o.modulesIndex,
                list,
                total
            })
            
            commit(ON_OFF_DIALOG_SHOPS, o)
            setTimeout(() => {
                loadingInstance.close()
            }, 100)
        })
    },
    setDialogSelGoods({ commit }, o) {
        apiDialogShops.getShopsSel(o).then(({ data: { product } }) => {
            commit(SET_DIALOG_SEL_SHOPS, {
                ...o,
                product
            })
        })
    },
    selectGoods({ commit, rootState }, o) {
        console.log('select')
        console.log(o)
        commit(SELECT_SHOPS, {
            ...o,
            rootState
        })
    },
    removeSelect({ commit, dispatch, rootState }, o) {
        commit(REMOVE_SELECT_SHOPS, {
            ...o,
            rootState
        })
    },
    clearSelGoods({ commit, rootState }, o) {
        commit(CLEAR_SEL_SHOPS, {
            ...o,
            rootState
        })
    },
    setNewShops(res){
        let list = [];
        res.map((v,k)=>{
            let data = {
                comments_number: "0",
                goods_brief: "",
                goods_id: v.ru_id,
                goods_img: v.shop_logo,
                goods_name: v.shop_name,
                goods_name_style: "+",
                goods_thumb: v.shop_logo,
                is_best: "1",
                is_hot: "1",
                is_new: "1",
                is_promote: "0",
                market_price: "360.00",
                promote_end_date: "0",
                promote_start_date: "0",
                sales_volume: "12",
                self_run: null,
                user_id: "0",
            }
            list.push(data);
        })
        
        return list
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}