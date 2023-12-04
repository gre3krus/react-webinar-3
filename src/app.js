import React, { useCallback, useState, useEffect } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalWindow from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const list = store.getState().list;
  const cart = store.getState().cart;

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setModalOpen(store.getState().isModalOpen);
    });
    return () => unsubscribe();
  }, [store]);

  const openModal = useCallback(() => {
    store.openModal();
  }, [store]);

  const closeModal = useCallback(() => {
    store.closeModal();
  }, [store]);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls onGoModal={openModal} cart={cart} />
      <ModalWindow
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        cart={cart}
        store={store}
        getTotalPrice={store.getTotalPrice}
        removeFromCart={store.removeFromCart}
      />
      <List
        list={list}
        addToCart={store.addToCart}
        removeFromCart={store.removeFromCart}
      />
    </PageLayout>
  );
}

export default App;
