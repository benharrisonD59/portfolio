var React = require("react");

var Panel = React.createClass({
  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment panel1" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId}>
          <div className="introContainer">
            <img src="./images/profile.jpg" alt="profile pic" className="profilePic" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est debitis odit quasi soluta aliquam ad praesentium cupiditate animi numquam veritatis, minima illo rerum doloremque aperiam eaque culpa mollitia eveniet quia.
            </p>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Panel;
