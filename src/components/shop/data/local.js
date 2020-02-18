module.exports = {
    module: "shop",
    componentName: "店铺列表",
    suggest: "",
    setting: "0",
    data: {
        showStyle: [{
            key: "0",
            type: "radio",
            title: "开",
        }, {
            key: "1",
            type: "radio",
            title: "关",
        }],
        allValue: {
            number: 10,
            scrollNumber: 3,
            categorySOption:'',
            brandSelect:'',
            selectGoodsId:[],
            selectShopsId:[],
            marginSize:'0',
            bgColor:""
        },
        typeTag: [{
            key: "0",
            type: "checkbox",
            title: "推荐店铺"
        }, {
            key: "1",
            type: "checkbox",
            title: "优惠"
        }, {
            key: "2",
            type: "checkbox",
            title: "及时送"
        }, {
            key: "3",
            type: "checkbox",
            title: "次日送"
        }],
        radiusStyle: [{
            key: "0",
            type: "radio",
            title: "直角",
        }, {
            key: "1",
            type: "radio",
            title: "圆角",
        }],
        textStyle: [{
            key: "0",
            type: "radio",
            title: "常规体",
        }, {
            key: "1",
            type: "radio",
            title: "加粗体",
        }],
        showTag: [{
            key: "0",
            type: "checkbox",
            title: "评分"
        }, {
            key: "1",
            type: "checkbox",
            title: "月销售量"
        }, {
            key: "2",
            type: "checkbox",
            title: "推荐商品"
        }, {
            key: "3",
            type: "checkbox",
            title: "活动"
        }, {
            key: "4",
            type: "checkbox",
            title: "区域"
        }],
        isStyleSel: "0",
        typeSelList: [],
        isRadiusStyleSel: "0",
        isTextStyleSel: "0",
        isMarginStyleSel: "0",
        tagSelList: [],

        isSizeSel: "0",
        isModuleSel: "0"
    }
}
