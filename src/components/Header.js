import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const LOGO="MAPPER".split("");
const ANIMATION_TICK = 200;

class Header extends React.Component {

  constructor(props) {
      super(props);
      this.state = {count: 0};
  }

  componentDidMount = () => {
    var timer=setInterval(this.tick, ANIMATION_TICK);
    this.setState({timer});
  }

  componentWillUnmount = () => {
    clearInterval(this.state.timer);
  }

  tick = () => {
    var {count} = this.state;
    count = (count + 1) % (2 * LOGO.length);
    this.setState({count});
  }

  getIsLoading = () => {
    const uploadState = this.props.upload.state;
    return uploadState === 'UPLOAD' || uploadState === 'DOWNLOAD';
  }

  componentWillUpdate = () => {
    if (!this.getIsLoading() && this.state.count !== 0) {
      this.setState({count: 0});
    }
  }

  renderLogo = () => {
    const {count} = this.state;
    const isLoading = this.getIsLoading();
    return LOGO.map((a, i) => <span key={i} className={isLoading && count >= i && count < LOGO.length + i ? 'load' : ''}>{a}</span>);
  }

  render() {
    return (
      <nav>
        <div className="logo">
          <span className="icon-sitemap"></span>
          <span className="logo__title">{this.renderLogo()}</span>
        </div>

        <div className="links">
          <Link to='/'>ПОПРОБОВАТЬ</Link>
          <Link to='/about'>О ПРОЕКТЕ</Link>
          <Link to='/faq'>F.A.Q</Link>
        </div>
      </nav>
    );
  }
};

export default connect(
  state => ({
    upload: state.upload
  })
)(Header);
