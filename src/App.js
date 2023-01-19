import { useState, createContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from "axios";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12]);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Sanghyun's SHOP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i}></Card>;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((결과) => {
                      console.log(결과.data);
                      let copy = [...shoes, ...결과.data];
                      setShoes(copy);
                    });
                  axios.post();
                }}
              >
                더보기
              </button>
            </>
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ 재고, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
      </Routes>
    </div>
  );
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>어바웃입니다만</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width={"80%"}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
