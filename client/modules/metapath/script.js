/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import HttpHelper from "common/utils/axios_helper.js";
import { Submenu } from "element-ui";
export default {
    components: { // 依赖组件

    },
    data() { // 本页面数据
        return {
            metapathStyle: {
                width: "1880px",
                height: "",
            },
        };
    },
    mounted() {
        this.plot_metapath_overview()
        this.plot_metapath()
    },
    methods: { // 这里写本页面自定义方法
        plot_metapath() {
            let _this = this
            //#region draw adjacent matrix on the left

            //#region DEALING WITH ADJ_MAT DATA
            var adjmat_data = [
                {
                    id: 0,
                    source: 'User',
                    target: 'Artist_1hop',
                    num_edges: 100,
                },
                {
                    id: 0,
                    source: 'User',
                    target: 'User_1hop',
                    num_edges: 80,
                },
                {
                    id: 0,
                    source: 'User',
                    target: 'User_2hop',
                    num_edges: 0,
                },
                {
                    id: 0,
                    source: 'Artist_1hop',
                    target: 'User_1hop',
                    num_edges: 70,
                },
                {
                    id: 0,
                    source: 'Artist_1hop',
                    target: 'User_2hop',
                    num_edges: 30,
                },
                {
                    id: 0,
                    source: 'User_1hop',
                    target: 'User_2hop',
                    num_edges: 0,
                },
                {
                    id: 1,
                    source: 'User',
                    target: 'Artist_1hop',
                    num_edges: 100,
                },
                {
                    id: 1,
                    source: 'User',
                    target: 'User_1hop',
                    num_edges: 80,
                },
                {
                    id: 1,
                    source: 'User',
                    target: 'User_2hop',
                    num_edges: 0,
                },
                {
                    id: 1,
                    source: 'Artist_1hop',
                    target: 'User_1hop',
                    num_edges: 70,
                },
                {
                    id: 1,
                    source: 'Artist_1hop',
                    target: 'User_2hop',
                    num_edges: 30,
                },
                {
                    id: 1,
                    source: 'User_1hop',
                    target: 'User_2hop',
                    num_edges: 0,
                },
                {
                    id: 2,
                    source: 'User',
                    target: 'Artist_1hop',
                    num_edges: 100,
                },
                {
                    id: 2,
                    source: 'User',
                    target: 'User_1hop',
                    num_edges: 80,
                },
                {
                    id: 2,
                    source: 'User',
                    target: 'User_2hop',
                    num_edges: 0,
                },
                {
                    id: 2,
                    source: 'Artist_1hop',
                    target: 'User_1hop',
                    num_edges: 70,
                },
                {
                    id: 2,
                    source: 'Artist_1hop',
                    target: 'User_2hop',
                    num_edges: 30,
                },
                {
                    id: 2,
                    source: 'User_1hop',
                    target: 'User_2hop',
                    num_edges: 0,
                },
            ]

            adjmat_data = d3.nest()
                .key(d => d.id)
                .entries(adjmat_data)

            // turn list into set, 去重
            function unique(arr) {
                return Array.from(new Set(arr))
            }

            // get all node types, save them in list node_union
            var data_source = unique(adjmat_data[0].values.map(d => d.source))
            var data_target = unique(adjmat_data[0].values.map(d => d.target))
            var node_union = unique(new Set([...data_source, ...data_target]))

            // Parameters
            var boxSize = 25

            // Colors
            var num_edge_color = "#ef806c"
            var borad_color = "#333533"
            var text_color = "#333533"

            // #region DEALING WITH DATA FUNCTIONS
            var scale = function (n) {
                const width = n * boxSize;
                return (i) => {
                    return i * boxSize;
                }
            }

            function scale_opacity(num_range) {
                return d3.scaleLinear()
                    .domain(num_range)
                    .range([0, 1])
            }

            var matrix = function (input_matrix) {
                const n = node_union.length;
                for (let id = 0; id < adjmat_data.length; id++) {
                    // for node_union
                    for (let i = 0; i < n; i++) {
                        var source_name = node_union[i]
                        const xScale = scale(n - i - 1);
                        var count = 1

                        for (let j = 0; j < input_matrix[id].values.length; j++) {
                            var each_mat = input_matrix[id].values[j]
                            if (source_name == each_mat.source) {
                                each_mat.x = - xScale(i + count - 1) - boxSize
                                each_mat.y = i * boxSize
                                each_mat.color = num_edge_color

                                var num_range = d3.extent(input_matrix[id].values, d => d.num_edges)
                                each_mat.opacity = scale_opacity(num_range)(each_mat.num_edges)
                                count += 1
                            }
                        }
                    }
                }
            }
            // #endregion

            // get matrix form of data
            matrix(adjmat_data)

            //#endregion

            // #region svg and svg params
            const svg = d3.select('#metapathSvg')
            var width = 1880
            var height = 490
            var label_width = 120

            // math.hypot: 返回所有参数的平方和的平方根，勾股定理属于是
            var eachRow = Math.hypot(boxSize, boxSize)
            var margin = { top: 20, left: 20, right: 20, bottom: 20 }
            var chart_height = eachRow * node_union.length
            var chart_width = width - margin.left - margin.right
            var label_width = 120

            _this.metapathStyle.height = (chart_height) * adjmat_data.length
                + boxSize * (adjmat_data.length - 1) + margin.bottom

            var sankey_width = width - margin.left - margin.right - 2 * eachRow - label_width
            // #endregion

            // #region draw matrix
            var each_user_row = svg.selectAll('g')
                .data(adjmat_data)
                .enter()
                .append('g')
                .attr("transform", (d, i) => `translate(${margin.left}, ${i * (chart_height + boxSize)})`)

            var group = each_user_row.append('g')
                .attr("transform", `translate(${0}, ${margin.top})`)

            // draw each rows
            var listing = group.selectAll('g.list-item')
                .data(node_union)
                .enter()
                .append('g')
                .attr('class', 'list-item')
                .attr('transform', (d, i) => `translate(${boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2},
                 ${i * eachRow})`)

            // draw the top line above the texts

            var scale_line_opacity = d3.scaleSqrt()
                .domain([0, 90])
                .range([1, 0])

            var top_line = group.append('g')
                .attr('transform', `translate(${boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2},
                 ${0})`)

            top_line
                .selectAll('line')
                .data(d3.range(100))
                .enter()
                .append('line')
                .attr('x1', (d, i) => i * label_width / 100)
                .attr('x2', (d, i) => (i + 1) * label_width / 100)
                .attr('y1', 0)
                .attr('y2', 0)
                .attr('stroke', borad_color)
                .attr('stroke-width', '1px')
                .attr('opacity', (d, i) => {
                    return scale_line_opacity(i)
                })

            // draw texts
            var labels = listing.append('text')
                .attr('text-anchor', 'begin')
                .attr('x', 5)
                .attr('y', eachRow / 2 + 6)
                .text(d => d)
                .attr('fill', text_color)

            // draw the lines between texts
            var borders = listing
                .selectAll('line')
                .data(d3.range(100))
                .enter()
                .append('line')
                .attr('x1', (d, i) => i * label_width / 100)
                .attr('x2', (d, i) => (i + 1) * label_width / 100)
                .attr('y1', eachRow)
                .attr('y2', eachRow)
                .attr('stroke', borad_color)
                .attr('stroke-width', '1px')
                .attr('opacity', (d, i) => {
                    return scale_line_opacity(i)
                })

            // var borders = listing.append('line')
            //     .attr('x1', 0)
            //     .attr('x2', label_width)
            //     .attr('y1', eachRow)
            //     .attr('y2', eachRow)
            //     .attr('stroke', borad_color)
            //     .attr('stroke-width', '1.5px')

            var circleGroup = group.append('g')
                .attr('class', 'circleGroup')
                .attr('transform', `translate(${boxSize * (node_union.length - 1) / Math.sqrt(2)}, ${eachRow / 2}) rotate(-45)`)

            // draw rects and circles inside it, but now we do not need those circles
            var circles = circleGroup.selectAll('g.dot')
                .data(d => {
                    return d.values
                })
                .enter()
                .append('g')
                .attr('class', 'dot')
                .attr('transform', d => `translate(${d.x}, ${d.y})`)

            // circles.append('circle')
            //     .attr('fill', d => d.color)
            //     .attr('opacity', d => d.opacity)
            //     .attr('cx', boxSize / 2)
            //     .attr('cy', boxSize / 2)
            //     .attr('r', boxSize / 2 - 3)

            // color rects
            circles.append('rect')
                .attr('fill', d => d.color)
                .attr('opacity', d => d.opacity)
                .attr('width', boxSize)
                .attr('height', boxSize)

            // draw rects boarder
            circles.append('rect')
                .attr('fill', 'transparent')
                .attr('width', boxSize)
                .attr('height', boxSize)
                .attr('stroke', borad_color)
                .attr('stroke-width', '1px')

            // draw 两条斜着的线
            const twoLines = group.selectAll('scope-line')
                .data([{
                    x1: boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2 - boxSize,
                    x2: boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2,
                    y1: 0,
                    y2: 0,
                    rotate: `-45 ${boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2} 0`

                }, {
                    x1: boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2 - boxSize,
                    x2: boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2,
                    y1: chart_height,
                    y2: chart_height,
                    rotate: `45 ${boxSize * (node_union.length - 1) / Math.sqrt(2) + eachRow / 2} ${chart_height}`
                }])
                .enter()
                .append('line')
                .attr('class', 'scope-line')
                .attr('x1', d => d.x1)
                .attr('x2', d => d.x2)
                .attr('y1', d => d.y1)
                .attr('y2', d => d.y2)
                .attr('stroke', borad_color)
                .attr('stroke-width', '1px')
                .attr('transform', d => `rotate(${d.rotate})`);

            // #endregion

            //#endregion

            //#region draw sankey on the right

            //#region SANKEY DATA
            var sankey_data = [
                {
                    'id': 0,
                    'nodes': [
                        { name: "user_1hop" }, //0
                        { name: "artist_1hop" },//1
                        { name: "user_2hop" },//2

                        { name: "user_1hop" },//3
                        { name: "artist_1hop" },//4
                        { name: "user_2hop" },//5

                        { name: "uu" },//6
                        { name: "uau" },//7

                        { name: "sampled_uu" },//8
                        { name: "sampled_uau" },//9

                        { name: "user_embedding" },//10

                    ],
                    'links': [
                        { source: 0, target: 3, value: 25 },
                        { source: 1, target: 4, value: 30 },
                        { source: 2, target: 5, value: 20 },

                        { source: 3, target: 6, value: 15 },
                        { source: 3, target: 7, value: 10 },
                        { source: 4, target: 7, value: 30 },
                        { source: 5, target: 7, value: 20 },

                        { source: 6, target: 8, value: 10 },
                        { source: 7, target: 9, value: 10 },

                        { source: 8, target: 10, value: 20 * 0.52 },
                        { source: 9, target: 10, value: 20 * 0.48 },
                    ]
                },
                {
                    'id': 1,
                    'nodes': [
                        { name: "user_1hop" }, //0
                        { name: "artist_1hop" },//1
                        { name: "user_2hop" },//2

                        { name: "user_1hop" },//3
                        { name: "artist_1hop" },//4
                        { name: "user_2hop" },//5

                        { name: "uu" },//6
                        { name: "uau" },//7

                        { name: "sampled_uu" },//8
                        { name: "sampled_uau" },//9

                        { name: "user_embedding" },//10

                    ],
                    'links': [
                        { source: 0, target: 3, value: 20 },
                        { source: 1, target: 4, value: 25 },
                        { source: 2, target: 5, value: 15 },

                        { source: 3, target: 6, value: 10 },
                        { source: 3, target: 7, value: 5 },
                        { source: 4, target: 7, value: 25 },
                        { source: 5, target: 7, value: 15 },

                        { source: 6, target: 8, value: 5 },
                        { source: 7, target: 9, value: 10 },

                        { source: 8, target: 10, value: 15 * 0.52 },
                        { source: 9, target: 10, value: 15 * 0.48 },
                    ]
                },
                {
                    'id': 2,
                    'nodes': [
                        { name: "user_1hop" }, //0
                        { name: "artist_1hop" },//1
                        { name: "user_2hop" },//2

                        { name: "user_1hop" },//3
                        { name: "artist_1hop" },//4
                        { name: "user_2hop" },//5

                        { name: "uu" },//6
                        { name: "uau" },//7

                        { name: "sampled_uu" },//8
                        { name: "sampled_uau" },//9

                        { name: "user_embedding" },//10

                    ],
                    'links': [
                        { source: 0, target: 3, value: 20 },
                        { source: 1, target: 4, value: 25 },
                        { source: 2, target: 5, value: 15 },

                        { source: 3, target: 6, value: 10 },
                        { source: 3, target: 7, value: 5 },
                        { source: 4, target: 7, value: 25 },
                        { source: 5, target: 7, value: 15 },

                        { source: 6, target: 8, value: 5 },
                        { source: 7, target: 9, value: 10 },

                        { source: 8, target: 10, value: 15 * 0.52 },
                        { source: 9, target: 10, value: 15 * 0.48 },
                    ]
                }
            ]

            var hidden_nodes = ['user_1hop', 'artist_1hop', 'user_2hop']
            //#endregion

            //colors and parameters
            const colors = ['#FFCC99', '#FF6666', '#CC3399', "#80cbc4"]
            const color = d3.scaleOrdinal(colors);

            var sankey_rect_opacity = 0.5
            var sankey_link_opacity = 0.3

            //functions
            // var sankey = d3.sankey()
            //     .nodeWidth(boxSize)
            //     .nodePadding(20)
            //     .size([sankey_width, chart_height - 5])
            //     .nodes(sankey_data.nodes)
            //     .links(sankey_data.links)

            //draw sankey nodes
            var sankey_nodes = each_user_row.append('g')
                .attr("transform", `translate(${0 * eachRow + label_width}, ${margin.top + 2.5})`)
                .selectAll('g')
                .data(function (d) {
                    var sankey = d3.sankey()
                        .nodeWidth(boxSize)
                        .nodePadding(20)
                        .size([sankey_width, chart_height - 5])
                        .nodes(sankey_data[d.key].nodes)
                        .links(sankey_data[d.key].links)
                    return sankey().nodes
                })
                .enter()
                .append('g')

            var node_rect = sankey_nodes.append("rect")
                .attr('class', "nodes")
                .attr('x', d => d.x0)
                .attr('y', d => {
                    var node_idx = d.index
                    if (node_idx < hidden_nodes.length) {
                        var y0 = eachRow * (node_idx + 1)
                        return y0
                    }
                    else
                        return d.y0
                })
                .attr("height", d => {
                    var node_idx = d.index
                    if (node_idx < hidden_nodes.length) {
                        return eachRow
                    }
                    else
                        return d.y1 - d.y0
                })
                .attr("width", d => d.x1 - d.x0)
                .attr("fill", d => {
                    return color(d.name)
                })
                .attr('opacity', d => {
                    var node_idx = d.index
                    if (node_idx < hidden_nodes.length) {
                        return 0
                    }
                    else
                        return sankey_rect_opacity
                })

            var node_text = sankey_nodes.append('text')
                .attr("x", d => d.x0)
                .attr("y", d => {
                    return d.y0 + (d.y1 - d.y0) / 2
                })
                .attr("dy", ".35em")
                .text(d => {
                    var node_idx = d.index
                    if (node_idx < hidden_nodes.length) {
                        return ""
                    } else
                        return d.name
                })
                .attr('fill', "#333533")

            //#region gradient
            function getGradientId(d) {
                return `gradient_${d.source.index}_${d.target.index}`;
            }

            function addGradientStop(gradients, offset, fn) {
                return gradients.append("stop")
                    .attr("offset", offset)
                    .attr("stop-color", fn);
            }

            var node_link = each_user_row.append('g')
                .attr("transform", `translate(${0 * eachRow + label_width}, ${margin.top + 2.5})`)
                .attr("fill", "none")
                .selectAll('g')
                .data(function (d) {
                    var sankey = d3.sankey()
                        .nodeWidth(boxSize)
                        .nodePadding(20)
                        .size([sankey_width, chart_height - 5])
                        .nodes(sankey_data[d.key].nodes)
                        .links(sankey_data[d.key].links)
                    return sankey().links
                })
                .enter()
                .append('g')

            var grad = node_link.append("linearGradient")
                .attr("id", d => getGradientId(d))
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", d => {
                    return d.source.x1
                })
                .attr("x2", d => d.target.x0)

            addGradientStop(grad, 0.0, d => {
                var node_idx = d.index
                if (node_idx < hidden_nodes.length) {
                    return "#ffffff"
                } else
                    return color(d.source.name)
            })
            addGradientStop(grad, 1.0, d => color(d.target.name))

            //#endregion

            //#region define link function
            //#region define link function
            function test_link(d, i) {
                var curvature = 0.4
                var x0 = d.source.x1,
                    x1 = d.target.x0,
                    xi = d3.interpolateNumber(x0, x1),
                    x2 = xi(curvature),
                    x3 = xi(1 - curvature),
                    y0 = (i + 1) * eachRow - 2,
                    y1 = d.target.y0

                return "M" + x0 + "," + y0
                    + "C" + x3 + "," + y0
                    + " " + x2 + "," + y1
                    + " " + x1 + "," + y1
                    + "L" + x1 + "," + (y1 + d.target.y1 - d.target.y0)
                    + "C" + x2 + "," + (y1 + d.target.y1 - d.target.y0)
                    + " " + x3 + "," + (y0 + eachRow)
                    + " " + x0 + "," + (y0 + eachRow)
                    + "L" + x0 + "," + y0;
            }

            function horizontalSource(d) {
                return [d.source.x1, d.y0];
            }

            function horizontalTarget(d) {
                return [d.target.x0, d.y1];
            }

            function self_nb_link() {
                return d3.linkHorizontal()
                    .source(horizontalSource)
                    .target(horizontalTarget)
            }
            //#endregion

            //draw link in sankey
            node_link.filter((d, i) => i >= hidden_nodes.length)
                .append('path')
                .attr("d", function (d) {
                    return self_nb_link()(d)
                })
                // .attr("stroke", d => color(d.source.name)) // "output" == the link's destination, not origin
                .attr("stroke-opacity", sankey_link_opacity)
                .attr("stroke-width", d => {
                    return Math.max(1, d.width)
                })
                .attr("stroke", d => `url(#${getGradientId(d)})`)


            node_link.filter((d, i) => i < hidden_nodes.length)
                .append('path')
                .attr("d", function (d, i) {
                    return test_link(d, i)
                })
                .attr('fill', d => `url(#${getGradientId(d)})`)
                .attr('opacity', sankey_link_opacity)


        },

        plot_metapath_overview() {
            var width = 1880, height = 200
            // #region DRAW FORCE-DIRECTED GRAPH
            var real_net_width = 200, real_net_height = 200

            var margin = { top: 10, right: 20, bottom: 10, left: 10 },
                net_width = real_net_width - margin.left - margin.right,
                net_height = real_net_height - margin.top - margin.bottom;

            // append the svg canvas to the page
            var svg = d3.select("#metapath_overviewSvg")

            var net_g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // create a simulation for an array of nodes, and compose the desired forces
            var simulation = d3.forceSimulation()
                .force('link', d3.forceLink()// this force provides links between nodes
                    .id(d => d.id)// this sets the node id accessor to the specified function.
                    //if not spcified, will default to the index of a node
                )
                // this adds repulsion (if it's negative) between nodes
                .force('charge', d3.forceManyBody().strength(-500))
                // this force attracts nodes to the center of the svg area
                .force('center', d3.forceCenter(net_width / 2, net_height / 2))

            // create dummy data
            const dataset = {
                nodes: [
                    { id: 'u' },
                    { id: 'u_1' },
                    { id: 'u_2' },
                    { id: 'a_1' },
                ],
                links: [
                    { source: 'u', target: 'u_1' },
                    { source: 'u', target: 'a_1' },
                    { source: 'a_1', target: 'u_2' },
                    { source: 'a_1', target: 'u_1' },
                ]
            };

            const user_color = "#fdaf76"
            const other_color = "#bbdaea"
            const node_opacity = 1

            // initialize the links
            const link = net_g.append('g')
                .attr('class', 'links')
                .selectAll('line')
                .data(dataset.links)
                .enter()
                .append('line')
                .attr('x1', d => d.source.x)
                .attr('x2', d => d.target.x)
                .attr('y1', d => d.source.y)
                .attr('y2', d => d.target.y)
                .attr('stroke', '#333533')
                .attr('stroke-width', 1.5)

            // initialize the nodes
            const node = net_g.append('g')
                .attr('class', 'nodes')
                .selectAll('circle')
                .data(dataset.nodes)
                .enter()
                .append('circle')
                .attr('r', 20)
                .attr('fill', d => {
                    if (d.id == "u") return user_color
                    else return other_color
                })
                .attr('opacity', node_opacity)
                .call(d3.drag() // sets the event listener for the specified typenames and returns the drag behaviour
                    .on('start', dragstarted)// start - after a new pointer becomes activate (on mousedown or touchstart)
                    .on('drag', dragged)// drag - after an active pointer moves (on mousemove or touchmove)
                    .on('end', dragended)// end - after an activate pointer becomes inactive (on mouseup, touched or touchcancel)
                )

            // text to nodes
            const text = net_g.append('g')
                .attr('class', 'text')
                .selectAll('text')
                .data(dataset.nodes)
                .enter()
                .append('text')
                .text(d => d.id)

            // listen for tick events to render the nodes as they update in svg
            simulation
                // sets the simulation's nodes to the specified array of objects
                // initializing their positions and velocities,
                // and then re-initializes any bound forces
                .nodes(dataset.nodes)
                // use simulation.on to listen for tick events as the simulation runs
                .on('tick', ticked)

            // after this, each node must be an object. The following properties are assigned by the simulation
            // index - the node's zero-based index into nodes
            // x - the node's current x-position
            // y - the node's current y-position
            // vx - the node's current x-velocity
            // vy - the node's current y-velocity

            simulation.force('link')
                // sets the array of links associated with this force
                // recomputes the distance and strength parameters for each link
                // and returns this force
                .links(dataset.links)

            // after this, each link is an object with the following properties:
            // source - the link's source node
            // target - the link's target node
            // index - the zero-based index into links, assigned by this method

            // this function is run at each iteration of the force algorithm,
            // updating the nodes position (the nodes data array is directly manipulated)
            function ticked() {
                link.attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y)

                node.attr('cx', d => d.x)
                    .attr('cy', d => d.y)

                text.attr('x', d => d.x - 5) // position of the lower left point of the text
                    .attr('y', d => d.y + 5) // position of the lower left point of the text
            }

            // when the drag gesture starts, the targeted node is fixed to the pointer
            // the simulation is temporarily "heated" during interaction 
            // by setting the target alpha to a non-zero value
            function dragstarted(d) {
                if (!d3.event.active)
                    // sets the current target alpha to the specified number in the range [0,1]
                    simulation.alphaTarget(0.3).restart()
                d.fx = d.x //fx - the node's fixed x-position. Original is null.
                d.fy = d.y //fy - the node's fixed y-position. Original is null.
            }

            // when the drage gesture starts, the targeted node is fixed to the pointer
            function dragged(d) {
                d.fx = d3.event.x
                d.fy = d3.event.y
            }

            // the targeted node is released when the gesture ends
            function dragended(d) {
                if (!d3.event.active)
                    simulation.alphaTarget(0)
                d.fx = null
                d.fy = null
            }
            // #endregion

            // #region BOX PLOT
            const box_flat_data = [
                {
                    id: 0,
                    name: 'u1',
                    type: 'node',
                    value: 10,
                },
                {
                    id: 1,
                    name: 'u1',
                    type: 'node',
                    value: 20,
                },
                {
                    id: 2,
                    name: 'u1',
                    type: 'node',
                    value: 25,
                },
                {
                    id: 3,
                    name: 'u1',
                    type: 'node',
                    value: 15,
                },
                {
                    id: 4,
                    name: 'u1',
                    type: 'node',
                    value: 11,
                },
                {
                    id: 0,
                    name: 'a1',
                    type: 'node',
                    value: 30,
                },
                {
                    id: 1,
                    name: 'a1',
                    type: 'node',
                    value: 45,
                },
                {
                    id: 2,
                    name: 'a1',
                    type: 'node',
                    value: 33,
                },
                {
                    id: 3,
                    name: 'a1',
                    type: 'node',
                    value: 44,
                },
                {
                    id: 4,
                    name: 'a1',
                    type: 'node',
                    value: 55,
                },
                {
                    id: 0,
                    name: 'u2',
                    type: 'node',
                    value: 22,
                },
                {
                    id: 1,
                    name: 'u2',
                    type: 'node',
                    value: 10,
                },
                {
                    id: 2,
                    name: 'u2',
                    type: 'node',
                    value: 15,
                },
                {
                    id: 3,
                    name: 'u2',
                    type: 'node',
                    value: 17,
                },
                {
                    id: 4,
                    name: 'u2',
                    type: 'node',
                    value: 24,
                },
                {
                    id: 0,
                    name: 'uu',
                    type: 'metapath',
                    value: 30,
                },
                {
                    id: 1,
                    name: 'uu',
                    type: 'metapath',
                    value: 40,
                },
                {
                    id: 2,
                    name: 'uu',
                    type: 'metapath',
                    value: 33,
                },
                {
                    id: 3,
                    name: 'uu',
                    type: 'metapath',
                    value: 34,
                },
                {
                    id: 4,
                    name: 'uu',
                    type: 'metapath',
                    value: 43,
                },
                {
                    id: 0,
                    name: 'uau',
                    type: 'metapath',
                    value: 30,
                },
                {
                    id: 1,
                    name: 'uau',
                    type: 'metapath',
                    value: 45,
                },
                {
                    id: 2,
                    name: 'uau',
                    type: 'metapath',
                    value: 33,
                },
                {
                    id: 3,
                    name: 'uau',
                    type: 'metapath',
                    value: 44,
                },
                {
                    id: 4,
                    name: 'uau',
                    type: 'metapath',
                    value: 55,
                },
            ]

            var box_data = d3.nest()
                .key(function (d) { return d.name; })
                .rollup(function (series) {
                    const bin = series.map(d => d);
                    const values = series.map(d => d.value);
                    values.sort((a, b) => a - b);
                    const min = values[0];
                    const max = values[values.length - 1];
                    const q1 = d3.quantile(values, 0.25);
                    const q2 = d3.quantile(values, 0.50);
                    const q3 = d3.quantile(values, 0.75);
                    const iqr = q3 - q1; // interquartile range
                    const r0 = Math.max(min, q1 - iqr * 1.5);
                    const r1 = Math.min(max, q3 + iqr * 1.5);
                    bin.quartiles = [q1, q2, q3];
                    bin.range = [r0, r1];
                    bin.outliers = bin.filter(v => v.value < r0 || v.value > r1); // TODO
                    return bin;
                })
                .entries(box_flat_data);

            var type_data = d3.nest()
                .key(function (d) { return d.type; })
                .entries(box_flat_data);

            var type = { 'node': 0, 'metapath': 1 }

            var box_width = 25, jitter_width = 50, axis_width = 40, violin_width = box_width/1.5 * 1.618
            var y_axis_width = 25

            // #region BOX & VIOLIN COLOR

            var stroke_color = '#333533', stroke_opacity = 1
            var violin_color = ["#9ecae1", '#fdaf76'], violin_opacity = 0.7
            var box_color = violin_color, box_opacity = 0.3

            // #endregion


            // #region ranges
            var node_range = d3.extent(type_data[type.node].values, d => d.value)
            var metapath_range = d3.extent(type_data[type.metapath].values, d => d.value)
            node_range[0] = Math.ceil(node_range[0] * 0.8)
            metapath_range[0] = Math.ceil(metapath_range[0] * 0.8)

            console.log('node', node_range)
            console.log('meta', metapath_range)
            // #endregion

            // #region functions
            var box_x = d3.scaleBand()
                .range([real_net_width + axis_width, width - margin.right - y_axis_width])
                .domain(box_data.map(d => d.key))
                .paddingInner(1)
                .paddingOuter(.5)

            var box_node_y = d3.scaleLinear()
                .domain(node_range).nice()
                .range([height - margin.bottom * 3, margin.top])

            var box_metapath_y = d3.scaleLinear()
                .domain(metapath_range).nice()
                .range([height - margin.bottom * 3, margin.top])

            var xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom * 3})`)
                .call(d3.axisBottom(box_x))

            var y_node_Axis = g => g
                .attr("transform", `translate(${real_net_width + axis_width},0)`)
                .call(d3.axisLeft(box_node_y).ticks(null, "s"))
                .call(g => g.select(".domain").remove())

            var y_metapath_Axis = g => g
                .attr("transform", `translate(${width - margin.right - y_axis_width},0)`)
                .call(d3.axisRight(box_metapath_y).ticks(null, "s"))
                .call(g => g.select(".domain").remove())
            // #endregion

            // #region draw boxes
            var groups = svg.append('g')

            var boxes = groups.selectAll('g')
                .data(box_data)
                .enter()
                .append('g')
                .attr("transform", d => `translate(${box_x(d.key)}, 0)`)
                .attr("class", d => d.key)

            function deepCopy(data) {
                if (typeof data !== 'object' || data === null) {
                    throw new TypeError('传入参数不是对象')
                }
                let newData = {};
                const dataKeys = Object.keys(data);
                dataKeys.forEach(value => {
                    const currentDataValue = data[value];
                    // 基本数据类型的值和函数直接赋值拷贝 
                    if (typeof currentDataValue !== "object" || currentDataValue === null) {
                        newData[value] = currentDataValue;
                    } else if (Array.isArray(currentDataValue)) {
                        // 实现数组的深拷贝
                        newData[value] = [...currentDataValue];
                    } else if (currentDataValue instanceof Set) {
                        // 实现set数据的深拷贝
                        newData[value] = new Set([...currentDataValue]);
                    } else if (currentDataValue instanceof Map) {
                        // 实现map数据的深拷贝
                        newData[value] = new Map([...currentDataValue]);
                    } else {
                        // 普通对象则递归赋值
                        newData[value] = deepCopy(currentDataValue);
                    }
                });
                return newData;
            }

            boxes
                .selectAll("vertLine")
                .data(function (d) {
                    var type = d.value[0].type
                    var tmp = deepCopy(d.value.range)
                    tmp.type = type

                    return [tmp]
                })
                .enter()
                .append("line")
                .attr("class", "vertLine")
                .attr("stroke", stroke_color)
                .attr('stroke-width', '1px')
                .attr('stroke-opacity', stroke_opacity)
                .style("width", 40)
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", d => {
                    if (d.type == 'node')
                        return box_node_y(d[0])
                    else
                        return box_metapath_y(d[0])
                })
                .attr("y2", d => {
                    if (d.type == 'node')
                        return box_node_y(d[1])
                    else
                        return box_metapath_y(d[1])
                });


            boxes
                .selectAll("box")
                .data(d => [d])
                .enter()
                .append("rect")
                .attr("class", "box")
                .attr("x", -box_width / 2)
                .attr("y", d => {
                    var type = d.value[0].type
                    if (type == 'node')
                        return box_node_y(d.value.quartiles[2])
                    else
                        return box_metapath_y(d.value.quartiles[2])
                })
                .attr("height", d => {
                    var type = d.value[0].type
                    if (type == 'node')
                        return box_node_y(d.value.quartiles[0]) - box_node_y(d.value.quartiles[2])
                    else
                        return box_metapath_y(d.value.quartiles[0]) - box_metapath_y(d.value.quartiles[2])
                })
                .attr("width", box_width)
                .attr("stroke", stroke_color)
                .style("fill", function (d) {
                    if (d.value[0].type == 'node')
                        return box_color[0]
                    else
                        return box_color[1]
                })
                .attr("opacity", box_opacity)

            boxes
                .selectAll("horizontalLine")
                .data(d => {
                    var type = d.value[0].type
                    var tmp = deepCopy({ value: d.value.quartiles[1] })
                    tmp.type = type
                    return [tmp]
                })
                .enter()
                .append("line")
                .attr("class", "horizontalLine")
                .attr("stroke", stroke_color)
                .attr('stroke-width', '1px')
                .style("width", 40)
                .attr("x1", -box_width / 2)
                .attr("x2", +box_width / 2)
                .attr("y1", d => {
                    var type = d.type
                    if (type == 'node')
                        return box_node_y(d.value)
                    else
                        return box_metapath_y(d.value)
                })
                .attr("y2", d => {
                    var type = d.type
                    if (type == 'node')
                        return box_node_y(d.value)
                    else
                        return box_metapath_y(d.value)
                });

            groups.append('g')
                .call(xAxis)

            groups.append('g')
                .call(y_node_Axis)
                .attr('class', 'y_node_axis')

            groups.append('g')
                .call(y_metapath_Axis)
                .attr('class', 'y_metapath_axis')

            // #endregion

            // #region plot violin
            // Features of the histogram
            function histogram(y_func) {
                return d3.histogram()
                    .domain(y_func.domain())
                    .thresholds(y_func.ticks(20))    // Important: how many bins approx are going to be made? It is the 'resolution' of the violin plot
                    .value(d => d)
            }

            console.log('type data', type_data)

            // Compute the binning for each group of the dataset
            type_data.forEach((ele) => {
                var type = ele.key
                var sumstat = d3.nest()  // nest function allows to group the calculation per level of a factor
                    .key(function (d) { return d.name; })
                    .rollup(function (d) {   // For each key..
                        // get sepal length
                        var input = d.map(function (g) { return g.value; })    // Keep the variable called Sepal_Length
                        if (type == 'node')
                            var bins = histogram(box_node_y)(input)   // And compute the binning on it.
                        else
                            var bins = histogram(box_metapath_y)(input)   // And compute the binning on it.

                        return (bins)
                    })
                    .entries(ele.values)
                // sumstat_group.push(sumstat)

                var maxNum = 0
                for (var i in sumstat) {
                    var allBins = sumstat[i].value
                    var lengths = allBins.map(function (a) { return a.length; })
                    var longest = d3.max(lengths)
                    if (longest > maxNum) { maxNum = longest }
                }

                // The maximum width of a violin must be x.bandwidth = the width dedicated to a group
                var xNum = d3.scaleLinear()
                    .range([-violin_width, violin_width])
                    .domain([-maxNum, maxNum])

                // Add the shape to this svg!

                var violins = groups.selectAll('myViolin')
                    .data(sumstat)
                    .enter()
                    .append('g')
                    .attr("transform", d => {
                        return `translate(${box_x(d.key)}, 0)`
                    })
                    .attr("class", d => d.key)

                violins
                    .append("path")
                    .datum(function (d) { return (d.value) })     // So now we are working bin per bin
                    .style("stroke", "none")
                    .style("fill", function (d) {
                        if (type == 'node')
                            return violin_color[0]
                        else
                            return violin_color[1]
                    })
                    .style("opacity", violin_opacity)
                    .attr("d", d3.area()
                        .x0(function (d) { return (xNum(-d.length)) })
                        .x1(function (d) { return (xNum(d.length)) })
                        .y(function (d) {
                            if (type == 'node')
                                return (box_node_y(d.x0))
                            else
                                return (box_metapath_y(d.x0))
                        })
                        .curve(d3.curveCatmullRom)    // This makes the line smoother to give the violin appearance. Try d3.curveStep to see the difference
                    )
            })



            // #endregion

            // #region plot links
            var links = []

            var selected_id = [0, 4]

            var id_data = d3.nest()
                .key(d => d.id)
                .entries(box_flat_data)

            var selected_data = []
            for (var i in selected_id) {
                selected_data.push(id_data[selected_id[i]])
            }


            // for selected ids
            for (var i = 0; i < selected_data.length; i++) {
                var id = selected_data.key
                for (var j = 0; j < selected_data[i].values.length - 1; j++) {
                    var each_attr = selected_data[i].values[j]
                    var next_attr = selected_data[i].values[j + 1]
                    var each_attr_yfunc, next_attr_yfunc
                    if (each_attr.type == 'node')
                        each_attr_yfunc = box_node_y
                    else
                        each_attr_yfunc = box_metapath_y

                    if (next_attr.type == 'node')
                        next_attr_yfunc = box_node_y
                    else
                        next_attr_yfunc = box_metapath_y

                    links.push(d3.linkHorizontal()({
                        source: [box_x(each_attr.name), each_attr_yfunc(each_attr.value)],
                        target: [box_x(next_attr.name), next_attr_yfunc(next_attr.value)]
                    }))
                }
            }

            for (var i = 0; i < links.length; i++) {
                groups
                    .append('path')
                    .attr('d', links[i])
                    .attr('stroke', '#333533')
                    .attr('stroke-opacity', 0.5)
                    .attr('fill', 'none')
                    .attr('stroke-width', 1)
            }
            // #endregion

            // #endregion
        }
    },
    created() { // 生命周期中，组件被创建后调用

    },
};
