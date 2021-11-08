import React, { Component } from "react";
import { Image, Row, Col, Button, Spin, message } from "antd";

import { Link } from "react-router-dom";

import axios from "axios";

import { parseUrl } from "@/util";

import styles from "./result.less";

function getGithubData(user) {
  return axios.get(`https://api.github.com/users/${user}`);
}

export default class BattleResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      loading: false,
      winnertitle: "Winner",
      losertitle: "Loser",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const [, urlParams] = parseUrl();
    if (!urlParams) {
      this.setState({ loading: false });
      setTimeout(() => {
        window.alert("参数异常!");
      }, 16);
      return;
    }
    const plays = urlParams.filter((v) => v.name.indexOf("play") !== -1);

    if (plays.length !== 2) {
      this.setState({ loading: false });
      setTimeout(() => {
        window.alert("参数异常!");
      }, 16);
      return;
    }
    // console.log(`play1=${plays[0]}`);
    if (plays[0].value === plays[1].value) {
      this.setState({ winnertitle: "ballance", losertitle: "ballance" });
    }
    Promise.all(urlParams.map((v) => getGithubData(v.value)))
      .then((arr) => {
        const [first, sec] = arr;
        if (first.data.public_repos > sec.data.public_repos) {
          this.setState({
            winner: first.data,
            loser: sec.data,
            loading: false,
          });
          return;
        }
        this.setState({
          winner: sec.data,
          loser: first.data,
          loading: false,
        });
      })
      .catch((err) => {
        // message.error(err.response ? err.response.data.message : err.message, 10)
        window.alert(err.response ? err.response.data.message : err.message);
        this.setState({ loading: false });
      });
  }

  render() {
    const { winner, loser, loading, winnertitle, losertitle } = this.state;
    if (loading) {
      return <Spin />;
    }

    if (!winner || !loser) {
      return null;
    }
    return (
      <div>
        <Row justify="center">
          <Col span={8} offset={-1}>
            <div style={{ textAlign: "center" }}>
              <h2>{winnertitle}</h2>
              <h1>{winner.name}</h1>
              <div>
                <Image
                  alt="Winner"
                  src={winner.avatar_url}
                  preview={false}
                  className={styles.imagecss}
                />
              </div>
              <div>Repos: {winner.public_repos}</div>
            </div>
          </Col>
          <Col span={8} offset={1}>
            <div style={{ textAlign: "center" }}>
              <h2>{losertitle}</h2>
              <h1>{loser.name}</h1>
              <div>
                <Image
                  alt="Loser"
                  src={loser.avatar_url}
                  preview={false}
                  className={styles.imagecss}
                />
              </div>
              <div>Repos: {loser.public_repos}</div>
            </div>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <Button>
            <Link to="/battle">Reset</Link>
          </Button>
        </div>
      </div>
    );
  }
}
