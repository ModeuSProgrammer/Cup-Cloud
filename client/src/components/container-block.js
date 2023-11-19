import React from 'react';

class ContainerBlock extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default ContainerBlock;
