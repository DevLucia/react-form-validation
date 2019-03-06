import React, { Component } from 'react';
import { runInThisContext } from 'vm';

const emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export default class Form extends Component {

  state = {
    email: '',
    error: true,
    touch: false
  }

  handleChange = (event) => {
      this.setState({ email : event.target.value,
                      error: !emailExp.test(event.target.value)} )
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit({email: this.state.email});
    this.setState({
      email: '',
      errors: true,
      touch: false
    })
  }

  handleBlur = (event) => {
    this.setState({ touch: true })
  }

  render = () => {
    let inputClassName = 'input';
    
    if (this.state.touch) {
      inputClassName = inputClassName + ' ' + (this.state.error ? 'is-danger' : 'is-success');
    }
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="Form">
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input name="email" className={inputClassName} type="text" 
              onBlur={this.handleBlur} placeholder="example@email.com" 
              value={this.state.email} onChange={this.handleChange} />
              <span className="icon is-small is-left">
                <i className="fas fa-at"></i>
              </span>
              <span className="icon is-small is-right">
              {this.state.touch && !this.state.error && (
                <i className="fas fa-check"></i>
              )}
              {this.state.touch && this.state.error && (
                <i className="fas fa-exclamation-triangle"></i>
              )}
              </span>
            </div>
            {this.state.touch && this.state.error && (
            <p className="help is-danger">This email is invalid</p>
          )}

          {this.state.touch && !this.state.error && (
            <p className="help is-success">This email is valid</p>
          )}
          </div>
          <div className="control">
            <button className="button is-link" disabled={this.state.error}>Submit</button>
          </div>
        </div>
      </form>
    );
  };
}