// Простая версия данных для тестирования
const treeData = {
    name: "Навыки",
    children: [
        {
            name: "Школьные знания",
            children: [
                {
                    name: "Математика",
                    children: [
                        { name: "Алгебра" },
                        { name: "Геометрия" },
                        { name: "Тригонометрия" }
                    ]
                },
                {
                    name: "Физика",
                    children: [
                        { name: "Механика" },
                        { name: "Электромагнетизм" },
                        { name: "Оптика" }
                    ]
                },
                {
                    name: "Информатика",
                    children: [
                        { name: "Основы программирования" },
                        { name: "Алгоритмы и структуры данных" },
                        { name: "Решение задач" }
                    ]
                },
                {
                    name: "Языки",
                    children: [
                        { name: "Русский язык" },
                        { name: "Литература" },
                        { name: "Иностранные языки" }
                    ]
                }
            ]
        },
        {
            name: "Предрасположенности",
            children: [
                {
                    name: "Аналитическое мышление",
                    children: [
                        { name: "Умение решать логические задачи" },
                        { name: "Обработка данных" }
                    ]
                },
                {
                    name: "Креативное мышление",
                    children: [
                        { name: "Генерация идей" },
                        { name: "Создание оригинального контента" }
                    ]
                },
                {
                    name: "Коммуникативные навыки",
                    children: [
                        { name: "Эмпатия" },
                        { name: "Публичные выступления" }
                    ]
                },
                {
                    name: "Управленческие качества",
                    children: [
                        { name: "Организация процессов" },
                        { name: "Умение делегировать" }
                    ]
                }
            ]
        },
        {
            name: "Программирование",
            children: [
                {
                    name: "Языки программирования",
                    children: [
                        { name: "Python", prerequisites: ["Алгоритмы и структуры данных", "Информатика"] },
                        { name: "JavaScript", prerequisites: ["Информатика"] },
                        { name: "Java", prerequisites: ["Алгебра", "Информатика"] },
                        { name: "C++", prerequisites: ["Математика", "Алгоритмы и структуры данных"] },
                        { name: "Go", prerequisites: ["Информатика"] },
                        { name: "Rust", prerequisites: ["Системное программирование", "Математика"] },
                        { name: "Kotlin", prerequisites: ["Java"] }
                    ]
                },
                {
                    name: "Фреймворки",
                    children: [
                        { name: "Django", prerequisites: ["Python"] },
                        { name: "React", prerequisites: ["JavaScript"] },
                        { name: "Spring", prerequisites: ["Java"] },
                        { name: "Qt", prerequisites: ["C++"] },
                        { name: "Vue.js", prerequisites: ["JavaScript"] },
                        { name: "Angular", prerequisites: ["JavaScript"] },
                        { name: "Flask", prerequisites: ["Python"] },
                        { name: "Express.js", prerequisites: ["JavaScript"] }
                    ]
                },
                {
                    name: "Базы данных",
                    children: [
                        { name: "MySQL", prerequisites: ["Математика", "Алгоритмы"] },
                        { name: "PostgreSQL", prerequisites: ["Математика"] },
                        { name: "MongoDB", prerequisites: ["Информатика"] },
                        { name: "SQLite", prerequisites: ["Алгоритмы"] },
                        { name: "Redis", prerequisites: ["Математика"] },
                        { name: "OracleDB", prerequisites: ["Математика", "Базы данных"] }
                    ]
                },
                {
                    name: "Облачные технологии",
                    children: [
                        { name: "AWS", prerequisites: ["Базы данных", "Системное программирование"] },
                        { name: "Azure", prerequisites: ["Системное программирование"] },
                        { name: "Google Cloud", prerequisites: ["Математика", "Системное программирование"] },
                        { name: "Docker", prerequisites: ["Операционные системы", "Сетевые технологии"] },
                        { name: "Kubernetes", prerequisites: ["Docker", "Сетевые технологии"] }
                    ]
                }
            ]
        },
        {
            name: "Иностранные языки",
            children: [
                { name: "Английский", prerequisites: ["Школьные знания"] },
                { name: "Немецкий", prerequisites: ["Школьные знания"] },
                { name: "Испанский", prerequisites: ["Школьные знания"] },
                { name: "Французский", prerequisites: ["Школьные знания"] },
                { name: "Китайский", prerequisites: ["Школьные знания"] },
                { name: "Японский", prerequisites: ["Школьные знания"] },
                { name: "Итальянский", prerequisites: ["Школьные знания"] }
            ]
        },
        {
            name: "Управление проектами",
            children: [
                { name: "Scrum", prerequisites: ["Коммуникативные навыки", "Организация процессов"] },
                { name: "Kanban", prerequisites: ["Управленческие качества", "Математика"] },
                { name: "Waterfall", prerequisites: ["Организация процессов"] },
                { name: "Agile", prerequisites: ["Креативное мышление", "Аналитическое мышление"] },
                { name: "Lean", prerequisites: ["Аналитическое мышление", "Управленческие качества"] }
            ]
        },
        {
            name: "Творческие навыки",
            children: [
                { name: "Графический дизайн", prerequisites: ["Креативное мышление"] },
                { name: "Фотография", prerequisites: ["Эстетическое восприятие"] },
                { name: "Видео монтаж", prerequisites: ["Креативное мышление", "Фотография"] },
                { name: "3D моделирование", prerequisites: ["Графический дизайн", "Программирование"] },
                { name: "Анимация", prerequisites: ["Графический дизайн", "Физика (механика)"] },
                { name: "UI/UX дизайн", prerequisites: ["Графический дизайн", "Креативное мышление"] }
            ]
        },
        {
            name: "Личностное развитие",
            children: [
                { name: "Эмоциональный интеллект", prerequisites: ["Коммуникативные навыки"] },
                { name: "Публичные выступления", prerequisites: ["Коммуникативные навыки", "Эмпатия"] },
                { name: "Критическое мышление", prerequisites: ["Аналитическое мышление"] },
                { name: "Тайм-менеджмент", prerequisites: ["Организация процессов"] },
                { name: "Медитация", prerequisites: ["Эмоциональный интеллект"] }
            ]
        },
        {
            name: "Data Science",
            children: [
                { name: "Машинное обучение", prerequisites: ["Математика", "Python"] },
                { name: "Нейронные сети", prerequisites: ["Машинное обучение", "Статистика"] },
                { name: "Анализ данных", prerequisites: ["Математика", "Статистика"] }
            ]
        }
    ]
};

// Размеры контейнера и переменные
const margin = { top: 20, right: 90, bottom: 30, left: 90 },
      width = document.getElementById('tree-container').offsetWidth - margin.left - margin.right,
      height = document.getElementById('tree-container').offsetHeight - margin.top - margin.bottom;

let i = 0,
    duration = 750,
    root;

// Создание масштабируемого SVG
const svg = d3.select("#tree-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.zoom().on("zoom", function (event) {
        svg.attr("transform", event.transform);
    }))
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Создание дерева
const treemap = d3.tree().size([height, width]);

// Определение корня дерева
root = d3.hierarchy(treeData, d => d.children);
root.x0 = height / 2;
root.y0 = 0;

// Функция сворачивания узлов
function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

// Сворачиваем узлы по умолчанию
root.children.forEach(collapse);

update(root);

// Функция обновления дерева
function update(source) {
    const treeData = treemap(root);

    const nodes = treeData.descendants(),
          links = treeData.links();

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
