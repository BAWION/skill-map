// Данные навыков
const skills = [
  { id: 'basic_skills', label: 'Базовые навыки', level: 1, parents: [], description: 'Основные навыки, которые формируют фундамент для дальнейшего развития.' },
  { id: 'logic', label: 'Логика', level: 2, parents: ['basic_skills'], description: 'Развитие логического мышления.' },
  { id: 'math', label: 'Математика', level: 3, parents: ['logic'], description: 'Математика помогает в аналитическом мышлении и решении задач.' },
  { id: 'algebra', label: 'Алгебра', level: 4, parents: ['math'], description: 'Алгебра - основа математических расчетов.' },
  { id: 'geometry', label: 'Геометрия', level: 4, parents: ['math'], description: 'Геометрия - развитие пространственного мышления.' },
  { id: 'statistics', label: 'Статистика', level: 4, parents: ['math'], description: 'Статистика необходима для анализа данных.' },
  { id: 'programming', label: 'Программирование', level: 3, parents: ['logic'], description: 'Программирование для создания компьютерных решений.' },
  { id: 'algorithms', label: 'Алгоритмы', level: 4, parents: ['programming'], description: 'Алгоритмы - это основа для создания эффективных решений.' },
  { id: 'data_structures', label: 'Структуры данных', level: 4, parents: ['programming'], description: 'Структуры данных - важный элемент программирования.' },
  { id: 'communication', label: 'Коммуникация', level: 2, parents: ['basic_skills'], description: 'Эффективное общение в команде.' },
  { id: 'public_speaking', label: 'Публичные выступления', level: 3, parents: ['communication'], description: 'Публичные выступления помогают выражать свои идеи.' },
  { id: 'negotiation', label: 'Переговоры', level: 3, parents: ['communication'], description: 'Переговоры - важный навык для достижения согласия.' },
  { id: 'creativity', label: 'Креативность', level: 2, parents: ['basic_skills'], description: 'Развитие творческих навыков.' },
  { id: 'music', label: 'Музыка', level: 3, parents: ['creativity'], description: 'Музыка - форма творческого самовыражения.' },
  { id: 'instrument', label: 'Игра на инструменте', level: 4, parents: ['music'], description: 'Игра на музыкальных инструментах развивает моторику и творческое мышление.' },
  { id: 'composition', label: 'Композиция', level: 4, parents: ['music'], description: 'Композиция - создание музыкальных произведений.' },
  { id: 'art', label: 'Искусство', level: 3, parents: ['creativity'], description: 'Искусство помогает выражать эмоции и идеи.' },
  { id: 'painting', label: 'Живопись', level: 4, parents: ['art'], description: 'Живопись - визуальное самовыражение.' },
  { id: 'design', label: 'Дизайн', level: 4, parents: ['art'], description: 'Дизайн - создание визуальных решений.' }
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
            'width': '100',  // Увеличим размеры узлов
            'height': '100',
            'background-color': '#61bffc',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#ffffff',
            'font-size': '14px',
            'text-wrap': 'wrap',  // Обертка текста
            'text-max-width': '90px'
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
        name: 'breadthfirst',  // Используем раскладку breadthfirst для дерева
        directed: true,
        spacingFactor: 1.5,
        padding: 20,
        animate: true
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
