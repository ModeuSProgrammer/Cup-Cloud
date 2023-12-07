import React from "react"

class TariffBlock extends React.Component {
  render() {
    const { name, status, count, price } = this.props
    return (
      <div className="Tariff">
        <h2>{count} ГБ</h2>
        <h5>{price}&nbsp;₽/мес</h5>
        <h4>{name}</h4>
        {status === 1 ? <h6>Текущий план</h6> : <h6>&nbsp;</h6>}
        <p className="description">При наличии активной подписки, важно помнить о своевременной оплате, иначе избыточные данные будут автоматически удалены в течение <b>5 дней</b>.</p>
        {this.props.children}
      </div >
    )
  }
}

export default TariffBlock;
