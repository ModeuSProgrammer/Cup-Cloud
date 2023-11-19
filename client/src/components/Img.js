import React from "react";

class ImgBlock extends React.Component {
  render() {
    const { filePath, className } = this.props;
    const links = `${filePath}`;
    const classN = className || "";
    return (
      <img src={links} alt=" " className={classN} />
    );
  }
}

export default ImgBlock;
