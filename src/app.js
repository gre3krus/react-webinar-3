import React, { useCallback, useState, useEffect } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const list = store.getState().list;

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
    <PageLayout isModalOpen={isModalOpen} closeModal={closeModal}>
      <Head title="Магазин" />
      <Controls onGoModal={openModal} />
      <List list={list} />
    </PageLayout>
  );
}

export default App;
