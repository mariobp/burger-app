import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(null, error => {
        this.setState({ error });
      });
    }

    componentWillUnmount() {
      // remuve the interceptos if the componet is unmount (removed)
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }
  
    render () {
      const message = this.state.error ? this.state.error.message : "Something didn´t wrong!";
      return (
        <Aux>
          <Modal 
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}>
            {message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
};

export default withErrorHandler;