import React from "react";

class Checkboxes extends React.Component {
  render() {
    return (
      <>
        <div className="custom-control custom-checkbox mb-3">
          <input
            value={this.props.valor}
            className="custom-control-input preguntas"
            id={'pregunta_'+this.props.pregunta.id}
            type="checkbox"
            onClick={this.props.onClick}
          />
          <label className="custom-control-label" htmlFor={'pregunta_'+this.props.pregunta.id}>
            <span>{this.props.pregunta.pregunta}</span>
          </label>
        </div>
      </>
    );
  }
}

export default Checkboxes;