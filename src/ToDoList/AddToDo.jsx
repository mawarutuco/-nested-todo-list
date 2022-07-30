import { Button } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import { getLastToDoY } from "./active";
import { v4 as uuidv4 } from "uuid";

const AddToDo = ({ toDoState }) => {
  const { toDo, setToDo } = toDoState;

  const add = () => {
    setToDo((pre) => [
      ...pre,
      {
        ToDoX: 0,
        ToDoY: getLastToDoY(toDo),
        id: uuidv4(),
        value: "",
        isChecked: false,
      },
    ]);
  };

  return (
    <Button onClick={add} className="btn-lg rounded-circle">
      <GrAdd />
    </Button>
  );
};

export default AddToDo;
