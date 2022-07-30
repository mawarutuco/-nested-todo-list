import { Container, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import ChangeLanguage from "../i18n/ChangeLanguage";
import ToDoStateBtn from "./ToDoStateBtn";
import Usage from "./Usage";
import { ShowPage } from "./active";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  const cardStyle = {
    boxShadow: "53px 41px 80px rgba(0, 0, 0, 0.33)",
    minHeight: "500px",
    minWidth: "300px",
    maxWidth: "800px",
    borderRadius: "50px",
    margin: "0 auto",
  };
  // x y 模糊程度 rgba(0, 0, 0, 深度)

  const [toDo, setToDo] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || [
      {
        ToDoX: 0,
        ToDoY: 0,
        id: 0,
        value: "",
        isChecked: false,
      },
    ]
  );
  const toDoState = { toDo, setToDo };

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(toDo));
  }, [toDo]);

  const [page, setPage] = useState(0);

  return (
    <>


      <Container className="mt-5">
        <Row>
          <Card style={cardStyle} className="tdm-itemShowMoveUp">
            <Card.Title className="m-2">
              <Row>
                <Col className="d-flex justify-content-center m-3">
                  <ToDoStateBtn setPage={setPage} page={page} />
                </Col>
              </Row>
            </Card.Title>
            <Card.Body>
              {ShowPage(page, toDo).map((item) => {
                return (
                  <ToDo key={item.id} toDoState={toDoState} toDoItem={item} />
                );
              })}
            </Card.Body>
            <div className="d-flex justify-content-end m-5">
              <AddToDo toDoState={toDoState} />
            </div>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default Index;
