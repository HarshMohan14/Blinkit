import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useCart } from '../../context/CartProvider';
import { useEffect, useState } from 'react';

export default function ProductList ({ navigation })  {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart=(item)=>
  {
    addToCart(item)
  }
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://fakestoreapi.in/api/products')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
;
   if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="green" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.errorText}>Please try again later</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={()=>navigation.navigate('ProductDetails',{product:item})}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={()=>handleAddToCart(item)}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <View style={{flex:1}}>
        <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.container}
    />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemContainer: { flex: 1, margin: 5, padding: 10, backgroundColor: '#fff' },
  image: { width: '100%', height: 150, resizeMode: 'contain' },
  title:{fontSize:14,marginVertical:5},
  price:{fontSize:16,fontWeight:'bold'},
  addButton:{backgroundColor:'#2ecc71',padding:10,borderRadius:5,marginTop:5},
  buttonText:{color:'white',textAlign:'center'}
});

