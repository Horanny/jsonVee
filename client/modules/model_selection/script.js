/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import HttpHelper from "common/utils/axios_helper.js";
import { range, treemapSquarify } from "d3";
export default {
    components: { // 依赖组件

    },
    data() { // 本页面数据
        return {
            sort_data: "",
            radio: 0,
            selected_model: "",
        };
    },
    watch:{
        radio(val, _oldVal){
            let _this = this
            console.log("select sort module: ", _this.radio)
            _this.plot_model_selection()
        },
        selected_model(val, _oldVal){

        }
    },
    mounted() {
        this.plot_model_selection()
    },
    methods: { // 这里写本页面自定义方法
        plot_model_selection() {
            let _this = this


            //#region DATA
            //data for models
            var data = [{
                'name': 'model1',
                'auc': 0.8,
                'ap': 0.2,
                'hr': 0.9,
                'recall': 1,
                'total': 2.9
            },
            {
                'name': 'model2',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.6,
                'recall': 0.5,
                'total': 2.2
            },
            {
                'name': 'model3',
                'auc': 0.7,
                'ap': 0.8,
                'hr': 0.4,
                'recall': 0.9,
                'total': 2.8
            },
            {
                'name': 'model4',
                'auc': 0.7,
                'ap': 0.9,
                'hr': 0.4,
                'recall': 0.2,
                'total': 2.2
            },
            {
                'name': 'model5',
                'auc': 0.8,
                'ap': 0.2,
                'hr': 0.9,
                'recall': 1,
                'total': 2.9
            },
            {
                'name': 'model6',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.6,
                'recall': 0.5,
                'total': 2.2
            },
            {
                'name': 'model7',
                'auc': 0.7,
                'ap': 0.9,
                'hr': 0.4,
                'recall': 0.2,
                'total': 2.2
            },
            {
                'name': 'model8',
                'auc': 0.8,
                'ap': 0.2,
                'hr': 0.9,
                'recall': 1,
                'total': 2.9
            },
            {
                'name': 'model9',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.9,
                'recall': 0.9,
                'total': 2.9
            },
            {
                'name': 'model10',
                'auc': 0.8,
                'ap': 0.9,
                'hr': 0.2,
                'recall': 0.5,
                'total': 2.4
            },
            {
                'name': 'model11',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.6,
                'recall': 0.5,
                'total': 2.2
            },
            {
                'name': 'model12',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.6,
                'recall': 0.3,
                'total': 2
            },
            {
                'name': 'model13',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.9,
                'recall': 0.9,
                'total': 2.9
            },
            {
                'name': 'model14',
                'auc': 0.8,
                'ap': 0.9,
                'hr': 0.2,
                'recall': 0.5,
                'total': 2.4
            },
            {
                'name': 'model15',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.6,
                'recall': 0.5,
                'total': 2.2
            },
            {
                'name': 'model16',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.6,
                'recall': 0.3,
                'total': 2
            },
            {
                'name': 'model17',
                'auc': 0.7,
                'ap': 0.8,
                'hr': 0.4,
                'recall': 0.9,
                'total': 2.8
            },
            {
                'name': 'model18',
                'auc': 0.7,
                'ap': 0.9,
                'hr': 0.4,
                'recall': 0.2,
                'total': 2.2
            },
            {
                'name': 'model19',
                'auc': 0.8,
                'ap': 0.2,
                'hr': 0.9,
                'recall': 1,
                'total': 2.9
            },
            {
                'name': 'model20',
                'auc': 0.4,
                'ap': 0.7,
                'hr': 0.6,
                'recall': 0.5,
                'total': 2.2
            },
            {
                'name': 'model21',
                'auc': 0.7,
                'ap': 0.9,
                'hr': 0.4,
                'recall': 0.2,
                'total': 2.2
            },

            ]

            var auc_data = d3.nest().key(d => d.auc).entries(data)
            var ap_data = d3.nest().key(d => d.ap).entries(data)
            var hr_data = d3.nest().key(d => d.hr).entries(data)
            var recall_data = d3.nest().key(d => d.recall).entries(data)

            auc_data = auc_data.sort((a, b) => { return a.key - b.key })
            ap_data = ap_data.sort((a, b) => { return a.key - b.key })
            hr_data = hr_data.sort((a, b) => { return a.key - b.key })
            recall_data = recall_data.sort((a, b) => { return a.key - b.key })

            auc_data.forEach(d => d.metric = 'auc')
            ap_data.forEach(d => d.metric = 'ap')
            hr_data.forEach(d => d.metric = 'hr')
            recall_data.forEach(d => d.metric = 'recall')

            var metrics_data = [auc_data, ap_data, hr_data, recall_data]
            var metrics_id = { 'auc': 0, 'ap': 1, 'hr': 2, 'recall': 3 }
            var metrics_name = ['total','auc', 'ap', 'hr', 'recall']

            var sort_module_idx = _this.radio
            var sort_module = metrics_name[sort_module_idx]
            data = data.sort((a, b) => { return b[sort_module] - a[sort_module] })

            //#endregion

            //#region COLUMNS
            var metrics_col = [
                'auc',
                'ap',
                'hr',
                'recall',
            ]
            //#endregion


            //#region margin and svg infos
            const svg = d3.select('#modelSelectSvg')
            svg.selectAll('*').remove()

            var fix_width = 601
            var fix_height = 954

            const margin = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }

            var width = fix_width - margin.left - margin.right
            var height = fix_height - margin.top - margin.bottom
            //#endregion

            //#region parameters
            var axis_total_height = 100
            var axis_text_height = 20
            var axis_bar_height = 60
            var bar_padding = 30
            var bar_height = 20
            var text_padding = 30
            var text_width = 110
            var opacity = 0.7
            var hidden_text_opacity = 0
            var text_opacity = 1

            //#endregion

            //#region color
            var metrics_color = d3.scaleOrdinal()
                .domain(metrics_col)
                .range([
                    '#a8ddb5',
                    '#7bccc4',
                    '#4eb3d3',
                    '#2b8cbe'
                ])

            var text_color = '#333533'
            //#endregion

            //#region RANGES 
            var x_range = [0, d3.extent(data, d => d.total)[1]]

            var legend_x_range = [0, 1]

            //get legend y_range
            var legend_y_range_max = 0
            for (var i = 0; i < 4; i++) {
                //count # in one key in one metrics data
                var tempdata = metrics_data[i]
                // tempdata: key, values:array(3)
                for (var j = 0; j < tempdata.length; j++) {
                    var tempcount = tempdata[j].values.length
                    if (legend_y_range_max < tempcount)
                        legend_y_range_max = tempcount
                }
            }
            var legend_y_range = [0, legend_y_range_max]
            //#endregion

            //#region MOUSE FUNCTIONS
            function overed(event, d) {
                var mom = d3.select(this)
                var mom_id = mom.attr("id")

                d3.selectAll('#' + mom_id)
                    .attr('opacity', 1)
            }

            function outed(event, d) {
                var mom = d3.select(this)
                var mom_id = mom.attr("id")

                d3.selectAll('#' + mom_id)
                    .attr('opacity', opacity)
            }

            function clicked(event, d) {
                var mom = d3.select(this)
                var mom_id = mom.attr("id")

                d3.selectAll('#' + mom_id)
                    .attr('opacity', opacity)
            }

            function legend_rect_overed(event, d) {
                var mom = d3.select(this)
                var mom_class = mom.attr('class').split(" ")
                var mom_id = metrics_id[mom_class[0]]
                var mom_data = metrics_data[mom_id]
                var mom_key = mom_class[1]
                var corres_model = []
                var count_i
                mom_data.forEach((d,i) => {
                    if (d.key == mom_key) {
                        count_i = i
                        corres_model = d.values.map(d => d.name)
                    }
                })
                corres_model.forEach(model_name => {
                    var model_class = '.' + model_name + mom_class[0]
                    d3.select(model_class).attr('opacity', 1)
                })
                mom.attr('opacity', 1)

                d3.select('.text'+ mom_class[0] + count_i)
                    .attr('opacity', 1)
            }

            function legend_rect_out(event, d) {
                var mom = d3.select(this)
                var mom_class = mom.attr('class').split(" ")
                var mom_id = metrics_id[mom_class[0]]
                var mom_data = metrics_data[mom_id]
                var mom_key = mom_class[1]
                var corres_model = []
                var count_i
                mom_data.forEach((d,i) => {
                    if (d.key == mom_key) {
                        count_i = i
                        corres_model = d.values.map(d => d.name)
                    }
                })
                corres_model.forEach(model_name => {
                    var model_class = '.' + model_name + mom_class[0]
                    d3.select(model_class).attr('opacity', opacity)
                })
                mom.attr('opacity', opacity)

                d3.select('.text'+ mom_class[0] + count_i)
                    .attr('opacity', 0)
            }

            //#endregion

            //#region FUNCTIONS
            var x = d3.scaleLinear()
                .domain(x_range)
                .range([text_width, width])

            var y = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([0, data.length * bar_padding])

            function legend_x(input_domain, input_range) {
                return d3.scaleBand()
                    .domain(input_domain)
                    .range(input_range)
            }

            var legend_y = d3.scaleLinear()
                .domain(legend_y_range)
                .range([0, axis_bar_height * 0.75])


            var stack = d3.stack().keys(metrics_col)


            //#endregion

            //#region DRAW BARS AND TEXT
            //get model svg
            var model_svg = svg
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top + axis_total_height})`)

            var metrics_svg = model_svg
                .selectAll('g')
                .data(stack(data))
                .enter()
                .append('g')
                .style('fill', d => metrics_color(d.key))

            //draw bars for each metric
            var mertic_svg = metrics_svg
                .selectAll('rect')
                .data((d, i) => {
                    d.forEach(element => {
                        element.push({
                            'i': i
                        })
                    });
                    return d
                })
                .enter()
                .append('rect')
                .attr('x', d => {
                    return x(d[0])
                })
                .attr('y', d => {
                    return y(d.data.name)
                })
                .attr('height', bar_height)
                .attr('width', d => x(d[1]) - x(d[0]))
                .attr('class', d => {
                    return d.data.name + metrics_col[d[2].i]
                })
                .attr('id', d => metrics_col[d[2].i])
                .attr('opacity', opacity)
                .on("mouseover", overed)
                .on("mouseout", outed)

            // plot corresponding value
            var metric_detail_svg = metrics_svg
                .selectAll('text')
                .data((d, i) => {
                    d.forEach(element => {
                        element.push({
                            'i': i
                        })
                    });
                    return d
                })
                .enter()
                .append('text')
                .text(d => (d[1] - d[0]).toFixed(2))
                .attr('x', d => {
                    return x(d[0]) + (x(d[1]) - x(d[0])) / 2
                })
                .attr('y', d => {
                    return y(d.data.name) + bar_height / 1.3
                })
                .attr('height', bar_height)
                .attr('width', d => x(d[1]) - x(d[0]))
                .attr('class', d => {
                    return d.data.name + metrics_col[d[2].i]
                })
                .attr('fill', text_color)
                .attr('opacity', text_opacity)
                .attr('text-anchor', 'middle')
                .style('font-size', 14)
                .style('font-family', 'HindSemiMedium')
            // .attr('id', d => metrics_col[d[2].i])


            //draw model texts
            var text_svg = svg
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top + axis_total_height})`)
                .selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('transform', (d, i) => {
                    return `translate(${margin.left}, ${margin.top + text_padding * i})`
                })
                .text(d => {
                    return d.name
                })
                .attr('x', 0)
                .attr('y', 0)
                .attr("dx", 0)
                .attr("dy", -3)
                .style('fill', text_color)
                .style('font-size', 18)
                .style('font-family', 'HindSemiMedium')
            //#endregion

            //#region call axis
            var axis_svg = svg
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

            var legend_svg = axis_svg
                .selectAll('rect')
                .data(stack([data[0]]))
                .enter()
                .append('rect')
                .attr('x', d => {
                    return x(d[0][0])
                })
                .attr('y', axis_text_height)
                .attr('height', axis_bar_height)
                .attr('width', d => x(d[0][1]) - x(d[0][0]))
                .style('fill', d => metrics_color(d.key))
                .attr('opacity', 0.2)
                // .attr('id', d => d.key)
                .on("mouseover", overed)
                .on("mouseout", outed)

            // get svg for each metric
            var legend_svg = axis_svg
                .selectAll('g')
                .data(stack([data[0]]))
                .enter()
                .append('g')
                .attr('transform', (d) => {
                    return `translate(${x(d[0][0])}, ${axis_text_height})`
                })
                .attr('class', d => (d.key + ' ' + (x(d[0][1]) - x(d[0][0])) + 'distribution'))
                .attr('id', d => d.key + 'distribution')

            // draw distributions of each metric
            var each_metric_rect = legend_svg.selectAll('rect')
                .data(function () {
                    var mom = d3.select(this)
                    // mom_class: metric_name, xpos_start, xpos_end
                    var mom_class = mom.attr('class').slice(0, -12).split(' ')
                    var mom_id = metrics_id[mom_class[0]]
                    return metrics_data[mom_id]
                })
                .enter()
                .append('rect')
                .attr('x', function (d) {
                    var grandmom = d3.select('#' + d.metric + 'distribution')
                    var grandmom_class = grandmom.attr('class').slice(0, -12).split(' ')

                    var grandmom_id = metrics_id[grandmom_class[0]]
                    var grandmom_data = metrics_data[grandmom_id]
                    var grandmom_key = grandmom_data.map(d => d.key)
                    var temp_x_domain = grandmom_key

                    var temp_x_range = []
                    // get x_range
                    var temp_x_end = grandmom_class[1]
                    temp_x_range = [0, temp_x_end]

                    var x_pos = legend_x(temp_x_domain, temp_x_range)(d.key)
                    return x_pos
                })
                .attr('y', d => axis_bar_height - legend_y(d.values.length))
                .attr('width', function (d) {
                    var grandmom = d3.select('#' + d.metric + 'distribution')
                    var grandmom_class = grandmom.attr('class').slice(0, -12).split(' ')

                    var grandmom_id = metrics_id[grandmom_class[0]]
                    var grandmom_data = metrics_data[grandmom_id]

                    var total_width = grandmom_class[1]
                    var width = total_width / grandmom_data.length - 0.5
                    return width
                })
                .attr('height', function (d) {
                    return legend_y(d.values.length)
                })
                .attr('fill', d => metrics_color(d.metric))
                .attr('opacity', opacity)
                .attr('class', function (d) {
                    return d.metric + " " + d.key
                })
                .on('mouseover', legend_rect_overed)
                .on('mouseout', legend_rect_out)

            var legend_text_svg = axis_svg
                .selectAll('text')
                .data(stack([data[0]]))
                .enter()
                .append('text')
                .text(d => {
                    return d.key
                })
                .attr('x', d => x(d[0][0]) + (x(d[0][1]) - x(d[0][0])) / 2)
                .attr('y', axis_text_height / 2)
                .attr("dx", 0)
                .attr("dy", 0)
                .style('fill', d => metrics_color(d.key))
                .attr('text-anchor', 'middle')
                .style('font-size', 20)
                .style('font-family', 'HindSemiMedium')


            legend_svg.selectAll('text')
                .data(function () {
                    var mom = d3.select(this)
                    // mom_class: metric_name, xpos_start, xpos_end
                    var mom_class = mom.attr('class').slice(0, -12).split(' ')
                    var mom_id = metrics_id[mom_class[0]]
                    return metrics_data[mom_id]
                })
                .enter()
                .append('text')
                .text(d => {
                    return d.values.length
                })
                .attr('fill', text_color)
                .attr('opacity', 0)
                .attr('x', 1)
                .attr('y', axis_text_height / 1.75)
                .attr("dx", 0)
                .attr("dy", 0)
                .attr('class', (d,i) => {
                    return "text" + d.metric + i
                })
            //#endregion

            //#region draw checkbox
            var flag = false
            const div = d3.select('div#check')
            div.selectAll('div')
                .data(data)
                .enter()
                .append('div')
                .call(function(d){
                    d.append('input')
                        .attr('value', function(d){
                            return d.name
                        })
                        .attr('type', 'checkbox')
                        .style('position', 'absolute')
                        .style('top', (d,i)=>{
                            return margin.top + axis_total_height + text_padding * i+'px'
                        })
                        .style('left', '0px')
                        .style('height', '16px')
                        .style('width', '16px')
                        .attr('class', function (d) {
                            return 'checkbox'
                        })
                        .attr('id', function (d) {
                            return 'checkbox' + d.name
                        })
                })
                .on('change', function (d) {
                    //flag=false: all checkboxes have not been chosen, can choose one
                    if(flag == false){
                        d3.selectAll('.checkbox')
                            .attr('disabled', true)
                        d3.selectAll('#checkbox' + d.name)
                            .attr('disabled', null)
                        _this.selected_model = d.name
                    }
                    //flag = true: one checkbox has been chosen, other checkboxes can be chosen
                    else{
                        d3.selectAll('.checkbox')
                        .attr('checked', null)
                        .attr('disabled', null)
                    }
                    flag = !flag
                })
            //#endregion
        },

        async find_model(){
            //send model name to node view
            let _this = this
            console.log(_this.selected_model)
            if(_this.selected_model != "")
                _this.$bus.$emit("model selection to node view", _this.selected_model)
        }
    },
    created() { // 生命周期中，组件被创建后调用

    },
};
