import  { useEffect, useRef, forwardRef } from "react";
import { Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { FiMoreVertical, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { TbIndentDecrease, TbIndentIncrease } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";
import {
  focusNode,
  getLastToDoY,
  putIndent,
  checkFatherCheckBox,
  deleteToDoItem,
  縮排,
  取消縮排,
  moveUp,
  moveDown,
  計算範圍,
} from "./active";
import { useTranslation } from "react-i18next";

const ToDoItem = ({ toDoState,  toDoItem }) => {
  const { toDo, setToDo } = toDoState;
  const { t } = useTranslation();
  const { id, value, isChecked, ToDoX } = toDoItem;

  const changeCheck = (id) => {
    let keep = true;
    let tmpIdx = toDo.findIndex((n) => n.id === id);
    let tmpItem = toDo[tmpIdx];
    let { ToDoX: tmpX, ToDoY: tmpY } = toDo[tmpIdx];
    let tmpCheck = (tmpItem.isChecked = !isChecked);

    let tmpArr = toDo.map((item, index) => {
      if (keep && index > tmpIdx) {
        if (item.ToDoX <= tmpX) {
          keep = false;
        } else {
          item.isChecked = tmpCheck;
        }
      }
      return item;
    });

    if (tmpCheck === false) checkFatherCheckBox(tmpX, tmpY, tmpArr);

    setToDo(tmpArr);
  };

  const changeValue = (e, id) => {
    const tmpArr = toDo.map((item) => {
      if (item.id === id) item.value = e.target.value;
      return item;
    });
    setToDo(tmpArr);
  };

  const doDelete = (id) => {
    let tmpIdx = toDo.findIndex((item) => item.id === id);
    let tmpX = toDo[tmpIdx].ToDoX;
    let count = 計算範圍(tmpX, tmpIdx, toDo);

    if (count === 1) return deleteToDoItem(count, tmpIdx, toDo, setToDo);

    Swal.fire({
      title: t("toDoListDeleteConfirm"),
      text: t("toDoListDeleteCheck"),
      icon: "warning",
      iconColor: '#E79B58',
      showCancelButton: true,
      confirmButtonText: t("sure"),
      confirmButtonColor: '#60A38C',
      cancelButtonText: t("cancel"),
    }).then((result) => {
      if (result.isConfirmed) deleteToDoItem(count, tmpIdx, toDo, setToDo);
    });
  };

  const keyDownActive = (e, id) => {
    
    /*eslint default-case: "error"*/
    switch (e.keyCode) {
      //enter
      case 13: {
        let keep = true;
        let tmpIdx = toDo.findIndex((n) => n.id === id);
        let tmpX = toDo[tmpIdx].ToDoX;
        let tmpY = getLastToDoY(toDo);
        let tmpArr = toDo.map((item, index) => {
          if (index > tmpIdx) {
            if (keep && item.ToDoX <= tmpX) {
              tmpY = item.ToDoY;
              keep = false;
            }
            if (!keep) item.ToDoY += 1;
          }
          return item;
        });

        tmpArr.push({
          ToDoX: tmpX,
          ToDoY: tmpY,
          id: uuidv4(),
          value: "",
          isChecked: false,
        });

        tmpArr.sort(function (a, b) {
          return a.ToDoY - b.ToDoY;
        });

        setToDo(tmpArr);
        break;
      }

      //tab
      case 9: {
        e.preventDefault();
        //shift+tab
        if (e.shiftKey) {
          取消縮排(toDo, setToDo, id);
        } else {
          //tab
          縮排(toDo, setToDo, id);
        }
        break;
      }

      //↑
      case 38: {
        if (e.ctrlKey || e.metaKey) {
          moveUp(toDo, setToDo, id);
        } else {
          focusNode(id, -1, toDo);
        }
        break;
      }

      //↓
      case 40: {
        if (e.ctrlKey || e.metaKey) {
          moveDown(toDo, setToDo, id);
        } else {
          focusNode(id, 1, toDo);
        }
        break;
      }

      // No Default
    }
  };

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <InputGroup>
      {putIndent(ToDoX)}
      <InputGroup.Checkbox
        checked={isChecked}
        onChange={() => changeCheck(id)}
      />
      <Form.Control
        className="ToDoListInput"
        ref={inputRef}
        disabled={isChecked}
        value={value}
        onChange={(e) => changeValue(e, id)}
        onKeyDown={(e) => keyDownActive(e, id)}
      />
      <MoreActive toDoState={toDoState} id={id} />
      <Button onClick={() => doDelete(id)}>
        <FaTrash />
      </Button>
    </InputGroup>
  );
};

const MoreActive = ({ toDoState, id }) => {
  const { toDo, setToDo } = toDoState;
  const { t } = useTranslation();

  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <Button
      ref={ref}
      onClick={(e) => {
        onClick(e);
      }}
    >
      <FiMoreVertical />
    </Button>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => 縮排(toDo, setToDo, id)}>
          {<TbIndentIncrease />}　{t("indent")}
        </Dropdown.Item>

        <Dropdown.Item onClick={() => 取消縮排(toDo, setToDo, id)}>
          {<TbIndentDecrease />}　{t("cancelIndent")}
        </Dropdown.Item>

        <Dropdown.Item onClick={() => moveUp(toDo, setToDo, id)}>
          {<FiArrowUp />}　{t("moveUp")}
        </Dropdown.Item>

        <Dropdown.Item onClick={() => moveDown(toDo, setToDo, id)}>
          {<FiArrowDown />}　{t("moveDown")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ToDoItem;
