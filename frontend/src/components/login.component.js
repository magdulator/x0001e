import React, { Component } from "react";
import auth from '../services/auth';
import { Formik, Field, Form, ErrorMessage, useFormik} from 'formik';
import * as Yup from 'yup';

export default class LoginForm extends Component {


    render(){
    return(
        <Formik 
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema ={Yup.object().shape( {
                email: Yup.string().email('email invalid').required('Email is required'),
                password: Yup.string().min(3, 'Password needs to be at least 6 characters').required('Password is required')
            })}
            onSubmit={ async values  => {
                await auth.login(values.email, values.password)
                window.location.reload();
            }}
            validator={() => ({})}>
                { props => (
                    <form onSubmit = {props.handleSubmit} >

                    <div className="form-group mb-2">
                        <label htmlFor="email" className= "col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">

                            <input name="email" type="email" className = "form-control" value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur}  />
                            <ErrorMessage name="email" />
                        </div>
                        <p>{props.values.email}</p>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password" className= "col-sm-2 col-form-label" >Password</label>
                        <div className="col-sm-10">

                            <input name="password" type="password" className = "form-control" value={props.values.password} onChange={props.handleChange} onBlur={props.handleBlur}/>
                            <ErrorMessage name="password" /> 
                        </div>
                    </div>                                 
                    
                    <input
                        type="submit"
                        value="Submit"
                        disabled={props.isSubmitting}
                        />
                </form>
            )}
        </Formik>
        
    )}
}