import { Button, notification, Space } from "antd";
export const openCustomNotificationWithIcon = (
  type,
  message,
  description = "",
  placement = ""
) => {
  notification[type]({
    message,
    description,
    placement,
  });
};
