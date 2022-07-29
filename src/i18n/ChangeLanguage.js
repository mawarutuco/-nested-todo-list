import { forwardRef } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { TbWorld } from "react-icons/tb";

const ChangeLanguage = () => {
  const changeLanguage = (nowLanguage) => i18n.changeLanguage(nowLanguage);
  const { i18n } = useTranslation();

  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <Button
      ref={ref}
      onClick={(e) => onClick(e)}
      className="btn-lg position-absolute end-0 top-0 m-3"
      variant="light"
    >
      <TbWorld />
    </Button>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage("tw")}>
          繁體中文
        </Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage("en")}>
          English
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChangeLanguage;
