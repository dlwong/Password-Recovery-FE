import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onSubmit: (email) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class ForgotPassword extends React.Component {
  constructor() {
    super();

    this.state = {
            clicked: false
    }

    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.submitForm = (email) => ev => {
      ev.preventDefault();
      this.setState({clicked: true})
      // this.props.onSubmit(email);
    };
  }
  render() {
    const email = this.props.email;
    return (
      <div className="auth-page">
      <div className="container page">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Forgot Password</h1>

            {/* left in for spacing */}
            <p className="text-xs-center">
              </p>

            <ListErrors errors={this.props.errors} />

            <form onSubmit={this.submitForm(email)}>
              <fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeEmail} />
                </fieldset>

                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={this.props.inProgress}>
                  Reset Password
                </button>

                {
                  this.state.clicked &&
                  <span style={{"color":"red"}}>Check Email for Reset Password Link</span>
                }

              </fieldset>
            </form>
          </div>

        </div>
      </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
