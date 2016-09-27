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

  renderLogo() {
    const {count} = this.state;
    const uploadState = this.props.upload.state;
    const isLoading = uploadState === 'UPLOAD' || uploadState === 'DOWNLOAD';
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
