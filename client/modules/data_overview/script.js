/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import HttpHelper from "common/utils/axios_helper.js";
export default {
    components: { // 依赖组件

    },
    data() { // 本页面数据
        return {};
    },
    mounted() {
        this.plot_data_overview()
    },
    methods: { // 这里写本页面自定义方法
        plot_data_overview() {
            //#region DATA
            var data = [{
                name: 'Last.fm',
                attributes: ['user', 'artist', 'tag'],
                node_num: 1891,
                edge_num: 18567,
                metapath: [{
                    name: 'UU',
                    mp: [{
                        node: 'user'
                    }, {
                        node: 'user'
                    }],
                },
                {
                    name: 'UAU',
                    mp: [{
                        node: 'user'
                    }, {
                        node: 'artist'
                    }, {
                        node: 'user'
                    }],
                },
                {
                    name: 'AA',
                    mp: [{
                        node: 'artist'
                    }, {
                        node: 'artist'
                    }]
                },
                {
                    name: 'ATA',
                    mp: [{
                        node: 'artist'
                    }, {
                        node: 'tag'
                    }, {
                        node: 'artist'
                    }]
                }
                ]
            }]
            //#endregion

            const margin = {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            } // focus

            const fix_height = 240
            const fix_width = 620

            const svg = d3.select("#dataOverviewSvg");
            const height = fix_height - margin.bottom - margin.top;
            const width = fix_width - margin.left - margin.right;

            var info_texts = ['Dataset', 'Attributes', '# of nodes', '# of edges']
            var dataset_texts = ['name', 'attributes', 'node_num', 'edge_num']

            //#region Parameters to be tuned
            var delta_dy = 45; // 调整行间距
            var top_delta = 10; // 调整left_g的y pos
            var circle_radius = 11; //metapath node radius
            var right_text_height = 30;
            var delta_circle_dy = 15; // adjust distance between circles
            var between_circle = 35;
            var stroke_width = 2;
            var delta_dx = 1
            var right_text_len = 50

            var text_color = "#333533"
            var stroke_color = "#333533"
            var circle_color = {
                'user': '#839cbe',
                'artist': '#81b265',
                'tag': '#d59902'
            }
            var circle_opacity = 0.5

            //#endregion

            var left_g = svg.append('g')
                .attr("transform", `translate(${margin.left},${margin.top + top_delta})`)
                .data(data)

            var right_text_g = svg.append('g')
                .attr("transform", `translate(${fix_width / 2 + margin.left},${margin.top + top_delta})`)


            var right_row_g = svg.append('g')
                .selectAll('g')
                .data(data[0].metapath)
                .enter()
                .append('g')
                .attr('transform', (d, i) => {
                    return `translate(${fix_width / 2 + circle_radius + margin.left},${i * (delta_dy) + margin.top + top_delta + right_text_height})`
                })

            // #region Functions
            // print single info text on the left g
            var print_text_single = function (fix_info, data_info, dy) {
                left_g.append('text')
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr("dx", 0)
                    .attr("dy", dy)
                    .text(function (d) {
                        // determine whether data_info is attributes
                        if (data_info == 'attributes') {

                            var return_text = fix_info + ': '

                            for (var j = 0; j < d[data_info].length; j++) {
                                if (j == 0)
                                    return_text += d[data_info][j]
                                else
                                    return_text += ', ' + d[data_info][j]
                            }

                            return return_text
                        } else
                            return fix_info + ': ' + d[data_info]
                    })
                    .attr("fill", text_color)
                    .style('font-family', 'HindSemiMedium')
                    .style('font-size', 20)

            }

            // print total info texts
            var print_text_total = function () {
                var dy = 0;
                for (var i = 0; i < info_texts.length; i++) {
                    var fix_info = info_texts[i]
                    var data_info = dataset_texts[i]
                    // print texts
                    print_text_single(fix_info, data_info, dy)
                    dy += delta_dy
                }
            }
            // #endregion

            // #region plot
            print_text_total();

            right_text_g.append('text')
                .attr('x', 0)
                .attr('y', 0)
                .attr("dx", 0)
                .attr("dy", 0)
                .text('Meta Paths:')
                .attr("fill", text_color)
                .style('font-size', 20)
                .style('font-family', 'HindSemiMedium')


            right_row_g
                .append('text')
                .attr('x', -(stroke_width + circle_radius - delta_dx*2))
                .attr('y', (stroke_width + circle_radius) / 2)
                .attr("dx", 0)
                .attr("dy", 0)
                .text(d => d.name)
                .attr("fill", text_color)
                .style('font-size', 16)
                .style('font-family', 'HindSemiMedium')


            var right_node_g = right_row_g
                .selectAll('g')
                .data(d => d.mp)
                .enter()
                .append('g')
                .attr('transform', (d, i) => {
                    return `translate(${right_text_len + delta_dx + (between_circle + (stroke_width + circle_radius) * 2) * i},${0})`
                })

            right_node_g
                .append('circle')
                .attr('x', 0)
                .attr('y', 0)
                .attr('r', circle_radius)
                .attr('fill', d => circle_color[d.node])
                .attr('fill-opacity', circle_opacity)
                .attr('stroke', d => circle_color[d.node])
                .attr('stroke-opacity', 1)
                .attr('stroke-width', 2)

            right_node_g
                .append('line')
                .attr("x1", -(stroke_width + circle_radius))
                .attr("y2", 0)
                .attr("x2", -(stroke_width + circle_radius + between_circle))
                .attr("y2", 0)
                .attr('stroke', stroke_color)
                .attr('stroke-opacity', (d, i) => {
                    if (i == 0)
                        return 0
                    else
                        return 1
                })
                .attr('stroke-width', 1)

            // #endregion

        }
    },
    created() { // 生命周期中，组件被创建后调用

    },
};
