var React = require("react");

var Segment = React.createClass({
  render: function() {
    return (
      <div className="resumeSection">
        <h4>{this.props.segment.title}</h4>
        <ul>
          {this.props.segment.contents.map(function(content){
            return (
              <li>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

var Panel = React.createClass({

  getInitialState: function() {
    return ({
      currentTitle: "",
      currentContent: []
    });
  },

  changeContents: function(section) {
    this.setState({
      currentTitle: section,
      currentContent: this.props.contents[section.replace(new RegExp(' ', 'g'), "")]
    });
  },

  render: function() {
    return (
      <div className="bioCard">
        <div className="contentsTable">
          {this.props.contentsTable.map(function(group){
            return (
              <div key={group.title} className="contentsGroup">
                <h2>{group.title}</h2>
                <ul>
                  {group.sub.map(function(sub){
                    return (
                      <li key={sub} onClick={function(){this.changeContents(sub);}.bind(this)}>
                        <p className={this.state.currentTitle == sub ? "orange" : ""}>{sub}</p>
                      </li>);
                  }.bind(this))}
                </ul>
              </div>
            );
          }.bind(this))}
        </div>
        <div className="contentArea">
          <h3>{this.state.currentTitle}</h3>
          <div className="resumeArea">
            {this.state.currentContent.map(function(segment){
              return (
                <Segment segment={segment} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Panel;
