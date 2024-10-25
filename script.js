// Данные навыков
const skills = [
  { id: 'basic_logic', label: 'Базовая логика', level: 1, parents: [], description: 'Основные навыки логики, важные для аналитического мышления.' },
  { id: 'math', label: 'Математика', level: 2, parents: ['basic_logic'], description: 'Математика - это основа для развития инженерных и аналитических навыков.' },
  { id: 'programming', label: 'Программирование', level: 3, parents: ['math'], description: 'Программирование позволяет создавать компьютерные программы и решать сложные задачи.' },
  { id: 'advanced_programming', label: 'Продвинутое программирование', level: 4, parents: ['programming'], description: 'Развитие навыков программирования на продвинутом уровне, включая алгоритмы и структуры данных.' },
  { id: 'innovation', label: 'Инновации в ИТ', level: 5, parents: ['advanced_programming'], description: 'Создание инновационных решений, например, запуск ИТ-стартапа.' },
  { id: 'creativity', label: 'Креативность', level: 1, parents: [], description: 'Креативное мышление - основа для разработки новых идей и решений.' },
  { id: 'art', label: 'Искусство', level: 2, parents: ['creativity'], description: 'Искусство помогает развивать творческое мышление и визуальное восприятие.' },
  { id: 'design', label: 'Дизайн', level: 3, parents: ['art'], description: 'Навыки дизайна позволяют создавать визуальные проекты, важные для маркетинга и интерфейсов.' },
  { id: 'communication', label: 'Коммуникация', level: 1, parents: [], description: 'Эффективное общение - ключевой навык для работы в команде и построения отношений.' },
  { id: 'public_speaking', label: 'Публичные выступления', level: 2, parents: ['communication'], description: 'Навык публичных выступлений необходим для презентаций и убеждения аудитории.' },
  { id: 'leadership', label: 'Лидерство', level: 3, parents: ['public_speaking'], description: 'Лидерство включает в себя управление командой и принятие стратегических решений.' }
];

// Массив выбранных навыков
let selectedSkills = [];

// Функция для инициализации графа
function initializeGraph() {
  // Преобразуем данные навыков в формат элементов Cytoscape
  const elements = [];

  skills.forEach(skill => {
    // Добавляем узел
    elements.push({
      data: { id: skill.id, label: skill.label, description: skill.description }
    });

    // Добавляем ребра (связи)
    skill.parents.forEach(parentId => {
      elements.push({
        data: { source: parentId, target: skill.id }
      });
    });
  });

  // Инициализируем Cytoscape
  window.cy = cytoscape({
    container: document.getElementById('skill-graph'),
    elements: elements,
    style: [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'width': '100', /* Размеры узлов */
          'height': '100',
          'background-color': '#61bffc',
          'text-valign': 'center',
          'text-halign': 'center',
          'color': '#ffffff',
          'font-size': '14px',
          'text-wrap': 'wrap',
          'text-max-width': '100px',
          'overlay-padding': '6px',
          'z-index': '10'
        }
      },
      {
        selector: 'node.selected',
        style: {
          'background-color': '#28a745'
        }
      },
      {
        selector: 'node.available',
        style: {
          'border-color': '#ffc107',
          'border-width': '4px'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 4, /* Увеличенная толщина линий для улучшенной видимости */
          'line-color': '#888',
          'target-arrow-color': '#888',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      }
    ],
    layout: {
      name: 'breadthfirst', // Иерархическая раскладка
      directed: true,
      padding: 10,
      spacingFactor: 1.5, // Более плотная компоновка
      animate: true
    }
  });

  // Добавляем обработчик клика на узлы для показа подробного описания навыка
  cy.on('tap', 'node', function(evt){
    var node = evt.target;
    var description = node.data('description');
    alert('Навык: ' + node.data('label') + '\nОписание: ' + description);
  });

  // Добавляем всплывающие подсказки при наведении на узлы
  cy.on('mouseover', 'node', function(evt){
    var node = evt.target;
    node.qtip({
      content: {
        text: node.data('description'),
        title: node.data('label')
      },
      position: {
        my: 'top center',
        at: 'bottom center'
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8
        }
      }
    }, evt);
  });
}

// Функция обновления стилей узлов
function updateNodeStyles() {
  cy.nodes().forEach(node => {
    if (selectedSkills.includes(node.id())) {
      node.addClass('selected');
      node.removeClass('available');
    } else {
      node.removeClass('selected');
    }
  });
}

// Функция для определения доступных навыков
function updateAvailableSkills() {
  const availableSkills = [];

  skills.forEach(skill => {
    if (!selectedSkills.includes(skill.id)) {
      // Проверяем, освоены ли все родительские навыки
      const parentsMastered = skill.parents.every(parentId => selectedSkills.includes(parentId));
      if (parentsMastered) {
        availableSkills.push(skill.id);
      }
    }
  });

  cy.nodes().forEach(node => {
    if (availableSkills.includes(node.id())) {
      node.addClass('available');
    } else {
      node.removeClass('available');
    }
  });
}

// Обработчик выбора навыков
function onSkillSelected(skillId) {
  if (!selectedSkills.includes(skillId)) {
    selectedSkills.push(skillId);
  } else {
    selectedSkills = selectedSkills.filter(id => id !== skillId);
  }
  updateNodeStyles();
  updateAvailableSkills();
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  initializeGraph();
  // Обработчики для чекбоксов
  document.querySelectorAll('#skill-selector input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', function() {
      onSkillSelected(this.value);
    });
  });
});
