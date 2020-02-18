<template>
    <section>
        <div :style="{'background-color':oPosition.backgroundColor}">
            <div v-if="data.isStyleSel == '0'" class="sort-box">
                <div class="dflex space-between align-items screen-box" v-if="!preview">
                    <div class="dflex align-items">
                        <span>品类</span>
                        <svg t="1581664921213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1105" width="14" height="14"><path d="M163.446154 275.692308h697.107692c19.692308 0 33.476923 25.6 17.723077 43.323077L537.6 736.492308c-11.815385 15.753846-37.415385 15.753846-49.230769 0L143.753846 319.015385c-13.784615-17.723077-1.969231-43.323077 19.692308-43.323077z" p-id="1106"></path></svg>
                    </div>
                    <div class="dflex align-items">
                        <span>全城</span>
                        <svg t="1581664921213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1105" width="14" height="14"><path d="M163.446154 275.692308h697.107692c19.692308 0 33.476923 25.6 17.723077 43.323077L537.6 736.492308c-11.815385 15.753846-37.415385 15.753846-49.230769 0L143.753846 319.015385c-13.784615-17.723077-1.969231-43.323077 19.692308-43.323077z" p-id="1106"></path></svg>
                    </div>
                    <div class="dflex align-items">
                        <span>排序</span>
                        <svg t="1581664921213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1105" width="14" height="14"><path d="M163.446154 275.692308h697.107692c19.692308 0 33.476923 25.6 17.723077 43.323077L537.6 736.492308c-11.815385 15.753846-37.415385 15.753846-49.230769 0L143.753846 319.015385c-13.784615-17.723077-1.969231-43.323077 19.692308-43.323077z" p-id="1106"></path></svg>
                    </div>
                </div>
                <div class="dflex space-between align-items screen-box" v-else>
                    <div :class="['dflex align-items',{'down-up':pinlei_show}]" @click="pinlei">
                        <span>品类</span>
                        <svg t="1581664921213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1105" width="14" height="14"><path d="M163.446154 275.692308h697.107692c19.692308 0 33.476923 25.6 17.723077 43.323077L537.6 736.492308c-11.815385 15.753846-37.415385 15.753846-49.230769 0L143.753846 319.015385c-13.784615-17.723077-1.969231-43.323077 19.692308-43.323077z" p-id="1106"></path></svg>
                    </div>
                    <div :class="['dflex align-items',{'down-up':quancheng_show}]" @click="quancheng">
                        <span>全城</span>
                        <svg t="1581664921213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1105" width="14" height="14"><path d="M163.446154 275.692308h697.107692c19.692308 0 33.476923 25.6 17.723077 43.323077L537.6 736.492308c-11.815385 15.753846-37.415385 15.753846-49.230769 0L143.753846 319.015385c-13.784615-17.723077-1.969231-43.323077 19.692308-43.323077z" p-id="1106"></path></svg>
                    </div>
                    <div :class="['dflex align-items',{'down-up':paixu_show}]" @click="paixu">
                        <span>排序</span>
                        <svg t="1581664921213" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1105" width="14" height="14"><path d="M163.446154 275.692308h697.107692c19.692308 0 33.476923 25.6 17.723077 43.323077L537.6 736.492308c-11.815385 15.753846-37.415385 15.753846-49.230769 0L143.753846 319.015385c-13.784615-17.723077-1.969231-43.323077 19.692308-43.323077z" p-id="1106"></path></svg>
                    </div>
                </div>
                <div class="pinlei-box" v-show="pinlei_show">
                    <div class="pinlei-li" @click="pinleiPost(1)">毛菜</div>
                    <div class="pinlei-li" @click="pinleiPost(2)">净菜</div>
                </div>
                <div class="paixu-box" v-show="paixu_show">
                    <div class="paixu-li" @click="paixuPost(0)">推荐排序</div>
                    <div class="paixu-li" @click="paixuPost(1)">销量优先</div>
                </div>
            </div>
            
            <div class="quick-screening dflex" v-if="preview">
                <div v-if="isRecommendShop" @click="recommendShop">
                    推荐店铺
                </div>
                <div v-if="isDiscountShop" @click="discountShop">
                    优惠
                </div>
                <div v-if="isPromptly" @click="promptly">
                    及时送
                </div>
                <div v-if="isNextDay" @click="nextDay">
                    次日送
                </div>
            </div>
            <div class="quick-screening dflex" v-else>
                <div v-if="isRecommendShop">
                    推荐店铺
                </div>
                <div v-if="isDiscountShop">
                    优惠
                </div>
                <div v-if="isPromptly">
                    及时送
                </div>
                <div v-if="isNextDay">
                    次日送
                </div>
            </div>
            <ul class="shop-list" >
                <li v-for="(item, index) in oProlist" :key="index" :style="{'margin': marginClass}">
                    <div class="shop-info">
                        <a v-href="{sUrl:getShopUrl(item.shop_id),preview}">
                            <div class="dflex">
                                <div :class="['shop-logo',radiusClass]">
                                    <img src="../../assets/images/default-img.jpg" v-if="preview" />
                                    <img v-lazy="(item.logo_thumb || item.street_thumb)" v-else/>
                                </div>
                                <div class="shop-attr">
                                    <div :class="['shop-info-title',titClass]">{{item.rz_shopname || '商品名称'}}</div>
                                    <div class="dflex shop-info-alt">
                                        <div class="shop-alt-score dflex align-items" v-if="isScore">
                                            <img src="../../assets/images/star.png" alt="">
                                            <span>{{item.store_score || '4.5'}}</span>
                                        </div>
                                        <div class="shop-alt-sales dflex align-items" v-if="isSales">销量：{{item.total}}</div>
                                        <div class="shop-alt-address dflex align-items" v-if="isAddress">{{item.district || "地区"}}</div>
                                    </div>
                                    <div class="shop-info-discount" v-if="isDiscount">
                                        <div class="dflex align-items">
                                            <div class="discount-label">优惠</div>
                                            <div class="discount-content">满50减10，满100减30</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="shop-recommend" v-if="isGoods">
                        <div class="shop-recommend-label">推荐商品</div>
                        <div class="shop-recommend-goods dflex" v-if="preview">
                            <div class="recommend-goods-lists">
                                <a href="javascript:;" >
                                    <img src="../../assets/images/default-img.jpg" />
                                    <div class="goods-lists-name">商品名称</div>
                                    <div class="goods-lists-price">&yen;10.00</div>
                                </a>
                            </div>
                        </div>
                        <div class="shop-recommend-goods dflex" v-else>
                            <div class="recommend-goods-lists" v-for="(gItem,gIndex) in item.goods" :key="gIndex">
                                <a v-href="{sUrl:getGoodUrl(gItem.goods_id),preview}" >
                                    <img v-lazy="(gItem.img || gItem.goods_thumb)" />
                                    <div class="goods-lists-name">{{gItem.goods_name}}</div>
                                    <div class="goods-lists-price">{{gItem.shop_price}}</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
// mapActions mapState
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
// node library
import qs from 'qs'
// custom components
import ScrollProlist from '../element/ScrollProlist'

// third party components
import { swiper, swiperSlide } from 'vue-awesome-swiper'

//getShopsSel
import dialogShops from 'config/api/dialogShops'
//mixins
import frontendGet from "mixins/frontend-get"

export default {
    name: 'product',
    props: ['data', 'preview'],
    mixins: [frontendGet],
    // mixins: [getShopsSel],
    components: {
        swiper,
        swiperSlide,
        ScrollProlist
    },
    render(createElement, context) {
        return createElement()
    },
    data() {
        return {
            nSearchOpacity: 1,
            previewProlist: [
                {
                    
                },
                {
                    
                }
            ],
            prolist: [],
            paixu_show:false,
            quancheng_show:false,
            pinlei_show:false,

            goodsLength:4,//店铺下推荐商品数量，默认为4
            region_id:0,//地区id
            category_id:0,//分类id  目前等同 次日到（毛菜）和 （及时达）净菜
            order:0,//排序方式 0- 默认  1-销量
            is_promote:0,//推荐店铺  1 推荐店铺 0 全部
        }
    },
    created() {},
    mounted() {
        setTimeout(() => {
            if (this.selectShopsId.length > 0) {
                dialogShops
                    .getShopsSel({
                        number: this.goodsLength,
                        selectShopsId: this.selectShopsId,
                        region_id:this.region_id,
                        category_id:this.category_id,
                        order:this.order,
                        is_promote:this.is_promote,
                    })
                    .then(({ data: { store } }) => {
                        this.prolist = store
                    })
            } else {
                this.$http
                    .post(
                        this.url(`console&c=view&a=storeList`),
                        qs.stringify({
                            number: this.goodsLength,
                            ids: [],
                            region_id:this.region_id,
                            category_id:this.category_id,
                            order:this.order,
                            is_promote:this.is_promote,
                        })
                    )
                    .then(({ data: { store } }) => {
                        store && store.length > 0
                            ? (this.prolist = store)
                            : (this.prolist = [])
                    })
            }
        }, 100)
    },
    methods: {
        /* 及时送 */
        promptly() {
            console.log('promptly');
            /* Vue.prototype.$post('',{}).then((res)=>{

            }); */
        },
        /* 次日送 */
        nextDay() {
            console.log('nextDay');
            /* Vue.prototype.$post('',{}).then((res)=>{

            }); */
        },
        /* 优惠店铺 */
        discountShop() {
            console.log('discountShop');
            /* Vue.prototype.$post('',{}).then((res)=>{

            }); */
        },
        /* 推荐店铺 */
        recommendShop() {
            let data = {
                number: this.goodsLength,
                ids: this.selectShopsId || [],
                region_id:this.region_id,
                category_id:this.category_id,
                order:this.order,
                is_promote:this.is_promote,
            }
            if(this.is_promote == 1){
                this.is_promote = 0;
                data.is_promote = 0;
            }else{
                this.is_promote = 1;
                data.is_promote = 1;
            }
            this.getShopList(data);
        },
        /* 品类 */
        pinlei() {
            console.log('pinlei');
            this.paixu_show = false;
            this.quancheng_show = false;
            if(this.pinlei_show){
                this.pinlei_show = false;
            }else{
                this.pinlei_show = true;
            }
        },
        pinleiPost(key){
            let data = {
                number: this.goodsLength,
                ids: this.selectShopsId || [],
                region_id:this.region_id,
                category_id:this.category_id,
                order:this.order,
                is_promote:this.is_promote,
            }
            this.order = 0;
            data.order = 0;
            this.category_id = key;
            data.category_id = key;
            this.getShopList(data);
        },
        /* 全城 */
        quancheng() {
            console.log('quancheng');
            this.paixu_show = false;
            if(this.quancheng_show){
                this.quancheng_show = false;
            }else{
                this.quancheng_show = true;
            }
            this.pinlei_show = false;
        },
        /* 排序 */
        paixu() {
            if(this.paixu_show){
                this.paixu_show = false;
            }else{
                this.paixu_show = true;
            }
            this.quancheng_show = false;
            this.pinlei_show = false;
        },
        paixuPost(key){


            let data = {
                number: this.goodsLength,
                ids: this.selectShopsId || [],
                region_id:this.region_id,
                category_id:this.category_id,
                order:this.order,
                is_promote:this.is_promote,
            }
            this.category_id = 0;
            data.category_id = 0;
            this.order = key;
            data.order = key;
            this.getShopList(data);
        },
        /* 店铺详情 */
        getShopUrl(id) {
            return `${window.ROOT_URL}index.php?m=store&a=shop_info&id=${id}`
        },
        /* 商品详情 */
        getGoodUrl(id) {
            return `${window.ROOT_URL}index.php?m=store&a=shop_info&id=${id}`
        },
        /* 店铺列表 */
        getShopList(data){
            this.$http.post(
                this.url(`console&c=view&a=storeList`),
                qs.stringify(data)
            )
            .then(({ data: { store } }) => {
                store && store.length > 0
                    ? (this.prolist = store)
                    : (this.prolist = [])
            })
        }
    },
    computed: {
        localHttp() {
            return !this.release ? `${window.ROOT_PIC}` : window.PC_URL
        },
        selectShopsId() {
            return this.data.allValue.selectShopsId || []
        },
        brandSelect() {
            return this.data.allValue.brandSelect
        },
        catId() {
            let arr = [],
                len = 0
            this.data.allValue.categorySOption
                ? (arr = this.data.allValue.categorySOption.split(','))
                : (arr = [])
            len = arr.length
            return arr[len - 1]
        },
        oProlist() {
            if (this.preview) {
                console.log(222);
                return this.previewProlist
            } else {
                console.log(111);
                return this.prolist
            }
        },
        bPreview() {
            return this.preview
        },
        isRecommendShop() {
            return this.data.typeSelList.indexOf('0') != -1 ? true : false
        },
        isDiscountShop() {
            return this.data.typeSelList.indexOf('1') != -1 ? true : false
        },
        isPromptly() {
            return this.data.typeSelList.indexOf('2') != -1 ? true : false
        },
        isNextDay() {
            return this.data.typeSelList.indexOf('3') != -1 ? true : false
        },
        isScore() {
            return this.data.tagSelList.indexOf('0') != -1 ? true : false
        },
        isSales() {
            return this.data.tagSelList.indexOf('1') != -1 ? true : false
        },
        isGoods() {
            return this.data.tagSelList.indexOf('2') != -1 ? true : false
        },
        isDiscount() {
            return this.data.tagSelList.indexOf('3') != -1 ? true : false
        },
        isAddress() {
            return this.data.tagSelList.indexOf('4') != -1 ? true : false
        },
        
        radiusClass() {
            let radiusStyleSel = this.data.isRadiusStyleSel,
                arr = []
            // if (this.preview) arr.push('preview')
            switch (radiusStyleSel) {
                case '0':
                    arr.push('radius-unset')
                    break
                case '1':
                    arr.push('radius-10px')
                    break
                default:
                    break
            }
            return arr
        },
        titClass() {
            let textStyleSel = this.data.isTextStyleSel,
                arr = [];
            // if (this.preview) arr.push('preview')
            switch (textStyleSel) {
                case '0':
                    arr.push('textSmall')
                    break
                case '1':
                    arr.push('textBig')
                    break
                default:
                    break
            }
            return arr
        },

        marginClass() {
            let marginStyleSel = `${this.data.isMarginStyleSel}px 0`;
            return marginStyleSel
        },
        
        sBgColor() {
            return this.getText({
                dataNext: "allValue",
                attrName: "bgColor",
                defaultValue: "#ff495e"
            })
            /* return this.getText({
                dataNext: "allValue",
                attrName: "bgColor",
                defaultValue: "#ff495e"
            }) */
        },
        oPosition() {
            let o = {}
            let aRgbVal = this.sBgColor.colorRgb(0, true)
            o.backgroundColor = `rgba(${aRgbVal[0]},${aRgbVal[1]},${aRgbVal[2]},${this.nSearchOpacity})`
            console.log(o);
            return o
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.screen-box{
    height: 40px;
    background-color: #fff;
    border-bottom: 1px solid #e7ecec;
}
.quick-screening{
    background-color: #e7ecec;
    padding: 10px 12px;
}
.sort-box{
    position: relative;
    .paixu-box,.pinlei-box{
        position: absolute;
        top: 41px;
        left: 0;
        padding: 0 12px;
        background-color: #fff;
        width: 100%;
        .paixu-li,.pinlei-li{
            height: 40px;
            line-height: 40px;
        }
    }
}
.screen-box div{
    cursor: pointer;
    width: 33%;
    justify-content: center;
    
}
.screen-box .down-up {
    .icon{
        transform: rotate(180deg);
    }
}
.quick-screening div{
    border-radius: 5px;
    padding: 2px 5px;
    background-color: #fff;
    color: #000;
    margin-right: 5px;
    cursor: pointer;
}
.shop-list {
    overflow: hidden;
}
.shop-list{ 
    li{
        margin: 0 12px 10px;
        background-color: #fff;
        border-radius: 5px;
        padding: 10px 10px;
        .shop-info{
            a{
                display: block;
                color: #666;
            }
            .shop-logo{
                min-width: 50px;
                min-height: 50px;
                width: 50px;
                height: 50px;
                display: block;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            .shop-logo.radius-10px{
                border-radius: 5px;
            }
            .shop-logo.radius-unset{
                border-radius: unset;
            }
            .shop-attr{
                width: 100%;
                margin-left: 10px;
                .shop-info-title{
                    font-size: 16px;
                }
                .shop-info-title.textSmall{
                    font-weight: normal;
                }
                .shop-info-title.textBig{
                    font-weight: bold;
                }
                .shop-info-alt{
                    font-size: 12px;
                    margin-top: 5px;
                    .shop-alt-score{
                        font-size: 12px;
                        color: #ffb912;
                        margin-right: 5px;
                        img{
                            width: 16px;
                            display: block;
                        }
                        span{
                            display: block;
                        }
                    }
                    .shop-alt-address{
                        margin: auto;
                        margin-right: 0;
                    }
                }
                .shop-info-discount{
                    margin-top: 5px;
                    font-size: 12px;
                    .discount-label{
                        background-color: #da5c57;
                        color: #fff;
                        min-width: 35px;
                        padding: 2px 5px;
                        border-radius: 5px;
                        margin: auto 0;
                        margin-top: 0;
                    }
                    .discount-content{
                        margin-left: 5px;
                    }
                }
            }
        }
        .shop-recommend{
            margin-top: 10px;
            .shop-recommend-label{
                font-size: 14px;
            }
            .shop-recommend-goods{
                margin-top: 10px;
                .recommend-goods-lists{
                    margin-right: 10px;
                    max-width: calc(25% - 10px);
                    a{
                        display: block;
                        .goods-lists-name{
                            font-size: 12px;
                            white-space:nowrap;
                            overflow:hidden;
                            text-overflow:ellipsis;
                            color: #424242;
                        }
                        .goods-lists-price{
                            font-size: 12px;
                            color: #ee2d2d;
                        }
                    }
                    img{
                        width: 100%;
                        display: block;
                    }
                }
                .recommend-goods-lists:last-child{
                    margin-right: 0px;
                }
            }
        }
    }
}
.dflex{
    display: flex;
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale; 
}
.icon-downthrow:before { content: "\e61a"; }

.flex-start{
    justify-content: flex-start;
}
.space-between{
    justify-content: space-between;
}
.align-items{
    align-items: center;
}

</style>