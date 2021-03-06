import React ,{Component} from 'react';
import {Field , reduxForm} from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux'

class Signin extends Component {
  componentWillMount(){
    this.props.clearError();
  }

  renderField(field){
    const {meta :{touched , error }}  = field;
    //const {touched , error }  = field.meta;
    const className = 'form-group ' + (touched && error ? ' has-danger' : '');
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
            type={field.type}
            {...field.input}
        />
          <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    )
  }
  onSubmit(values) {
    console.log(values);
    const {email, password} = values;
    this.props.signinUser({email, password} ,  () => {
        this.props.history.push('feature');
    });

}
renderAlert(){
  if(this.props.errorMessage){
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {this.props.errorMessage}
      </div>
    )
  }
}

doClear (){
  this.props.reset();
  this.props.clearError();
}

  render() {
    const {handleSubmit, pristine,submitting} = this.props;
    return (
      <div className="Signin col-sm-4">
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name='email'
          label='Email'
          type='text'
         component={this.renderField}/>
         <Field name='password'
          label='Password'
            type='password'
          component={this.renderField}/>
          {this.renderAlert()}
         <button type='submit' disabled={pristine || submitting} className='btn btn-primary' > Sign In </button>
         <button type='button' disabled={pristine || submitting} onClick={this.doClear.bind(this)} className='btn btn-danger' > Clear </button>
      </form>
      </div>
    )
  }
}

/*function validate (values){
//  console.log(values);
  const errors = {};
  //validate
 if(!values.email ){
   errors.email = "Enter a Email!";
 }else{

 }

 if(!values.password){
   errors.password = "Enter a Password!";
 }

  //if errors is empty  ok
  return errors;
}*/

function mapStateToProps(state) {
  return { errorMessage : state.auth.error}
}

export default reduxForm({
  //validate,
  form : 'signin'
})(
  connect(mapStateToProps ,actions)(Signin)
);
