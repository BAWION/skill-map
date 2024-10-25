// Данные навыков
const skills = [
  { id: 'basic_logic', label: 'Базовая логика', level: 1, parents: [], achievement: '' },
  { id: 'math', label: 'Математика', level: 2, parents: ['basic_logic'], achievement: '' },
  { id: 'programming', label: 'Программирование', level: 3, parents: ['math'], achievement: '' },
  { id: 'advanced_programming', label: 'Продвинутое программирование', level: 4, parents: ['programming'], achievement: '' },
  { id: 'innovation', label: 'Инновации в ИТ', level: 5, parents: ['advanced_programming'], achievement: 'Создание ИТ-стартапа' },
  { id: 'creativity', label: 'Креативность', level: 1, parents: [], achievement: '' },
  { id: 'art', label: 'Искусство', level: 2, parents: ['creativity'], achievement: '' },
  { id: 'design', label: 'Дизайн', level: 3, parents: ['art'], achievement: '' },
  { id: 'communication', label: 'Коммуникация', level: 1, parents: [], achievement: '' },
  { id: 'public_speaking', label: 'Публичные выступления', level: 2, parents: ['communication'], achievement: '' },
  { id: 'leadership', label: 'Лидерство', level: 3, parents: ['public_speaking'], achievement: 'Руководство командой' }
  // Добавьте больше навыков по необходимости
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
      data: { id: skill.id, label: skill.label, level: skill.level, achievement: skill.achievement }
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
          'width': 'mapData(level, 1, 5, 30, 60)',
          'height': 'mapData(level, 1, 5, 30, 60)',
          'background-color': '#61bffc',
          'text-valign': 'center',
          'color': '#fff',
          'font-size': '12px',
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
          'width': 2,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      }
    ],
    layout: {
      name: 'breadthfirst',
      directed: true,
      padding: 10
    }
  });

  // Добавляем обработчик клика на узлы
  cy.on('tap', 'node', function(evt){
    var node = evt.target;
    var achievement = node.data('achievement');
    if (achievement) {
      alert('Навык: ' + node.data('label') + '\nВозможное достижение: ' + achievement);
    } else {
      alert('Навык: ' + node.data('label'));
    }
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
