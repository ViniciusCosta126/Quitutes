import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Despesas = React.createContext();

const despesasData = "@Quitutes:Despesas";
const DespesasProvider = ({ children }) => {
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    async function loadDespesas() {
      const despesaList = await AsyncStorage.getItem(despesasData);
      if (despesaList) {
        setDespesas(JSON.parse(despesaList));
      }
    }
    loadDespesas();
  });

  const handleAddDespesa = async (data) => {
    try {
      const newDespesas = [...despesas, data];
      setDespesas(newDespesas);
      await AsyncStorage.setItem(despesasData, JSON.stringify(newDespesas))
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleDelete = async (id)=>{
    const despeasList = await AsyncStorage.getItem(despesasData)
    const newList = JSON.parse(despeasList).filter(despesa=>{
      if(id !== despesa.id){
        return despesa
      }
    })
    setDespesas(newList)
    await AsyncStorage.setItem(despesasData,JSON.stringify(newList))
  }

  return (
    <Despesas.Provider value={{ despesas, handleAddDespesa,handleDelete }}>
      {children}
    </Despesas.Provider>
  );
};

export default DespesasProvider;
