import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home  from "../pages/Home";
import { AddPedido } from "../pages/AddPedido";
import {AddProduto} from '../pages/AddProduto'
import { VerFaturamento } from "../pages/Verfaturamento";
import { VerPedidos } from "../pages/VerPedidos";
const Routes = createNativeStackNavigator();

export const ListRoutes = () => {
  return (
    <Routes.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Routes.Screen name="HomeScreen" component={Home} />
      <Routes.Screen name="AddPedido" component={AddPedido} />
      <Routes.Screen name="AddProduto" component={AddProduto} />
      <Routes.Screen name="VerFaturamento" component={VerFaturamento} />
      <Routes.Screen name="VerPedidos" component={VerPedidos} />
    </Routes.Navigator>
  );
};
