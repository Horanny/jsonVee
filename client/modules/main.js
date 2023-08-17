<<<<<<< HEAD
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';
import * as d3 from "d3";
import 'assets/css/main.less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

import {sankey, sankeyLinkHorizontal, sankeyCenter} from 'd3-sankey';

Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api';
axios.defaults.headers.get['Content-Type'] =
    'application/x-www-form-urlencoded';
Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(ElementUI);

// window.d3 = d3;
window.d3 = Object.assign(d3,
    {
        sankey: sankey,
        sankeyLinkHorizontal: sankeyLinkHorizontal,
        sankeyCenterL: sankeyCenter
    });

Vue.prototype.$http = window.$http;
Vue.prototype.$bus = new Vue();
const router = new VueRouter({
    mode: 'history',
    routes: routes.routes
});

new Vue({
    router
}).$mount(`#app-wrapper`); 
=======
import {createApp} from 'vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import routes from './routers';
import * as d3 from "d3";
import 'assets/css/main.less';
import VirtualList from 'vue-virtual-list-v3';

window.d3 = d3;

const router = createRouter({
    history: createWebHashHistory(),
    routes
});
const myApp = createApp({
    el: '#app-wrapper',
});

myApp.use(router);
myApp.use(VirtualList);

myApp.mount("#app-wrapper");
>>>>>>> af29a96d00ddc1e80042e66c55a820564a055747
