import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Products = React.createContext();

const productsData = "@Quitutes:Produtos";
const ProdutosProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const productsList = await AsyncStorage.getItem(productsData);
      if (productsList) {
        setProdutos(JSON.parse(productsList));
      }
    }
    loadProducts();
  });

  const handleAddProduct = async (data) => {
    try {
      const newProdutos = [...produtos, data];
      setProdutos(newProdutos);
      await AsyncStorage.setItem(productsData, JSON.stringify(newProdutos))
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleDelete = async (id)=>{
    const produtosList = await AsyncStorage.getItem(productsData)
    const newList = JSON.parse(produtosList).filter(produto=>{
      if(id !== produto.id){
        return produto
      }
    })
    setProdutos(newList)
    await AsyncStorage.setItem(productsData,JSON.stringify(newList))
  }

  return (
    <Products.Provider value={{ produtos, handleAddProduct,handleDelete }}>
      {children}
    </Products.Provider>
  );
};

export default ProdutosProvider;
