import React from 'react';

class SectionBlock extends React.Component {
  render() {
    const { sectionId, className } = this.props;
    const classN = className.length === 0 ? "" : className;
    return (
      <section id={sectionId} className={classN}>
        {this.props.children}
      </section>
    );
  }
}

export default SectionBlock;
