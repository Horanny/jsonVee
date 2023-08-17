<<<<<<< HEAD
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
    
=======
import HttpHelper from "common/utils/axios_helper.js";
import { reactive, onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';

// The Climb (From Miley Cyrus)
const sentence3 = [
    'BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。',
    'IFC(Inline Formatting Contexts)直译为”内联格式化上下文”，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)',
    "margin 重合，margin 塌陷",
    "css3",
    "html5",
    "es6",
];
const TOTAL_COUNT = 100;
const sizes = [60, 80, 100, 150, 180];

const genUniqueId = (prefix) => {
    return `${prefix}$${Math.random().toString(16).substr(9)}`;
};

const getSentences = () => {
    let index = Math.floor(Math.random() * (sentence3.length - 1));
    return sentence3[index];
};

const DataItems = [];
let count = TOTAL_COUNT;
while (count--) {
    const index = TOTAL_COUNT - count;
    DataItems.push({
        index,
        name: `${Math.random()}`,
        id: genUniqueId(index),
        desc: getSentences(),
        size: sizes[Math.floor(Math.random() * 5)]
    });
}


export default {
    data () {
        return {
            total: TOTAL_COUNT.toLocaleString(),
            // items: DataItems,
            isShowView: true
        };
    },
    setup() {
        const data = reactive({
            id: "5d42ac3d9c149c38248c8199"
        });
        const router = useRouter();
        const selectById = async () => {
            await HttpHelper.axiosGet("/detail/selectById",{id: data.id});
        };

        onMounted(() => {
            d3.select('body');
            selectById();
        });

        const toDetail = () => {
            router.push('/detail');
        };
        let items = ref(DataItems);
        const addItem = () => {
            DataItems.push({
                index: Math.random() * 1000 + 1,
                name: "Brad" + Math.random() * 1000 + 1,
                id: Date.now(),
                desc: "html5",
                size: 150,
            });
            console.log(DataItems);
            // items.value = DataItems; // 这样不行
            items.value = JSON.parse(JSON.stringify(DataItems));
        };
        return {
            data,
            items,
            selectById,
            toDetail,
            addItem
        };
    }
>>>>>>> af29a96d00ddc1e80042e66c55a820564a055747
};