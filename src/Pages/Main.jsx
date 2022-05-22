import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Content from "../components/Content";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  background-image: url("https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170");
`;

const Box = styled.div`
  z-index: 300 !important;
`;

const Main = ({ movies, setMovies }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    const getCart = JSON.parse(localStorage.getItem("cart"));
    if (getCart) {
      setCart(getCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    localStorage.clear("cart");
    setCart([]);
  };

  const handleDelete = (id) => {
    const removeAndUpdate = cart.filter((item) => item.id !== id);
    setCart(removeAndUpdate);
  };

  return (
    <Container>
      <Box className="position-sticky top-0 w-100">
        <Navbar
          movies={movies}
          cart={cart}
          setCart={setCart}
          setMovies={setMovies}
          clearCart={clearCart}
          handleDelete={handleDelete}
        />
      </Box>
      <Content cart={cart} setCart={setCart} movies={movies} />
    </Container>
  );
};

export default Main;
