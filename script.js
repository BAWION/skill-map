// Подключение библиотеки D3.js для построения дерева навыков
document.addEventListener("DOMContentLoaded", function () {
    const width = document.getElementById("knowledge-map").offsetWidth;
    const height = 600;

    const svg = d3.select("#knowledge-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const treeData = {
        name: "Человеческие Знания",
        children: [
            {
                name: "Человеческие Создания",
                children: [
                    { name: "Искусство и Спорт" },
                    { name: "Ремесло и Технологии" },
                    {
                        name: "Наука",
                        children: [
                            { name: "Математика" },
                            { name: "Информатика" }
                        ]
                    },
                    { name: "Культура и Цивилизация" }
                ]
            },
            {
                name: "Живой Мир",
                children: [
                    { name: "Биология" },
                    { name: "Экология" },
                    { name: "Микробиология" },
                    { name: "Зоология" }
                ]
            },
            {
                name: "Физический Мир",
                children: [
                    { name: "Физика" },
                    { name: "Химия" },
                    { name: "География" },
                    { name: "Астрономия" }
                ]
            },
            {
                name: "Человек",
                children: [
                    { name: "Медицина и Психология" },
                    { name: "Антропология" },
                    { name: "Лингвистика" },
                    { name: "История" }
                ]
            }
        ]
    };

    const root = d3.hierarchy(treeData);

    const treeLayout = d3.tree().size([height, width - 160]);
    treeLayout(root);

    svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
            .x(d => d.y + 80)
            .y(d => d.x)
        );

    const nodes = svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y + 80},${d.x})`);

    nodes.append('circle')
        .attr('r', 5);

    nodes.append('text')
        .attr('dy', -10)
        .attr('x', 0)
        .attr('text-anchor', 'middle')
        .attr('class', 'text')
        .text(d => d.data.name);
});
