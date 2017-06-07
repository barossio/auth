import React , {Component} from 'react';
import {connect} from 'react-redux';

export default function(ComposedComponent){
  class Authentication extends Component {
    static contextTypes = {
      router : React.PropTypes.object
    }

    componentWillMount() {
      console.log(this.props.authenticated);
      if(!this.props.authenticated){
          this.context.router.history.push('/');
      }

    }

    componentWillUpdate(nextProps){
      if(!nextProps.authenticated){
        this.context.router.history.push('/');
      }
    }

    render(){
        console.log(this.context);
      //console.log('this.props.authenticated',this.props.authenticated);
      return <ComposedComponent {... this.props} />
    }
  }

  function mapStateToProps(state){
    return {authenticated : state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication);
}
