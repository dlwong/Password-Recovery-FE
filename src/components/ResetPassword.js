import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  RESET_PASSWORD
} from '../constants/actionTypes';
import axios from 'axios';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeNewPassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'newPassword', value }),
  onChangeConfirmPassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'confirmPassword', value }),
  onSubmit: (username, password) =>
    dispatch({ type: RESET_PASSWORD, payload: agent.Auth.verifyPassword(username, password) })
});

class ResetPassword extends React.Component {
  constructor() {
    super();

    this.state = {
              matchingPasswords: true,
              username:'',
              password:'',
              updated: false,
              error: false,
              canUpdate: false
    }
    this.changeNewPassword = ev => this.props.onChangeNewPassword(ev.target.value);
    this.changeConfirmPassword = ev => this.props.onChangeConfirmPassword(ev.target.value);
    this.submitForm = (newPassword, confirmPassword) => ev => {
      ev.preventDefault();
      if (newPassword === confirmPassword) {
        this.setState({matchingPasswords: true})
        this.props.onSubmit(this.state.username, confirmPassword);
      }else {
        this.setState({matchingPasswords: false})
      }
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/resetpassword', {
            params: {
          token: this.props.match.params.token
          }
      })
      .then(response => {
        if (response.data.message === 'password link is fine'){
          this.setState({
            username: response.data.username,
            canUpdate: true,
            error: false,
          })
        } else {
          this.setState({
            canUpdate: false,
            error: true
          })
        }
      })
      .catch(error => {
        console.log(error.data)
      })
  }

  render() {
    const newPassword = this.props.newPassword;
    const confirmPassword = this.props.confirmPassword;
    const { error, canUpdate } = this.state;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
          {error &&
        <div>Problem resetting, please submit a new reset form</div>
        }
        {canUpdate && 
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Reset Password</h1>
              <p className="text-xs-center">
                {
                  !this.state.matchingPasswords && 
                <span style={{"color": "red"}}>Passwords do not match</span>
                }
              </p>

              <form onSubmit={this.submitForm(newPassword, confirmPassword)}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={this.changeNewPassword} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={this.changeConfirmPassword} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}>
                    Reset Password
                  </button>

                </fieldset>
              </form>
            </div>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
