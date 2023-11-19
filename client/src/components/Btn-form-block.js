import React from "react";

class BtnBlock extends React.Component {
  render() {
    const { value, type, id } = this.props;
    const types = this.props.type;
    const values = this.props.value;
    const Btnid = this.props.id;
    return (
      <input type={types} value={values} id={Btnid} />
    );
  }
}

export default BtnBlock;
