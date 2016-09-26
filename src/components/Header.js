import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/screen';

const LOGO="MAPPER".split("");
const ANIMATION_TICK = 200;

class Header extends React.Component {

  constructor(props) {
      super(props);
      this.state = {count: 0};
  }

  componentDidMount() {
    var timer=setInterval(this.tick.bind(this), ANIMATION_TICK);
    this.setState({timer});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    var count = this.state.count || 0;
    count = (count + 1) % (2 * LOGO.length);
    this.setState({count});
  }

  componentWillUpdate() {
    const uploadState = this.props.upload.state;
    const isLoading = uploadState === 'UPLOAD' || uploadState === 'DOWNLOAD';
    if (!isLoading && this.state.count !== 0) {
      this.setState({count: 0});
    }
  }

  onClick(e, screen) {
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(actions.setScreen(screen));
  }

  renderLogo() {
    const {count} = this.state;
    const uploadState = this.props.upload.state;
    const isLoading = uploadState === 'UPLOAD' || uploadState === 'DOWNLOAD';
    return LOGO.map((a, i) => <span key={i} className={isLoading && count >= i && count < LOGO.length + i ? 'load' : ''}>{a}</span>);
  }

  renderStatus() {
    const {state, progress} = this.props.upload;
    const percentage = progress ? (progress * 100).toFixed(0) : '';
    switch (state) {
      case 'UPLOAD':
        if (progress < 1) {
          return <div>Отправка... {percentage}%</div>
        }
        else {
          return <div>Обработка...</div>
        }
      case 'DOWNLOAD':
        if (progress > 0) {
          return <div>Загрузка результата... {percentage}%</div>
        }
        else {
          return <div>Обработка...</div>
        }
      default:
        return <div></div>;
    }
  }

  render() {
    return (
      <nav>
        <div className="logo">
          <span className="icon-sitemap"></span>
          <span className="logo__title">{this.renderLogo()}</span>
        </div>

        <div className="status">
          {this.renderStatus()}
        </div>

        <div className="links">
          <a href="#" onClick={e => this.onClick(e, "HOME")}>ПОПРОБОВАТЬ</a>
          <a href="#" onClick={e => this.onClick(e, "ABOUT")}>О ПРОЕКТЕ</a>
          <a href="#" onClick={e => this.onClick(e, "FAQ")}>F.A.Q</a>
        </div>
      </nav>
    );
  }
};

export default connect(
  state => ({
    screen: state.screen,
    upload: state.upload
  })
)(Header);
