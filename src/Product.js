import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { StarIcon } from "@chakra-ui/icons";

function Product({ item, index, addtocard }) {
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    brand,
    images,
  } = item;
  return (
    <>
      <Card maxW="20vw" border={"black 1px soild"}>
        <CardBody>
          <Image
            w={"15vw"}
            h={"20vh"}
            src={images[0]}
            alt={description}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="1">
            <Heading size="md">{title}</Heading>
            <Text fontSize={"small"}>{description}</Text>
            <Text
              as={"span"}
              color={"white"}
              borderRadius={"full"}
              width={"fit-content"}
              padding={"0px 5px"}
              background="green"
              fontSize={"10px"}
              fontWeight={"bold"}
            >
              <StarIcon width={"20px"} />
              {rating}
            </Text>
            <HStack>
              <Text color="lightblack" fontSize="lg" fontWeight={"bold"}>
                ${price}
              </Text>
              <Text
                textDecoration={"line-through"}
                fontSize={"sm"}
                color={"gray"}
                fontWeight={"bold"}
              >
                ${Math.round(discountPercentage * price) / 100}
              </Text>
              <Text
                background="green"
                fontSize={"15px"}
                fontWeight={"bold"}
                color={"white"}
                borderRadius={"5px"}
              >
                {Math.round(discountPercentage)}%
              </Text>
            </HStack>
            <Text>{brand}</Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => addtocard(price)}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default Product;
