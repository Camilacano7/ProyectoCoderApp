import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import allProducts from "../Data/products.json";

const ItemDetail = ({ 
  navigation,
  route
}) => {

  const {productId: idSelected} = route.params

  const [product, setProduct] = useState(null);
  const [orientation, setOrientation] = useState("portrait");
  const { width, height } = useWindowDimensions();

  useEffect(() => {
      if (width > height) setOrientation("landscape");
      else setOrientation("portrait");
  }, [width, height]);

  useEffect(() => {
      //Encontrar el producto por su id
      const productSelected = allProducts.find(
          (product) => product.id === idSelected
          );
      setProduct(productSelected);
  }, [idSelected]);

  return (
      <View>
          <Button onPress={() => navigation.goBack()} title="Go back" />
          {product ? (
              <View
                  style={
                      orientation === "portrait"
                          ? styles.mainContainer
                          : styles.mainContainerLandscape
                  }
              >
                  <Image
                      source={{ uri: product.images[0] }}
                      style={styles.image}
                      resizeMode="cover"
                  />
                  <View style={styles.textContainer}>
                      <Text style = {styles.text}>{product.title}</Text>
                      <Text style = {styles.text}>{product.description}</Text>
                      <Text style = {styles.text}>${product.price}</Text>
                      <Button title="Add cart"></Button>
                  </View>
              </View>
          ) : null}
      </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  mainContainer: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
  },
  mainContainerLandscape: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: 10,
  },
  image: {
      width: 300,
      height: 250,
  },
  textContainer: {
      padding: 10,
      flexDirection: "column",
  },
  text: {
      fontSize: 20,
  }
});