// Данные навыков
const skills = [
  { id: 'basic_logic', label: 'Базовая логика', level: 1, parents: [], description: 'Основные навыки логики, важные для аналитического мышления.' },
  { id: 'math', label: 'Математика', level: 2, parents: ['basic_logic'], description: 'Математика - это основа для развития инженерных и аналитических навыков.' },
  { id: 'programming', label: 'Программирование', level: 3, parents: ['math'], description: 'Программирование позволяет создавать компьютерные программы и решать сложные задачи.' },
  { id: 'creativity', label: 'Креативность', level: 1, parents: [], description: 'Креативное мышление - основа для разработки новых идей и решений.' },
  { id: 'art', label: 'Искусство', level: 2, parents: ['creativity'], description: 'Искусство помогает развивать творческое мышление и визуальное восприятие.' },
  { id: 'communication', label: 'Коммуникация', level: 1, parents: [], description: 'Эффективное общение - ключевой навык для работы в команде и построения отношений.' },
  { id: 'public_speaking', label: 'Публичные выступления', level: 2, parents: ['communication'], description: 'Навык публичных выступлений необходим для презентаций и убеждения аудитории.' }
];

// Массив выбранных навыков
let selectedSkills = [];

// Функция для инициализации графа
function initializeGraph() {
  console.log('Инициализация графа...');

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

  console.log('Элементы для графа:', elements);

  // Инициализируем Cytoscape
  try {
    window.cy = cytoscape({
      container: document.getElementById('skill-graph'),
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            'width': '80',
            'height': '80',
            'background-color': '#61bffc',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#ffffff',
            'font-size': '14px',
            'text-wrap': 'wrap',
            'text-max-width': '80px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#888',
            'target-arrow-color': '#888',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'grid', // Простая раскладка, чтобы проверить отображение
        rows: 3
      }
    });

    console.log('Граф успешно инициализирован');
    
    // Добавляем обработчик клика на узлы для показа подробного описания навыка
    cy.on('tap', 'node', function(evt){
      var node = evt.target;
      var description = node.data('description');
      alert('Навык: ' + node.data('label') + '\nОписание: ' + description);
    });

  } catch (error) {
    console.error('Ошибка инициализации графа:', error);
    alert('Произошла ошибка при инициализации графа. Проверьте консоль для получения дополнительной информации.');
  }
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

// Функция обновления стилей узлов
function updateNodeStyles() {
  cy.nodes().forEach(node => {
    if (selectedSkills.includes(node.id())) {
      node.addClass('selected');
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

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  console.log('Документ загружен, инициализируем граф...');
  initializeGraph();
  
  // Обработчики для чекбоксов
  document.querySelectorAll('#skill-selector input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', function() {
      onSkillSelected(this.value);
    });
  });
});
