/**
 * Хранилище состояния приложения
 */

class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.counter = initState.list ? initState.list.length + 1 : 1;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */

  addItem() {
    const newItem = {
      code: this.counter++,
      title: "Новая запись",
    };

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */

  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map((item) => {
        if (item.code === code) {
          const selectedCount = item.selectedCount || 0;
          return {
            ...item,
            selected: !item.selected,
            selectedCount: item.selected ? selectedCount : selectedCount + 1,
          };
        } else if (item.selected) {
          return { ...item, selected: false };
        }
        return item;
      }),
    });
  }
}

export default Store;
