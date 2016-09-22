import React, { Component } from 'react';
require('../styles/index.scss');

export default class App extends Component {
  render() {
    return (
        <form className="main-form" action="http://localhost:9090/map" method="post" encType="multipart/form-data" style={{textAlign:"center"}}>
          <span>DOCX: </span><br/>
          <input type="file" name="tpl" accept="docx"/><br/>
          <span>CSV: </span><br/>
          <input type="file" name="dict" accept="csv"/><br/>
          <input type="submit" value="Отправить"/>
        </form>
    );
  }
}
