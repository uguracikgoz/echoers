import './styles.css'
import React from 'react'
interface ITitleBarProps {
  children?: React.ReactNode
  title: string
}

const TitleBar: React.FC<ITitleBarProps> = (props) => (
  <div className="echoBotTitleBar">
    <h1>{props.title}</h1>
  </div>
)

export default TitleBar
