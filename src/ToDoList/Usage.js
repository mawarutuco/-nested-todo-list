import { AiOutlineQuestion } from "react-icons/ai";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

//判斷手機板就不出現說明
function checkDevice() {
  let userAgentInfo = navigator.userAgent;
  let Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  let flag = false;
  Agents.forEach((n) => {
    if (userAgentInfo.indexOf(n) > -1) flag = true;
  });
  return flag;
}

const popover = (t) => {
  return (
    <Popover>
      <Popover.Header as="h2" className="bg-secondary">
        {t("userGuide")}
      </Popover.Header>
      <Popover.Body>
        <li>
          <Badge>enter</Badge> {t("enterAddNewTodoItem")}
        </li>
        <li>
          <Badge>↑/↓</Badge> {t("adjustInputPosition")}
        </li>
        <li>
          <Badge>ctrl+↑/↓</Badge> {t("adjustInputFramePosition")}
        </li>
        <li>
          <Badge>tab</Badge> {t("indent")}
        </li>
        <li>
          <Badge>tab+shift</Badge> {t("cancelIndent")}
        </li>
      </Popover.Body>
    </Popover>
  );
};

const Usage = () => {
  const { t } = useTranslation();

  return (
    <div style={{ visibility: checkDevice() ? "hidden" : "" }}>
      <OverlayTrigger trigger="click" placement="right" overlay={popover(t)}>
        <Button variant="secondary">
          <AiOutlineQuestion />
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default Usage;
