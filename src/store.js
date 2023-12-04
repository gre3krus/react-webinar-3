/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      cart: initState.cart || [],
      isModalOpen: initState.isModalOpen || false,
    };
    this.listeners = []; // Слушатели изменений состояния
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
    this.state = { ...this.state, ...newState };
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  openModal() {
    this.setState({
      ...this.state,
      isModalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      isModalOpen: false,
    });
  }

  /**
   * @param item
   */

  addToCart = (item) => {
    const cart = [...this.state.cart];
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.code === item.code
    );

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].count += 1;
    } else {
      cart.push({ ...item, count: 1 });
    }

    this.setState({
      cart,
    });
  };

  /**
   * @param itemCode
   */

  removeFromCart = (itemCode) => {
    const cart = this.state.cart.filter((item) => item.code !== itemCode);

    this.setState({
      cart,
    });
  };

  getTotalPrice = () => {
    return this.state.cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
  };
}

export default Store;
