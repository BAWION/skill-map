const treeData = {
    name: "Навыки",
    children: [
        {
            name: "Школьные знания",
            hemisphere: "left",
            children: [
                {
                    name: "Математика",
                    hemisphere: "left",
                    children: [
                        { name: "Алгебра", hemisphere: "left" },
                        { name: "Геометрия", hemisphere: "left" },
                        { name: "Тригонометрия", hemisphere: "left" }
                    ]
                },
                {
                    name: "Физика",
                    hemisphere: "left",
                    children: [
                        { name: "Механика", hemisphere: "left" },
                        { name: "Электромагнетизм", hemisphere: "left" },
                        { name: "Оптика", hemisphere: "left" }
                    ]
                },
                {
                    name: "Информатика",
                    hemisphere: "left",
                    children: [
                        { name: "Основы программирования", hemisphere: "left" },
                        { name: "Алгоритмы и структуры данных", hemisphere: "left" },
                        { name: "Решение задач", hemisphere: "left" }
                    ]
                },
                {
                    name: "Языки",
                    hemisphere: "left",
                    children: [
                        { name: "Русский язык", hemisphere: "left" },
                        { name: "Литература", hemisphere: "left" },
                        { name: "Иностранные языки", hemisphere: "left" }
                    ]
                }
            ]
        },
        {
            name: "Предрасположенности",
            hemisphere: "left",
            children: [
                {
                    name: "Аналитическое мышление",
                    hemisphere: "left",
                    children: [
                        { name: "Умение решать логические задачи", hemisphere: "left" },
                        { name: "Обработка данных", hemisphere: "left" }
                    ]
                },
                {
                    name: "Креативное мышление",
                    hemisphere: "right",
                    children: [
                        { name: "Генерация идей", hemisphere: "right" },
                        { name: "Создание оригинального контента", hemisphere: "right" }
                    ]
                },
                {
                    name: "Коммуникативные навыки",
                    hemisphere: "right",
                    children: [
                        { name: "Эмпатия", hemisphere: "right" },
                        { name: "Публичные выступления", hemisphere: "right" }
                    ]
                },
                {
                    name: "Управленческие качества",
                    hemisphere: "left",
                    children: [
                        { name: "Организация процессов", hemisphere: "left" },
                        { name: "Умение делегировать", hemisphere: "left" }
                    ]
                }
            ]
        },
        {
            name: "Программирование",
            hemisphere: "left",
            children: [
                {
                    name: "Языки программирования",
                    hemisphere: "left",
                    children: [
                        { name: "Python", hemisphere: "left" },
                        { name: "JavaScript", hemisphere: "left" },
                        { name: "Java", hemisphere: "left" },
                        { name: "C++", hemisphere: "left" },
                        { name: "Go", hemisphere: "left" },
                        { name: "Rust", hemisphere: "left" },
                        { name: "Kotlin", hemisphere: "left" }
                    ]
                },
                {
                    name: "Фреймворки",
                    hemisphere: "left",
                    children: [
                        { name: "Django", hemisphere: "left" },
                        { name: "React", hemisphere: "left" },
                        { name: "Spring", hemisphere: "left" },
                        { name: "Qt", hemisphere: "left" },
                        { name: "Vue.js", hemisphere: "left" },
                        { name: "Angular", hemisphere: "left" },
                        { name: "Flask", hemisphere: "left" },
                        { name: "Express.js", hemisphere: "left" }
                    ]
                },
                {
                    name: "Базы данных",
                    hemisphere: "left",
                    children: [
                        { name: "MySQL", hemisphere: "left" },
                        { name: "PostgreSQL", hemisphere: "left" },
                        { name: "MongoDB", hemisphere: "left" },
                        { name: "SQLite", hemisphere: "left" },
                        { name: "Redis", hemisphere: "left" },
                        { name: "OracleDB", hemisphere: "left" }
                    ]
                },
                {
                    name: "Облачные технологии",
                    hemisphere: "left",
                    children: [
                        { name: "AWS", hemisphere: "left" },
                        { name: "Azure", hemisphere: "left" },
                        { name: "Google Cloud", hemisphere: "left" },
                        { name: "Docker", hemisphere: "left" },
                        { name: "Kubernetes", hemisphere: "left" }
                    ]
                }
            ]
        },
        {
            name: "Иностранные языки",
            hemisphere: "right",
            children: [
                { name: "Английский", hemisphere: "right" },
                { name: "Немецкий", hemisphere: "right" },
                { name: "Испанский", hemisphere: "right" },
                { name: "Французский", hemisphere: "right" },
                { name: "Китайский", hemisphere: "right" },
                { name: "Японский", hemisphere: "right" },
                { name: "Итальянский", hemisphere: "right" }
            ]
        },
        {
            name: "Управление проектами",
            hemisphere: "left",
            children: [
                { name: "Scrum", hemisphere: "left" },
                { name: "Kanban", hemisphere: "left" },
                { name: "Waterfall", hemisphere: "left" },
                { name: "Agile", hemisphere: "left" },
                { name: "Lean", hemisphere: "left" }
            ]
        },
        {
            name: "Творческие навыки",
            hemisphere: "right",
            children: [
                { name: "Графический дизайн", hemisphere: "right" },
                { name: "Фотография", hemisphere: "right" },
                { name: "Видео монтаж", hemisphere: "right" },
                { name: "3D моделирование", hemisphere: "right" },
                { name: "Анимация", hemisphere: "right" },
                { name: "UI/UX дизайн", hemisphere: "right" }
            ]
        },
        {
            name: "Личностное развитие",
            hemisphere: "right",
            children: [
                { name: "Эмоциональный интеллект", hemisphere: "right" },
                { name: "Публичные выступления", hemisphere: "right" },
                { name: "Критическое мышление", hemisphere: "right" },
                { name: "Тайм-менеджмент", hemisphere: "left" },
                { name: "Медитация", hemisphere: "right" }
            ]
        },
        {
            name: "Data Science",
            hemisphere: "left",
            children: [
                { name: "Машинное обучение", hemisphere: "left" },
                { name: "Нейронные сети", hemisphere: "left" },
                { name: "Анализ данных", hemisphere: "left" }
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
    .attr("transform", `translate(${width / 2},${margin.top})`); // Центрируем корень дерева

// Создание дерева
const treemap = d3.tree().size([height, width / 2]); // Делаем дерево симметричным по обе стороны

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

    // Уменьшим горизонтальные отступы и увеличим вертикальные
    nodes.forEach(d => {
        d.y = d.depth * (d.data.hemisphere === 'left' ? -220 : 220); // Умеренно уменьшенные горизонтальные отступы
        d.x = d.x * 1.4; // Легко увеличенные вертикальные отступы
    });

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
        .attr('x', d => d.children || d._children ? -20 : -20)  // Координаты текста перед кружком
        .attr('text-anchor', d => 'end')  // Привязка текста по правому краю
        .text(d => d.data.name)
        .call(wrap, 120);  // Вызов функции для переноса текста

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

// Функция для переноса текста, если он слишком длинный
function wrap(text, width) {
    text.each(function() {
        const text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              lineHeight = 1.1, // Высота строки
              x = text.attr("x"),
              y = text.attr("y"),
              dy = parseFloat(text.attr("dy")) || 0;

        let word,
            line = [],
            lineNumber = 0,
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}
