import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Form, FormControl, Modal } from "react-bootstrap";
import CountTime from "./CountTime";

const Navbar = ({
  movies,
  cart,
  setCart,
  clearCart,
  setMovies,
  title,
  handleDelete,
  poster_path,
}) => {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [paymentShow, setPaymentShow] = useState(false);
  const [price, setPrice] = useState(0);
  const [firstPrice, setFirstPrice] = useState(0);

  const search = process.env.REACT_APP_API_SEARCH;
  const apiImg = process.env.REACT_APP_API_IMG;

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = search + query;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (err) {
      console.log(err);
    }
    setQuery("");
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handlePaymentShow = () => {
    setPaymentShow(true);
    setShow(false);
  };
  const handlePaymentClose = () => setPaymentShow(false);

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.popularity));
    setFirstPrice(Math.round(ans));
    if (cart.length > 5) {
      ans = ans - (ans * 20) / 100;
    } else if (cart.length > 3 && cart.length <= 5) {
      ans = ans - (ans * 10) / 100;
    }
    setPrice(Math.round(ans));
    console.log(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <nav className="navbar navbar-light bg-black mx-3 p-3 my-1 rounded-pill">
      <div className="container-fluid d-flex ">
        <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
          <FormControl
            className="form-control me-2 d-flex"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="query"
            value={query}
            onChange={changeHandler}
          ></FormControl>

          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </Form>
        <div className="d-flex position-relative">
          <button
            className="btn btn-outline-none  position-relative"
            type="button"
            onClick={handleShow}
          >
            <ShoppingCartIcon className="text-white" />
            <p className="position-absolute top-10 start-75 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </p>
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} className="overflow-scroll">
        <Modal.Header closeButton>
          <button className="btn btn-warning " onClick={clearCart}>
            Clear Cart
          </button>
        </Modal.Header>
        {cart.map((item) => (
          <Modal.Body
            key={item.id}
            className=" d-flex flex-row justify-content-start align-items-center"
          >
            <img
              className="card-img-top w-25 d-flex mx-4"
              src={apiImg + item.poster_path}
              alt="pic"
            />
            <div className="">
              <h5 className="fw-bold">{item.title}</h5>

              <h5 className="fw-bold text-success">
                Price : {Math.round(item.popularity)} THB
              </h5>
              <div className="position-absolute bottom-0 end-0 translate-middle mb-1 me-3">
                <button
                  className="btn btn-outline-none position-relative"
                  type="button"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteForeverIcon className="text-danger" />
                </button>
              </div>
            </div>
          </Modal.Body>
        ))}
        <Modal.Footer className="d-flex justify-content-between">
          <Modal.Title className="text-primary">
            {cart.length > 5 && (
              <div className="d-flex">
                <p className="text-danger">
                  20% off :
                  <span className="text-decoration-line-through">
                    {firstPrice}
                  </span>
                </p>
              </div>
            )}
            {cart.length > 3 && cart.length <= 5 && (
              <div className="d-flex">
                <p className="text-danger">
                  10% off :
                  <span className="text-decoration-line-through">
                    {firstPrice}
                  </span>
                </p>
              </div>
            )}
            Total Price :
            <span className="text-success text-decoration-underline">
              {price} THB
            </span>
          </Modal.Title>
          <div className="">
            <Button className="bg-light text-black me-2" onClick={handleClose}>
              Close
            </Button>
            <Button className="bg-primary" onClick={handlePaymentShow}>
              Payment
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={paymentShow} onHide={handlePaymentClose}>
        <Modal.Body className="">
          <div className="d-flex flex-column justify-content-evenly align-items-center">
            <img
              className="card-img-top w-25 d-flex"
              src={
                "https://www.logo-th.com/wp-content/uploads/2018/06/BangkokBank.jpg"
              }
              alt="pic"
            />
            <div className="">
              <p className="fw-bold">Please pay to the following Account:</p>
              <p>
                <span className="fw-bold">Account Number: </span>936-01763-42
              </p>
              <p>
                <span className="fw-bold">Account Name:</span> thanapol khunkoei
              </p>
            </div>
          </div>
          {paymentShow && (
            <CountTime
              paymentShow={paymentShow}
              setPaymentShow={setPaymentShow}
            />
          )}
          {/* <div className="d-flex flex-column justify-content-center align-items-center">
            <h4>With in :</h4>
            <h2 className="text-danger">{count}</h2>
        </div> */}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div>
            <h4>
              Total Price :<span className="text-success">{price} THB</span>
            </h4>
          </div>
          <Button className="bg-light text-black" onClick={handlePaymentClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
