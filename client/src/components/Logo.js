import React from "react"
import ImgBlock from "../components/Img"
class Logo extends React.Component {
  render() {
    return (
      <div className="header-logo">
        <ImgBlock filePath="../img/logoCupCloud.svg" /><h4>CUP CLOUD</h4>
      </div>
    )
  }
}
export default Logo 