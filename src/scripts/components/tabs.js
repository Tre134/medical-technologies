const activeBtnClass = 'tabs__btn--active';
const activeTabClass = 'tabs__tab--active';

export default function tabs(node) {
    const btns = node.querySelectorAll(`.tabs__btn`);

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabsRoot = btn.closest('.tabs');
            const targetTabId = btn.getAttribute('data-target-tab');
            const targetTab = tabsRoot.querySelector(`#${targetTabId}`);

            if (!targetTab) return;

            // Очистить активные состояния в текущем уровне
            clearActiveState(tabsRoot);

            // Активировать выбранный таб
            btn.classList.add(activeBtnClass);
            targetTab.classList.add(activeTabClass);

            // Инициализировать вложенные табы
            const nestedTabs = targetTab.querySelectorAll('.tabs');
            nestedTabs.forEach(tabs);

            // 🔥 Автоматически активировать первую кнопку вложенных табов (если есть)
            const firstNestedTabs = targetTab.querySelector('.tabs');
            if (firstNestedTabs) {
                const firstBtn = firstNestedTabs.querySelector('.tabs__btn');
                if (firstBtn) firstBtn.click();
            }
        });
    });
}

function clearActiveState(tabsRoot) {
    tabsRoot.querySelectorAll(`.${activeBtnClass}`).forEach(btn => {
        btn.classList.remove(activeBtnClass);
    });
    tabsRoot.querySelectorAll(`.${activeTabClass}`).forEach(tab => {
        tab.classList.remove(activeTabClass);
    });
}
