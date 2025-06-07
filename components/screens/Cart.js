import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useCart } from '../../context/CartProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
const Cart = ({ navigation }) => {
 const { cartItems, removeFromCart, decreaseQuantity,addToCart } = useCart();
const calculateTotal = () => {
  return cartItems
    .reduce((sum, item) => sum + (item.price * item.quantity), 0)
    .toFixed(2);
};
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.itemDetails}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
          <Ionicons name="remove-circle" size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Ionicons name="add-circle" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity
      style={styles.removeButton}
      onPress={() => removeFromCart(item.id)}
    >
      <Ionicons name="trash" size={24} color="red" />
    </TouchableOpacity>
  </View>
);
  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your Cart is Empty</Text>
        }
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>${calculateTotal()}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightgray',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
    color: 'gray',
  },
  quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 8,
},
quantityText: {
  marginHorizontal: 10,
  fontSize: 16,
},
});

export default Cart;
