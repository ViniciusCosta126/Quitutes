import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Orders = React.createContext();

const ordersData = "@Quitutes:Pedidos";
const PedidosProvider = ({ children }) => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const pedidosList = await AsyncStorage.getItem(ordersData);
      if (pedidosList) {
        setPedidos(JSON.parse(pedidosList));
      }
    }
    loadOrders();
  });

  const handleAddOrder = async (data) => {
    try {
      const newOrders = [...pedidos, data];
      setPedidos(newOrders);
      await AsyncStorage.setItem(ordersData, JSON.stringify(newOrders))
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Orders.Provider value={{ pedidos, handleAddOrder }}>
      {children}
    </Orders.Provider>
  );
};

export default PedidosProvider;
