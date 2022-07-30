import { AiOutlineQuestion } from "react-icons/ai";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Usage = () => {
  const { t } = useTranslation();

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
    let flag = true;
    Agents.forEach((n) => {
      if (userAgentInfo.indexOf(n) > -1) flag = false;
    });
    return flag;
  }

  let isPhone = checkDevice();

  const popover = (
    <Popover>
      <Popover.Header>{t("userGuide")}</Popover.Header>
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

  return (
    <>
      {isPhone && (
        <OverlayTrigger trigger="click" placement="top" overlay={popover}>
          <Button
            variant="secondary"
            className="td-usage"
          >
            <AiOutlineQuestion />
          </Button>
        </OverlayTrigger>
      )}
    </>
  );
};

export default Usage;
