import { Button, ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ToDoStateBtn = ({ setPage, page }) => {
  const { t } = useTranslation();
  const pages = [t("all"), t("active"), t("completed")];

  const changeBtnColor = (item) =>
    page === item ? "primary" : "outline-primary";

  return (
    <ButtonGroup>
      {pages.map((item, index) => (
        <Button
          variant={changeBtnColor(index)}
          onClick={() => setPage(index)}
          key={item}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ToDoStateBtn;
