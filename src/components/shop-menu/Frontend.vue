<template>
    <footer class="shop-menu" :class="{'preview':preview}">
        <ul :class="{preview:preview}">
            <li>
                <a v-href="{sUrl:sShopAboutUrl,preview:preview}"></a>
                店铺详情
            </li>
            <li :class="bCategorySubmenu" @click.stop="showCategory">
                <i class="iconfont icon-shop-mune"></i>
                热门分类
                <ul class="sub-menu">
                    <li v-for="(item,index) in aCategory" :key="index">
                        <a v-href="{sUrl:getCatUrl(item.cat_id),preview:preview}"></a>
                        {{item.cat_name}}
                    </li>
                </ul>
            </li>
            <li class="kf">
                <a href="javascript:;" @click="CustomerService" id='CustomerService'>
                    <i class="iconfont icon-service"></i>客服
                </a>
            </li>
        </ul>
    </footer>
</template>

<script>
//node library
import qs from 'qs'

// custom components

// third party components


//mixins

export default {
    name: 'shop-menu',
    props: ['data', 'preview'],
    mixins: [],
    components: {

    },
    data() {
        return {
            bCategorySubmenu: {
                active: false,
            },
            bKfSubmenu: {
                active: false,
            },
            aCategory: [],
            kf:'',
            serviceOptions:{},
        }
    },
    created() {
        let _this = this;
        window.easemobim = window.easemobim || {};
        this.$http.post(getUrl(`console&c=${window.apiAuthority}&a=storeDown`), qs.stringify({
            ruid: window.shopInfo.ruid
        })).then(({ data: { store } }) => {
            const {
                shop_category: shopCategory,
                shop_about: shopAbout,
                kf
            } = store[0]
            this.kf = kf;
            this.aCategory = shopCategory.slice(0,9)
        })
        $.ajax({
            url:'/mobile/index.php?m=user&c=info&a=service',
            type:'POST',
            data:{},
            dataType:'json',
            async: false,
            success:function (data) {
                switch (data.code) {
                    case 0:
                        _this.serviceOptions = data.data.user;
                        break;
                }
            }
        });
        easemobim.config = {
            user:{
                username: _this.serviceOptions.hx_username,
                password: _this.serviceOptions.hx_pwd,
    },
            // 访客信息（可选）
            visitor: {
                phone: _this.serviceOptions.mobile_phone,
                userNickname: _this.serviceOptions.nick_name,
                email: _this.serviceOptions.email
            },
            onready: function () {
                easemobim.sendExt({
                    ext: {
                        "type": "custom",
                        "msgtype": {
                            "order": {
                                "title": "商家咨询",
                                "desc": _this.kf.shop_name,
                            }
                        }
                    }
                });
            },
        };
    },
    mounted() {




    },
    methods: {
        getCatUrl(str) {
            return this.url(`store&a=pro_list&ru_id=${window.shopInfo.ruid}&cat_id=${str}`)
        },
        showCategory() {
            if (this.bCategorySubmenu.active) {
                this.bCategorySubmenu.active = false
            } else {
                this.bKfSubmenu.active = false
                this.bCategorySubmenu.active = true
            }
        },
        CustomerService(){
            let _this = this;
            if(this.kf == '') this.kf.kf_type = -1;
            switch (this.kf.kf_type) {
                case 0:
                    window.location.href = this.kf.url;
                    break;
                case 1:
                    window.location.href = this.kf.url;
                    break;
                case 2:
                    easemobim.bind({configId: _this.kf.url});
                    break;
                case 3:
                    window.location.href = this.kf.url;
                    break;
                default:
                    alert('客服暂时不可用');
                    break;
            }

        }
    },
    computed: {
        sShopAboutUrl() {
            return this.url(`store&a=shop_about&ru_id=${window.shopInfo.ruid}`)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/config';
@import '../../assets/style/mixins/common';
.shop-menu {
    height: 4.4rem;
    ul {
        width: 100%;
        background: #fff;
        border-top: 1px solid $border-color-split;
        li {
            padding: 1rem 0;
            text-align: center;
            border-right: 1px solid $border-color-split;
            font-size: 1.46rem;
            position: relative;
            background: #fff;
            @include flex1-1();
            a {
                @include urlAbsolute();
            }
            i.iconfont {
                margin-right: .2rem;
            }
            i.icon-shop-mune {
                font-size: 1.36rem;
            }
            i.icon-service {
                font-size: 1.44rem;
            }
        }
        li.active {
            .sub-menu {
                transform: translateY(0);
                visibility: visible;
                opacity: 1;
                @include transition(all, .2s);
            }
        }
    }
}

.shop-menu.preview,
.shop-menu ul.preview {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.shop-menu>ul {
    z-index: 10;
    bottom: 0;
    position: fixed;
    @include disBox();
    @include disFlex();
    .kf a{
        padding:1rem 0;
        font-size:1.46rem;
        color:$text-color;
    }
}

.sub-menu {
    position: absolute;
    bottom: 100%;
    transform: translateY(100%);
    visibility: hidden;
    opacity: 0;
    @include transition(all, .2s);
    width: 100%;
    z-index: -1;
    display: block;
    float: inherit;
    padding: 0;
    border-left: 1px solid $border-color-split;
    li {
        font-size: 1.36rem;
        padding: 1rem 0;
        border: none;
        position: relative;
        border-bottom: 1px solid $border-color-split;
        a {
            color: $text-color;
        }
     
    }
    
}
</style>