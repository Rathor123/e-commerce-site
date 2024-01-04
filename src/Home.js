import {
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Product from "./Product";

function Home() {
  const [product, setProduct] = useState([]);
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rangePrice, setrangePrice] = useState(0);
  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const result = await response.json();
    setProduct(result);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addtocard = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + item);
  };
  const rangeChange = (e) => {
    setrangePrice(e.target.value);
    product.products.filter((item) => item.price <= rangePrice);
  };
  return (
    <>
      <Input
        type={"text"}
        h={"5vh"}
        maxW={"50vw"}
        textAlign={"center"}
        display={"flex"}
        m={"10vh auto"}
        placeholder="Serch your item here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        border={"none"}
      />
      <Button background={"gray.200 "} fontSize={"20px"}>
        Card
        <Text>{totalPrice}</Text>
      </Button>

      {/* <input
        type="range"
        defaultValue={0}
        name="pricefilter"
        id="pricefilter"
        value={rangePrice}
        onChange={rangeChange}
        min={0}
        max={1000}
      /> */}
      <Grid gridTemplateColumns={"auto auto auto auto"}>
        {query.length > 0 ? (
          <>
            {product.products
              .filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
              )
              .map((item, index) => (
                <Product
                  item={item}
                  query={query}
                  index={index}
                  key={item.id}
                  addtocard={addtocard}
                />
              ))}
          </>
        ) : (
          product &&
          product.products && (
            <>
              {product.products.map((item, index) => (
                <Product
                  item={item}
                  query={query}
                  index={index}
                  key={item.id}
                  addtocard={addtocard}
                />
              ))}
            </>
          )
        )}
      </Grid>
    </>
  );
}

export default Home;
