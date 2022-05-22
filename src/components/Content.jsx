import React from "react";
import styled from "styled-components";
import Cards from "./Cards";

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0.6rem;
`;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
`;

const Content = ({ movies, cart, setCart }) => {
  return (
    <Container>
      <Box>
        {movies.map((m) => (
          <Cards
            key={m.id}
            {...m}
            movies={movies}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Content;
