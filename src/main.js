import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import axios from "axios";

Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.baseURL = "http://localhost:8081"
// require("./mock")
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import {
    BarChart, PieChart, LineChart, SunburstChart, CandlestickChart,
    ScatterChart, TreemapChart, SankeyChart, TreeChart, GraphChart
} from 'echarts/charts'
import {
    TitleComponent, TooltipComponent, GridComponent,
    LegendComponent, MarkLineComponent, ToolboxComponent,
    DataZoomSliderComponent, VisualMapComponent, SingleAxisComponent,
    GraphicComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
use([BarChart, PieChart, LineChart, SunburstChart, TitleComponent, TooltipComponent,
    GridComponent, LegendComponent, CanvasRenderer, CandlestickChart, MarkLineComponent, ToolboxComponent,
    DataZoomSliderComponent, ScatterChart, TreemapChart, SankeyChart, TreeChart, VisualMapComponent, SingleAxisComponent,
    GraphChart, GraphicComponent])



// eslint-disable-next-line vue/multi-word-component-names
Vue.component('chart', ECharts)
Vue.use(Element)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

