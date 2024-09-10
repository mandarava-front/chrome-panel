/*
 * @Description:
 * @Version: 1.0
 * @Author: changfeng
 * @Date: 2024-09-09 11:42:19
 * @LastEditors: changfeng
 * @LastEditTime: 2024-09-09 20:29:46
 */
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import OrderExport from "./OrderExport";
import BatchExport from "./BatchDeliver";
import "../index.css";

import { Tabs } from "antd";
import type { TabsProps } from "antd";

const PanelContent = () => {
  const [activePanel, setActivePanel] = useState("1");

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "订单导出",
      children: <OrderExport />,
    },
    {
      key: "2",
      label: "批量发货",
      children: <BatchExport />,
    },
  ];

  const onChange = (key: string) => {
    setActivePanel(key);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      activeKey={activePanel}
      items={items}
      onChange={onChange}
    />
  );
};

createRoot(document.getElementById("panelRoot")!).render(
  <StrictMode>
    <PanelContent />
  </StrictMode>
);
