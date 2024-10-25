// Данные для дерева навыков
const treeData = {
    name: "Мои навыки",
    children: [
        {
            name: "Программирование",
            children: [
                {
                    name: "JavaScript",
                    children: [
                        { name: "React" },
                        { name: "Node.js" },
                        { name: "TypeScript" }
                    ]
                },
                {
                    name: "Python",
                    children: [
                        { name: "Django" },
                        { name: "Flask" },
                        { name: "Машинное обучение" },
                        { name: "Pandas" }
                    ]
                },
                {
                    name: "Java",
                    children: [
                        { name: "Spring" },
                        { name: "Hibernate" },
                        { name: "Maven" }
                    ]
                },
                {
                    name: "C++",
                    children: [
                        { name: "STL" },
                        { name: "Qt" }
                    ]
                }
            ]
        },
        {
            name: "Иностранные языки",
            children: [
                { name: "Английский" },
                { name: "Немецкий" },
                { name: "Испанский" }
            ]
        },
        {
            name: "Управление проектами",
            children: [
                { name: "Scrum" },
                { name: "Kanban" },
                { name: "Agile" }
            ]
        },
        {
            name: "Творческие навыки",
            children: [
                { name: "Графический дизайн" },
                { name: "Видео монтаж" },
                { name: "Фотография" }
            ]
        },
        {
            name: "Личностное развитие",
            children: [
                { name: "Эмоциональный интеллект" },
                { name: "Критическое мышление" },
                { name: "Публичные выступления" }
            ]
        }
    ]
};

// Установка размеров и переменных
const margin = { top: 20, right: 90, bottom: 30, left: 90 },
      width = document.getElementById('tree-container').offsetWidth - margin.left - margin.right,
      height = document.getElementById('tree-container').offsetHeight - margin.top - margin.bottom;

let i = 0,
    duration = 750,
    root;

// Создание SVG
const svg = d3.select("#tree-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Создание дерева
const treemap = d3.tree().size([height, width]);

// Назначение корня
root = d3.hierarchy(treeData, d => d.children);
root.x0 = height / 2;
root.y0 = 0;

// Сворачиваем узлы по умолчанию
root.children.forEach(collapse);

update(root);

// Функция сворачивания узлов
function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

// Функция обновления дерева
function update(source) {
    const treeData = treemap(root);
    const nodes = treeData.descendants();
    const links = treeData.links();

    nodes.forEach(d => { d.y = d.depth * 180 });

    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .on('click', click);

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', d => d._children ? "lightsteelblue" : "#fff");

    nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', d => d.children || d._children ? -13 : 13)
        .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
        .text(d => d.data.name);

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.y},${d.x})`);

    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('fill', d => d._children ? "lightsteelblue" : "#fff")
        .attr('cursor', 'pointer');

    const nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    const link = svg.selectAll('path.link')
        .data(links, d => d.target.id);

    const linkEnter = link.enter().insert('path', "g")
        .attr('class', 'link')
        .attr('d', d => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
        });

    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(duration)
        .attr('d', d => diagonal(d.source, d.target));

    const linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', d => {
            const o = { x: source.x, y: source.y };
            return diagonal(o, o);
        })
        .remove();

    nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    function diagonal(s, d) {
        return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
    }

    function click(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}
