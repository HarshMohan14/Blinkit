import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import ProductList from "./components/screens/ProductList"
import ProductDetail from "./components/screens/ProductDetail"
import CartProvider from "./context/CartProvider"
import Cart from './components/screens/Cart'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
const Stack=createStackNavigator();
const Tab=createBottomTabNavigator();

function HomeStack()
{
  return (
    <Stack.Navigator>
    <Stack.Screen name="ProductList" component={ProductList} options={{headerShown:false}} />
    <Stack.Screen name="ProductDetails" options={{headerShown:false}} component={ProductDetail} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <CartProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                const icons = {
                  Home: 'home-outline',
                  Cart: 'cart-outline'
                };
                return <Ionicons name={icons[route.name]} size={size} color={color} />;
              }
            })}
          >
            <Tab.Screen name="Blinkit" component={HomeStack} />
            <Tab.Screen name="Cart" component={Cart} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </CartProvider>
  );
}