import React from "react";

import NavMenu from "../components/NavMenu";
import ContainerBlock from "../components/container-block";
import Pie from "../components/Pie-diagram";
import Logo from "../components/Logo";

class Drive extends React.Component {
  render() {
    const MainLinks = [
      { url: '/drive', text: 'ДИСК', id: '1', internal: true },
      { url: '/Tariff', text: 'ТАРИФ', id: '2', internal: true },
      { url: '/account', text: 'АККАУНТ', id: '3', internal: true },
      { url: '/exit', text: 'ВЫХОД', id: '4', internal: true }
    ];

    return (
      <div className="body-bg-1" >
        <Logo />
        <NavMenu links={MainLinks} />
        <ContainerBlock className="container-drive">
          <div className="container-folderSearch">
            <form>
              <input type="search" placeholder="Поиск" id="FolderSearch" />
            </form>
            <div className="folders"></div>
          </div>

          <div className="container-lastFile">
            <h3>Последние изменения</h3>
            <div className="lastFile"></div>
          </div>
          <div className="container-diagrams">
            <div className="diagrams-info">
              <h3>Диск занят на</h3>
              <h2><span id="drive-procent" className="drive-procent">90</span>%</h2></div>
            <Pie pieValue="90" />
          </div>
        </ContainerBlock>
      </div>
    );
  }
}
export default Drive;