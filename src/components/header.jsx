import React, { Component } from 'react'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import styles from './header.less'

const { Header } = Layout

export const Popular = 'popular'
export const Battle = 'battle'

function HeaderComponent(props) {
  const { collapsed, onToggle } = props
  return (
            <Header className={styles.header}>
                {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: styles.trigger,
                  onClick: onToggle,
                })} */}
                <Link className={styles.linkdd} to={`/${Popular}`}>Popular</Link>
                <Link className={styles.linkdd} to={`/${Battle}`}>Battle</Link>
            </Header>
  )
}

export default HeaderComponent
