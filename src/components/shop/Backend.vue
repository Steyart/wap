<template>
    <div class='b-shop'>
        <component-con
            :modules-index="modulesIndex"
            :component-name="componentName"
            :setting="setting">
            <div class="form-group">
                <label class="group-l">
                    筛选栏：
                </label>
                <radio-group
                    v-model="styleSel"
                    size="small">
                    <radio
                        v-for="item in data.showStyle"
                        :key="item.key"
                        :label="item.key">
                            {{ item.title }}
                    </radio>
                </radio-group>
            </div>
            <div class="form-group">
                <label class="group-l" style="">
                    选择店铺：
                </label>
                <div class="group-r">
                    已选择 {{ selGoodNum }} 个店铺
                    <a href="javascript:;" @click="openDialogGoods()"> 点击选择</a> 
                    <a href="javascript:;" class="clear" @click="clearSelGoods({
                        modulesIndex
                    })"> [ 清空 ]</a>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    快捷筛选：
                </label>
                <checkbox-group v-model="typeSelList" size="small">
                    <checkbox 
                        v-for="item in aTypetags" 
                        :key="item.key" 
                        :label="item.key">
                            {{ item.title }}
                    </checkbox>
                </checkbox-group>
            </div>
            <div class="form-group form-group--remak">
                <label class="group-l" style="">
                </label>
                <div class="group-r">
                    <p class="ec-remark">*最多添加30个店铺，默认按添加先后顺序排列</p>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    店铺间距：
                </label>
                <div class="group-r">
                    <ec-input 
                        type="number" 
                        size="small"
                        min="0"
                        v-model="isMarginStyleSel"
                        placeholder="0px">
                    </ec-input>
                </div>
            </div>
            <div class="form-group">
                <label class="group-l">
                    店铺倒角：
                </label>
                <radio-group
                    v-model="radiusStyleSel"
                    size="small">
                    <radio
                        v-for="item in data.radiusStyle"
                        :key="item.key"
                        :label="item.key">
                            {{ item.title }}
                    </radio>
                </radio-group>
            </div>
            <div class="form-group">
                <label class="group-l">
                    店铺名：
                </label>
                <radio-group
                    v-model="textStyleSel"
                    size="small">
                    <radio
                        v-for="item in data.textStyle"
                        :key="item.key"
                        :label="item.key">
                            {{ item.title }}
                    </radio>
                </radio-group>
            </div>
            <div class="form-group">
                <label class="group-l">
                    显示内容：
                </label>
                <checkbox-group v-model="tagSelList" size="small">
                    <checkbox 
                        v-for="item in aShowtags" 
                        :key="item.key" 
                        :label="item.key">
                            {{ item.title }}
                    </checkbox>
                </checkbox-group>
            </div>
            <div class="form-group">
                <label class="group-l">
                        背景颜色：
                    </label>
                <div class="group-r">
                    <color-input v-model="bgColor" placeholder="默认为透明色"></color-input>
                </div>
            </div>
        </component-con>
    </div>
</template>

<script>
// mapActions mapState
import { mapActions, mapState } from 'vuex'

// custom components
import ComponentCon from '../element/ComponentCon'
import ColorInput from '../element/ColorInput'

// third party components
import {
    CheckboxGroup,
    Checkbox,
    Radio,
    RadioGroup,
    Input,
    DatePicker,
    Cascader,
    Select,
    Option
} from 'element-ui'

// minxin
import formProcessing from 'mixins/form-processing'

// localData
import localData from './data/local'

export default {
    name: 'b-shop',
    props: ['setting', 'onlineData', 'modulesIndex'],
    mixins: [formProcessing],
    data() {
        return {
            componentName: localData.componentName,
            showDialogGoods: false,
            /**
             * 商品分类列表
             * 
             * @type {Array}
             */
            categoryCOption: [],
            categoryCProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'child_tree'
            },
            /**
             * 品牌分类列表
             * 
             * @type {Array}
             */
            brandList: []
        }
    },
    components: {
        Radio,
        Checkbox,
        CheckboxGroup,
        RadioGroup,
        ComponentCon,
        EcInput: Input,
        EcSelect: Select,
        EcOption: Option,
        DatePicker,
        Cascader,
        ColorInput
    },
    created() {
        this.init()
    },
    mounted() {},
    methods: {
        ...mapActions('dialogShops', [
            'onOffDialogGoods',
            'setDialogGoods',
            'clearSelGoods'
        ]),
        init() {
            if (window.sessionStorage) {
                if (
                    sessionStorage.getItem('categoryCOption') &&
                    sessionStorage.getItem('categoryCOption') !== 'undefined'
                ) {
                    this.categoryCOption = JSON.parse(
                        sessionStorage.getItem('categoryCOption')
                    )
                } else {
                    this.resCategoryCOption().then(() => {
                        sessionStorage.setItem(
                            'categoryCOption',
                            JSON.stringify(this.categoryCOption)
                        )
                    })
                }

                if (
                    sessionStorage.getItem('brandList') &&
                    sessionStorage.getItem('categoryCOption') !== 'undefined'
                ) {
                    this.brandList = JSON.parse(
                        sessionStorage.getItem('brandList')
                    )
                } else {
                    this.resBrandList().then(() => {
                        sessionStorage.setItem(
                            'brandList',
                            JSON.stringify(this.brandList)
                        )
                    })
                }
            } else {
                this.resCategoryCOption()
                this.resBrandList()
            }
        },
        resCategoryCOption() {
            return this.$http
                .post(this.url(`console&c=${window.apiAuthority}&a=category`))
                .then(({ data }) => {
                    let { url } = data
                    this.categoryCOption = url
                })
        },
        resBrandList() {
            return this.$http
                .post(this.url(`console&c=${window.apiAuthority}&a=brand`))
                .then(({ data }) => {
                    let { brand } = data
                    this.brandList = brand
                })
        },
        openDialogGoods() {
            this.setDialogGoods({
                bShowDialog: true,
                currentPage: 1,
                modulesIndex: this.modulesIndex,
                pageSize: 15
            })
        }
    },
    computed: {
        aTypetags() {
            /* let styleStyleIndex = 0
            this.data.showStyle.map((v, i) => {
                if (v.key == this.styleSel) styleStyleIndex = i
            })
            let aTag = this.data.showStyle[styleStyleIndex].tags */
            let aTypeTags = []
            this.data.typeTag.map((v, i) => {
                // aTag.map((tV, tI) => {
                    // if (v.key == tV) {
                        aTypeTags.push(v)
                    // }
                // })
            })
            return aTypeTags
        },
        aShowtags() {
            /* let styleStyleIndex = 0
            this.data.showStyle.map((v, i) => {
                if (v.key == this.styleSel) styleStyleIndex = i
            })
            let aTag = this.data.showStyle[styleStyleIndex].tags */
            let aShowTags = []
            this.data.showTag.map((v, i) => {
                // aTag.map((tV, tI) => {
                    // if (v.key == tV) {
                        aShowTags.push(v)
                    // }
                // })
            })
            return aShowTags
        },
        isMarginStyleSel: {
            get() {
                return this.data.allValue.isMarginStyleSel
            },
            set(value) {
                this.updateTitleText('isMarginStyleSel', Number(value))
            }
        },
        bgColor: {
            get() {
                return this.data.allValue.bgColor
            },
            set(value) {
                this.updateTitleText('bgColor', value)
            }
        },
        styleSel: {
            get() {
                return this.data.isStyleSel
            },
            set(value) {
                this.updateRadioSel('isStyleSel', value)
            }
        },
        radiusStyleSel: {
            get() {
                return this.data.isRadiusStyleSel
            },
            set(value) {
                this.updateRadioSel('isRadiusStyleSel', value)
            }
        },
        textStyleSel: {
            get() {
                return this.data.isTextStyleSel
            },
            set(value) {
                this.updateRadioSel('isTextStyleSel', value)
            }
        },
        typeSelList: {
            get() {
                return this.data.typeSelList
            },
            set(value) {
                this.updateRadioSel('typeSelList', value)
            }
        },
        tagSelList: {
            get() {
                return this.data.tagSelList
            },
            set(value) {
                this.updateRadioSel('tagSelList', value)
            }
        },
        scrollNumber: {
            get() {
                return this.data.allValue.scrollNumber
            },
            set(value) {
                this.updateTitleText('scrollNumber', value)
            }
        },
        brandSelect: {
            get() {
                return this.data.allValue.brandSelect || ''
            },
            set(value) {
                this.updateTitleText('brandSelect', value)
            }
        },
        categorySOption: {
            get() {
                let s = this.data.allValue.categorySOption
                return s ? s.split(',') : []
            },
            set(value) {
                this.updateTitleText('categorySOption', value.join(','))
            }
        },
        catId() {
            let len = this.categorySOption.length
            return len > 0 ? this.categorySOption[len - 1] : ''
        },
        selGoodNum() {
            return this.selectShopsId ? this.selectShopsId.length : 0
        },
        selectShopsId() {
            return this.data.allValue.selectShopsId
        },
        data() {
            return Object.assign({}, localData.data, this.onlineData)
        }
    }
}
</script>

<style scoped>
.cascader {
    width: 100%;
}
.brand-select {
    width: 100%;
}
a.clear {
    color: #999;
}
</style>