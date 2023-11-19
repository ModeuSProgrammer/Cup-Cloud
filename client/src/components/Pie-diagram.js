import React from 'react';

class Pie extends React.Component {
  render() {
    const { pieValue } = this.props;
    return (
      <div className="pie animate" style={{ '--p': pieValue }}></div>
    );
  }
}

export default Pie;
