// Данные для карты навыков
const treeData = {
    name: "Мои Навыки",
    children: [
        {
            name: "Программирование",
            children: [
                { name: "Python" },
                { name: "JavaScript" },
                { name: "Java" },
                { name: "C++" }
            ]
        },
        {
            name: "Иностранные Языки",
            children: [
                { name: "Английский" },
                { name: "Немецкий" },
                { name: "Испанский" }
            ]
        },
        {
            name: "Творческие Навыки",
            children: [
                { name: "Фотография" },
                { name: "Графический дизайн" },
                { name: "Видео монтаж" }
            ]
        },
        {
            name: "Личностное Развитие",
            children: [
                { name: "Эмоциональный интеллект" },
                { name: "Публичные выступления" },
                { name: "Критическое мышление" }
            ]
        }
    ]
};

// Размеры контейнера и радиус
const width = 800;
const height = 800;
const radius = Math.min(width, height) / 2 - 100;

// Создание контейнера SVG
const svg = d3.select("#tree-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Создание радиального дерева
const tree = d3.tree()
    .size([2 * Math.PI, radius]);

// Преобразование данных в иерархическую структуру
const root = d3.hierarchy(treeData);

// Расчет положения узлов
tree(root);

// Создание связей
const link = svg.selectAll(".link")
    .data(root.links())
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y))
    .attr("fill", "none")
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2);

// Создание узлов
const node = svg.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", d => `
        rotate(${d.x * 180 / Math.PI - 90})
        translate(${d.y},0)
    `);

// Добавление кругов к узлам
node.append("circle")
    .attr("r", 5)
    .attr("fill", d => d.children ? "lightsteelblue" : "#fff")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2);

// Добавление текста к узлам
node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.x < Math.PI ? 6 : -6)
    .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
    .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
    .text(d => d.data.name)
    .style("font-size", "12px")
    .style("fill", "#333");
