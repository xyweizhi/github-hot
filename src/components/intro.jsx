import React from "react";
import { Row, Col } from "antd";
import { UserOutlined, CrownOutlined, SmileOutlined } from "@ant-design/icons";
import styles from "./intro.less";

const icon = {
  backgroundColor: "#eee",
  fontSize: "120px",
  padding: "32px",
};

export default function Intro() {
  return (
    <div className={styles.intro}>
      <h1 className={styles.title}>Instroction</h1>
      <Row justify="center">
        <Col span={5}>
          <div className={styles["intro-item"]}>
            <h3>Enter two Github</h3>
            {/* <UserOutlined className={styles.icon} /> */}
            <i
              className="fa fa-users"
              style={{ ...icon, color: "rgba(255,191,116)" }}
            />
          </div>
        </Col>
        <Col span={5}>
          <div className={styles["intro-item"]}>
            <h3>Battle</h3>
            {/* <CrownOutlined className={styles.icon} /> */}
            <i
              className="fa fa-fighter-jet"
              style={{ ...icon, color: "gray" }}
            />
          </div>
        </Col>
        <Col span={5}>
          <div className={styles["intro-item"]}>
            <h3>Winner</h3>
            {/* <SmileOutlined className={styles.icon} /> */}
            <i className="fa fa-trophy" style={{ ...icon, color: " gold" }} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
