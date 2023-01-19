import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

import { Context1 } from "./../App";

function Detail(props) {
  let { 재고 } = useContext(Context1);

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let { id } = useParams();
  let [탭, 탭변경] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  });

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">5초이내 구매시 할인</div>
      ) : null}
      <YellowBtn bg="blue">암버튼</YellowBtn>
      <YellowBtn bg="orange">암버튼</YellowBtn>
      {재고[0]}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent({ 탭 }) {
  let [fade, setFade] = useState("");
  let { 재고 } = useContext(Context1);

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [탭]);

  return (
    <div className={"start " + fade}>
      {[<div>{재고}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

export default Detail;

let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;

let Box = styled.div`
  background: grey;
  padding: 20px;
`;
