const categories = document.querySelectorAll('.categories li');
const instructions = document.querySelector('.instructions');
const instructionDetails = document.querySelector('.instruction-details');
const details = document.querySelector('.details');
const moreInfoLink = document.querySelector('.more-info');
const roleButtons = document.querySelectorAll('.role-button');
const adminLogin = document.getElementById('admin-login');
const adminPassword = document.getElementById('admin-password');
const adminLoginButton = document.getElementById('admin-login-button');
const adminPanel = document.querySelector('.admin-panel');
const addInstructionButton = document.getElementById('add-instruction');
const deleteInstructionButton = document.getElementById('delete-instruction');

// Получаем списки инструкций
const zkvsInstructionsList = document.getElementById('zkvs-instructions');
const internetInstructionsList = document.getElementById('internet-instructions');
const otherInstructionsList = document.getElementById('other-instructions');

// Обработка выбора роли
roleButtons.forEach(button => {
    button.addEventListener('click', () => {
        roleButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const activeRole = button.dataset.role;
        if (activeRole === 'client') {
            document.querySelectorAll('.category-content').forEach(content => {
                content.style.display = 'block'; 
            });
        } else if (activeRole === 'admin') {
            document.querySelectorAll('.category-content').forEach(content => {
                content.style.display = 'none'; 
            });
            adminLogin.value = '';
            adminPassword.value = '';
            adminLoginButton.style.display = 'block';
        }
    });
});

// Обработка входа в админ-панель
adminLoginButton.addEventListener('click', () => {
    if (adminLogin.value === 'admin' && adminPassword.value === '12345678') {
        adminLoginButton.style.display = 'none';
        adminPanel.style.display = 'block';
    } else {
        alert('Неверный логин или пароль');
    }
});

// Обработка добавления инструкции (для админа)
addInstructionButton.addEventListener('click', () => {
    const category = prompt('Введите категорию инструкции (ZKVS, Internet, Other):');
    const instructionText = prompt('Введите текст инструкции:');
    const instructionLink = prompt('Введите ссылку на подробную информацию (необязательно):');

    if (category && instructionText) {
        const newInstruction = document.createElement('li');
        newInstruction.classList.add('instruction');

        // Генерируем уникальный ID для инструкции
        let instructionId = `${category}-instruction-${Date.now()}`;
        newInstruction.dataset.instruction = instructionId;

        newInstruction.innerHTML = `
            <span>${instructionText}</span>
            ${instructionLink ? `<a href="${instructionLink}" target="_blank">Подробнее</a>` : ''}
        `;

        // Добавляем инструкцию в соответствующий список
        switch (category.toLowerCase()) {
            case 'zkvs':
                zkvsInstructionsList.appendChild(newInstruction);
                break;
            case 'internet':
                internetInstructionsList.appendChild(newInstruction);
                break;
            case 'other':
                otherInstructionsList.appendChild(newInstruction);
                break;
            default:
                alert('Неверная категория инструкции!');
                break;
        }

        // Добавляем обработчик клика для новой инструкции
        newInstruction.addEventListener('click', (event) => {
            const instruction = event.target.closest('.instruction');
            
            if (instruction) {
                const instructionId = instruction.dataset.instruction;
                const instructionLink = instruction.dataset.link; // Получаем ссылку из атрибута data-link
                
                details.innerHTML = `
                    <p>Подробная информация об инструкции ${instructionId}.</p>
                    ${instructionLink ? `<a href="${instructionLink}" target="_blank">Подробнее</a>` : ''}
                `;

                instructionDetails.style.display = 'block';
                moreInfoLink.href = instructionLink; // Устанавливаем ссылку в a.more-info
            }
        });
    } else {
        alert('Введите текст инструкции!');
    }
});

// Обработка удаления инструкции (для админа)
deleteInstructionButton.addEventListener('click', () => {
    const category = prompt('Введите категорию инструкции (ZKVS, Internet, Other):');
    const instructionText = prompt('Введите текст инструкции для удаления:');

    if (category && instructionText) {
        let instructionsList;
        switch (category.toLowerCase()) {
            case 'zkvs':
                instructionsList = zkvsInstructionsList;
                break;
            case 'internet':
                instructionsList = internetInstructionsList;
                break;
            case 'other':
                instructionsList = otherInstructionsList;
                break;
            default:
                alert('Неверная категория инструкции!');
                return;
        }

        // Находим инструкцию для удаления
        const instructionToDelete = Array.from(instructionsList.children).find(instruction => 
            instruction.textContent.trim() === instructionText.trim()
        );

        if (instructionToDelete) {
            instructionsList.removeChild(instructionToDelete);
        } else {
            alert('Инструкция не найдена!');
        }
    } else {
        alert('Введите категорию и текст инструкции!');
    }
});

// Остальная логика для работы с инструкциями
categories.forEach(category => {
    category.addEventListener('click', () => {
        const categoryContent = document.querySelector(`.category-content[data-category="${category.dataset.category}"]`);
        const activeCategory = document.querySelector('.categories li.active');
        
        if (activeCategory) {
            activeCategory.classList.remove('active');
            activeCategory.querySelector('.fas').classList.remove('fa-caret-up');
            activeCategory.querySelector('.fas').classList.add('fa-caret-down');
        }

        category.classList.add('active');
        category.querySelector('.fas').classList.remove('fa-caret-down');
        category.querySelector('.fas').classList.add('fa-caret-up');

        categoryContent.classList.add('active');

        instructions.style.display = 'block';
    });
});

instructions.addEventListener('click', (event) => {
    const instruction = event.target.closest('.instruction');

    if (instruction) {
        const instructionId = instruction.dataset.instruction;
        const instructionLink = instruction.dataset.link; // Получаем ссылку из атрибута data-link
        const instructionDetails = document.querySelector(`.instruction-details`);

        details.innerHTML = `
            <p>Подробная информация об инструкции ${instructionId}.</p>
            ${instructionLink ? `<a href="${instructionLink}" target="_blank">Подробнее</a>` : ''}
        `;

        instructionDetails.style.display = 'block';
        moreInfoLink.href = instructionLink; // Устанавливаем ссылку в a.more-info
    }
});

moreInfoLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'instruction.html'; // Перенаправляем на страницу instruction.html
});