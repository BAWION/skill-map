// Данные дерева навыков
const treeData = {
    name: "Базовые навыки",
    children: [
        {
            name: "Языки программирования",
            children: [
                {
                    name: "Python",
                    children: [
                        { name: "Машинное обучение" },
                        { name: "Веб-разработка" },
                        { name: "Анализ данных" }
                    ]
                },
                {
                    name: "JavaScript",
                    children: [
                        { name: "Веб-фронтенд" },
                        { name: "Node.js" },
                        { name: "React" }
                    ]
                }
            ]
        },
        {
            name: "Иностранные языки",
            children: [
                {
                    name: "Английский язык",
                    children: [
                        { name: "Базовый уровень" },
                        { name: "Продвинутый уровень" },
                        { name: "Технический английский" }
                    ]
                },
                {
                    name: "Испанский язык",
                    children: [
                        { name: "Базовый уровень" },
                        { name: "Разговорный уровень" }
                    ]
                }
            ]
        },
        {
            name: "Менеджмент",
            children: [
                { name: "Управление проектами" },
                { name: "Лидерство" },
                { name: "Коммуникация" }
            ]
        },
        {
            name: "Творческие навыки",
            children: [
                { name: "Фотография" },
                { name: "Графический дизайн" },
                { name: "Письменное творчество" }
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

// Создание SVG-контейнера
const svg = d3.select("#tree-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Создание дерева
const treemap = d3.tree().size([height, width]);

// Назначение корня дерева
root = d3.hierarchy(treeData, d => d.children);
root.x0 = height / 2;
root.y0 = 0;

// Сворачиваем узлы по умолчанию
root.children.forEach(collapse);

// Обновление дерева
update(root);

// Функция сворачивания узлов
function collapse(d) {
    if(d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

// Функция обновления дерева
function update(source) {
    // Вычисление новой структуры дерева
    const treeData = treemap(root);

    // Узлы и связи
    const nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);

    // Устанавливаем позиции узлов
    nodes.forEach(d => { d.y = d.depth * 180 });

    // Узлы
    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

    // Входим в узлы
    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .on('click', click);

    // Добавляем круги
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style('fill', d => d._children ? "lightsteelblue" : "#fff");

    // Добавляем текст
    nodeEnter.append('text')
        .attr('dy', '.35em')
        .attr('x', d => d.children || d._children ? -13 : 13)
        .attr('text-anchor', d => d.children || d._children ? 'end' : 'start')
        .text(d => d.data.name);

    // Обновление позиции узлов
    const nodeUpdate = nodeEnter.merge(node);

    // Переход на новое положение
    nodeUpdate.transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.y},${d.x})`);

    // Обновляем круги
    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style('fill', d => d._children ? "lightsteelblue" : "#fff")
        .attr('cursor', 'pointer');

    // Удаляем узлы
    const nodeExit = node.exit().transition()
        .duration(duration)
        .attr('transform', d => `translate(${source.y},${source.x})`)
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);

    // Связи
    const link = svg.selectAll('path.link')
        .data(links, d => d.id);

    // Входим в новые связи
    const linkEnter = link.enter().insert('path', "g")
        .attr('class', 'link')
        .attr('d', d => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal(o, o);
        });

    // Обновляем позиции связей
    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(duration)
        .attr('d', d => diagonal(d, d.parent));

    // Удаляем связи
    const linkExit = link.exit().transition()
        .duration(duration)
        .attr('d', d => {
            const o = { x: source.x, y: source.y };
            return diagonal(o, o);
        })
        .remove();

    // Сохраняем позиции для последующей анимации
    nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
    });

    // Функция для рисования связей
    function diagonal(s, d) {
        return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;
    }

    // Обработчик клика по узлу
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
