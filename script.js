// Данные дерева навыков
const treeData = {
    name: "Мои Навыки",
    children: [
        {
            name: "Программирование",
            children: [
                {
                    name: "Языки программирования",
                    children: [
                        { name: "Python" },
                        { name: "JavaScript" },
                        { name: "Java" },
                        { name: "C++" }
                    ]
                },
                {
                    name: "Фреймворки",
                    children: [
                        { name: "Django" },
                        { name: "React" },
                        { name: "Spring" },
                        { name: "Qt" }
                    ]
                },
                {
                    name: "Базы данных",
                    children: [
                        { name: "MySQL" },
                        { name: "PostgreSQL" },
                        { name: "MongoDB" },
                        { name: "Redis" }
                    ]
                },
                {
                    name: "Инструменты",
                    children: [
                        { name: "Git" },
                        { name: "Docker" },
                        { name: "Jenkins" },
                        { name: "VS Code" }
                    ]
                }
            ]
        },
        {
            name: "Иностранные Языки",
            children: [
                {
                    name: "Английский",
                    children: [
                        { name: "Базовый уровень" },
                        { name: "Продвинутый уровень" },
                        { name: "Технический английский" }
                    ]
                },
                {
                    name: "Немецкий",
                    children: [
                        { name: "Базовый уровень" },
                        { name: "Разговорный уровень" }
                    ]
                },
                {
                    name: "Испанский",
                    children: [
                        { name: "Базовый уровень" },
                        { name: "Продвинутый уровень" }
                    ]
                }
            ]
        },
        {
            name: "Менеджмент",
            children: [
                { name: "Управление проектами" },
                { name: "Лидерство" },
                { name: "Коммуникация" },
                { name: "Стратегическое планирование" }
            ]
        },
        {
            name: "Творческие Навыки",
            children: [
                { name: "Фотография" },
                { name: "Графический дизайн" },
                { name: "Письменное творчество" },
                { name: "Видео монтаж" }
            ]
        },
        {
            name: "Личностное Развитие",
            children: [
                { name: "Эмоциональный интеллект" },
                { name: "Публичные выступления" },
                { name: "Критическое мышление" },
                { name: "Тайм-менеджмент" }
            ]
        },
        {
            name: "Здоровье и Фитнес",
            children: [
                { name: "Йога" },
                { name: "Плавание" },
                { name: "Фитнес" },
                { name: "Питание" }
            ]
        }
    ]
};

// Установка размеров и переменных
const margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = document.getElementById('tree-container').offsetWidth - margin.left - margin.right,
      height = document.getElementById('tree-container').offsetHeight - margin.top - margin.bottom;

// Создание SVG-контейнера
const svg = d3.select("#tree-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Создание дерева
const treemap = d3.tree()
    .size([2 * Math.PI, Math.min(width, height) / 2 - 100]); // Радиальная раскладка

// Создание иерархической структуры
let root = d3.hierarchy(treeData);

// Сворачивание всех узлов по умолчанию
root.descendants().forEach(d => {
    if (d.depth && d.children) d._children = d.children;
});

// Обновление дерева
update(root);

// Функция обновления дерева
function update(source) {
    // Генерация новой структуры дерева
    const treeData = treemap(root);

    // Узлы и связи
    const nodes = treeData.descendants(),
          links = treeData.links();

    // Узлы
    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

    // Входные узлы
    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr("transform", d => `
            rotate(${(source.x0 * 180 / Math.PI - 90)})
            translate(${source.y0},0)
        `)
        .on('click', click)
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

    // Добавление кругов
    nodeEnter.append('circle')
        .attr('r', 1e-6)
        .style("fill", d => d._children ? "lightsteelblue" : "#fff")
        .style("stroke", "steelblue")
        .style("stroke-width", "2px");

    // Добавление текста
    nodeEnter.append('text')
        .attr("dy", "0.31em")
        .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
        .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
        .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
        .text(d => d.data.name)
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

    // Объединение входных и обновленных узлов
    const nodeUpdate = nodeEnter.merge(node);

    // Переход узлов
    nodeUpdate.transition()
        .duration(750)
        .attr("transform", d => `
            rotate(${(d.x * 180 / Math.PI - 90)})
            translate(${d.y},0)
        `);

    // Переход для кругов
    nodeUpdate.select('circle')
        .attr('r', 10)
        .style("fill", d => d._children ? "lightsteelblue" : "#fff");

    // Удаление старых узлов
    const nodeExit = node.exit().transition()
        .duration(750)
        .attr("transform", d => `
            rotate(${(source.x * 180 / Math.PI - 90)})
            translate(${source.y},0)
        `)
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    // Связи
    const link = svg.selectAll('path.link')
        .data(links, d => d.target.id);

    // Входные связи
    const linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal(o, o);
        });

    // Объединение входных и обновленных связей
    const linkUpdate = linkEnter.merge(link);

    // Переход связей
    linkUpdate.transition()
        .duration(750)
        .attr('d', d => diagonal(d.source, d.target));

    // Удаление старых связей
    const linkExit = link.exit().transition()
        .duration(750)
        .attr('d', d => {
            const o = {x: source.x, y: source.y};
            return diagonal(o, o);
        })
        .remove();

    // Сохранение старых позиций
    nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // Функция для построения связей
    function diagonal(s, d) {
        const path = `
            M ${project(s.x, s.y)}
            C ${project(s.x, (s.y + d.y) / 2)}
              ${project(d.x, (s.y + d.y) / 2)}
              ${project(d.x, d.y)}
        `;
        return path;
    }

    // Функция проекции углов и расстояний
    function project(x, y) {
        const angle = (x - Math.PI / 2);
        return [y * Math.cos(angle), y * Math.sin(angle)];
    }

    // Функция обработки клика
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

    // Создание tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip");

    // Функции для показа и скрытия tooltip
    function mouseover(event, d) {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`<strong>${d.data.name}</strong>`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    function mouseout(event, d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }

    // Инициализация корневого узла
    root.x0 = Math.PI / 2;
    root.y0 = 0;

    // Переменная для уникальных ID узлов
    let i = 0;
}
