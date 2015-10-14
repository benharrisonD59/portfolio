var React = require("react");

var Panel = React.createClass({
  render: function() {
    return (
      <section id={this.props.childId} className="panelSegment panel1" style={{zIndex: this.props.zIndex}}>
        <div id={"inner"+this.props.childId}>
          <div className="introContainer">
            <img src="./images/profile.jpg" alt="profile pic" className="profilePic" />
            <p>
              I always find introductions a little awkward. Especially since I have no idea who you nor do I know how much you know about me. Decidely to say that by end of browsing this site, you should know a great deal.
            </p>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = Panel;
