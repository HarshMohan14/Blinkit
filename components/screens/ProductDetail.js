import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { useCart } from '../../context/CartProvider';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProductDetail = ({ navigation, route }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={{uri:product.image}} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
      <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles=StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'#fff'
  },
  backButton:{
    marginBottom:20
  },
  image:{
    width:'100%',
    height:300,
    resizeMode:'contain',
    marginBottom:20
  },
  price:{
    fontSize:22,
    color:'green',
    fontWeight:'bold',
    marginBottom:15
  },
  description:{
    fontSize:16,
    color:"#333",
    marginBottom:20
  },
  addButton:{
    backgroundColor:'green',
    padding:15,
    borderRadius:8,
    alignItems:'center'
  },
  buttonText:{
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  }
})
export default ProductDetail;
