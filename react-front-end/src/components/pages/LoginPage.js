import React from 'react';
import LoginForm from '../forms/LoginForm';
//You can use prop-types to document the intended types of properties passed to components. 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
class LoginPage extends React.Component {
    submit = (data) => {return this.props.login(data).then(() => this.props.history.push("/"));}//Then is the function that executes after the promise
    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}
LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};


export default connect(null, { login })(LoginPage);