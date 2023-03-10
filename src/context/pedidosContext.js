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
  },[]);

  const handleAddOrder = async (data) => {
    try {
      const newOrders = [...pedidos, data];
      setPedidos(newOrders);
      await AsyncStorage.setItem(ordersData, JSON.stringify(newOrders))
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleIsDone = async (id)=>{
    const pedidosList = await AsyncStorage.getItem(ordersData)
    const newList = JSON.parse(pedidosList).map(pedido=>{
      if(id === pedido.id){
        return {
          ...pedido,
          is_done:!pedido.is_done
        }
      }
      return pedido
    })
    setPedidos(newList)
    await AsyncStorage.setItem(ordersData,JSON.stringify(newList))
  }
  const handleIsPay = async (id)=>{
    const pedidosList = await AsyncStorage.getItem(ordersData)
    const newList = JSON.parse(pedidosList).map(pedido=>{
      if(id === pedido.id){
        return {
          ...pedido,
          is_pay:!pedido.is_pay
        }
      }
      return pedido
    })
    setPedidos(newList)
    await AsyncStorage.setItem(ordersData,JSON.stringify(newList))
  }
  const handleDelete = async (id)=>{
    const pedidosList = await AsyncStorage.getItem(ordersData)
    const newList = JSON.parse(pedidosList).filter(pedido=>{
      if(id !== pedido.id){
        return pedido
      }
    })
    setPedidos(newList)
    await AsyncStorage.setItem(ordersData,JSON.stringify(newList))
  }

  return (
    <Orders.Provider value={{ pedidos, handleAddOrder,handleIsDone,handleDelete,handleIsPay}}>
      {children}
    </Orders.Provider>
  );
};

export default PedidosProvider;
