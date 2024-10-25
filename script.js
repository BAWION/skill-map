// Инициализация данных дерева
let treeData = {
    name: "Мои навыки",
    children: []
};

// Проверка наличия сохраненных данных
if (localStorage.getItem('treeData')) {
    treeData = JSON.parse(localStorage.getItem('treeData'));
}

// Установка размеров и переменных
const margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = document.getElementById('tree-container').offsetWidth - margin.left - margin.right,
    height = document.getElementById('tree-container').offsetHeight - margin.top - margin.bottom;

let i = 0,
    duration = 750,
    root;

let selectedNode = null;

// Создание SVG
const svg = d3.select("#tree-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .on("click", function() {
        // Сброс выбранного узла при клике по области вне узлов
        selectedNode = null;
        d3.selectAll('circle').style('stroke', 'steelblue');
    })
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Создание дерева
const treemap = d3.tree().size([height, width]);

// Назначение корня
root = d3.hierarchy(treeData, d => d.children);
root.x0 = height / 2;
root.y0 = 0;

// Функция обновления дерева
function update(source) {
    // Вычисление новой структуры дерева
    const treeData = treemap(root);

    // Узлы и связи
    const nodes = treeData.descendants(),
        links = treeData.links();

    // Устанавливаем позиции узлов
    nodes.forEach(d => { d.y = d.depth * 180 });

    // Узлы
    const node = svg.selectAll('g.node')
        .data(nodes, d => d.id || (d.id = ++i));

    // Входим в узлы
    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${source.y0},${source.x0})`)
        .on('click', function(event, d) {
            event.stopPropagation(); // Предотвращаем всплытие события
            click(event, d);
        });

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
        .style('fill', d => {
            if (d === selectedNode) {
                return "orange";
            }
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer')
        .style('stroke', d => d === selectedNode ? 'orange' : 'steelblue');

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
        .data(links, d => d.target.id);

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
        .attr('d', d => diagonal(d.source, d.target));

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
        // Обновляем выбранный узел
        selectedNode = d;
        // Обновляем цвета узлов
        svg.selectAll('circle').style('stroke', node => node === selectedNode ? 'orange' : 'steelblue');
        update(d);
    }

    // Сохраняем данные в localStorage
    localStorage.setItem('treeData', JSON.stringify(root.data));
}

// Инициализируем дерево
update(root);

// Добавляем обработчик формы
document.getElementById('skill-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const skillName = document.getElementById('skill-input').value.trim();
    if (skillName) {
        addSkill(skillName);
        document.getElementById('skill-input').value = '';
    }
});

// Функция добавления навыка
function addSkill(skillName) {
    const targetNode = selectedNode ? selectedNode : root;
    if (!targetNode.data.children) {
        targetNode.data.children = [];
    }
    // Проверяем, есть ли уже такой навык
    const existingSkill = targetNode.data.children.find(child => child.name === skillName);
    if (existingSkill) {
        alert('Этот навык уже добавлен к выбранному узлу.');
        return;
    }
    targetNode.data.children.push({ name: skillName });
    // Обновляем дерево
    root = d3.hierarchy(root.data, d => d.children);
    root.x0 = height / 2;
    root.y0 = 0;
    update(targetNode);
}
