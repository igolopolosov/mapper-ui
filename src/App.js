import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
        <form action="http://localhost:9090/csvtodocx" method="post" encType="multipart/form-data" style={{textAlign:"center"}}>
          <span>DOCX2: </span><br/>
          <input type="file" name="tpl" accept="docx"/><br/>
          <span>CSV: </span><br/>
          <input type="file" name="dict" accept="csv"/><br/>
          <input type="submit" value="Отправить"/>
        </form>
    );
  }
}
