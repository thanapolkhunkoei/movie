import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";

const apiImg = process.env.REACT_APP_API_IMG;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: auto;

  background-color: black;
  border-radius: 1rem;

  .card {
    margin: 1rem;
    display: flex;
    flex-direction: column;

    img {
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
    }
    h4 {
      margin: 1rem 0;
    }
  }
`;

const PopupBox = styled.div``;

const Cards = ({
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
  popularity,
  cart,
  setCart,
  movies,
  id,
}) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    setCart([
      ...cart,
      {
        title: title,
        popularity: popularity,
        poster_path: poster_path,
        id: id,
      },
    ]);
    console.log(cart);
    setShow(false);
  };

  return (
    <Box>
      <div className="card bg-black">
        <img src={apiImg + poster_path} alt="pic" />
        <button
          className="mt-3 btn bg-danger d-flex align-items-center justify-content-center text-white fs-5"
          type="button"
          onClick={handleShow}
        >
          Buy
        </button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className=" d-flex flex-column justify-content-center align-items-center mx-1">
          <img
            className="card-img-top w-25 d-flex"
            src={apiImg + poster_path}
            alt="pic"
          />
          <div className="">
            <h5 className="fw-bold">{title}</h5>
            <p>{overview}</p>
            <h5 className="fw-bold text-warning">IMDb: {vote_average}</h5>
            <p>Release Date: {release_date}</p>
            <h5 className="fw-bold text-success">
              Price : {Math.round(popularity)} THB
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-light text-black" onClick={handleClose}>
            Close
          </Button>
          <Button className="bg-primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </Box>
  );
};

export default Cards;
