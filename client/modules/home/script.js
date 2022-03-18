/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import HttpHelper from "common/utils/axios_helper.js";
import dataOverviewCtn from "../data_overview/index.vue";
import modelSelectionCtn from "../model_selection/index.vue";
import metapathCtn from "../metapath/index.vue";
import nodeViewCtn from "../node_view/index.vue";

export default {
    components: { // 依赖组件
       dataOverviewCtn,
       modelSelectionCtn,
       metapathCtn,
       nodeViewCtn
    },
    data() { // 本页面数据
        return {
        };
    },
    
    mounted: function(){

    },
    
    /////////////我是分割线//////////////
    methods: { // 这里写本页面自定义方法

    },
    created() { // 生命周期中，组件被创建后调用

    },
    
};