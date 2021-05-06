import React, { Component } from "react";
import auth from '../services/auth';
import { Formik,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {PersonCircle} from 'react-bootstrap-icons';

export default class RegisterForm extends Component {


    render(){
    return(
        <Formik 
            initialValues={{
                email: '',
                password: '',
                picked: ''
            }}
            validationSchema ={Yup.object().shape( {
                email: Yup.string().email('email invalid').required('Email is required'),
                password: Yup.string().min(3, 'Password needs to be at least 6 characters').required('Password is required')
            })}
            onSubmit={ async values  => {
                await auth.register("hej", values.email, values.password, values.picked)
                window.location.reload();
            }}
            validator={() => ({})}>
                { props => (
                    <div className = "container py-5">
                        <div className="card mx-auto">
                            <div className="card-header text-center">
                                <h4>Registrera en ny användare</h4>
                                </div>
                                <div className = "card-body text-center">
                                <PersonCircle size = "50"></PersonCircle>
                    <form onSubmit = {props.handleSubmit} >

                    <div className="form-group input-group-lg">
                        <label htmlFor="email" className= "">Email</label>
                            <input name="email" type="email" className = "form-control" value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur}  />
                            <ErrorMessage name="email" className="invalid-feedback"/>
                    </div>
                    <div className="form-group input-group-lg ">
                        <label htmlFor="password" className= "" >Password</label>
                            <input name="password" type="password" className = "form-control" value={props.values.password} onChange={props.handleChange} onBlur={props.handleBlur}/>
                            <ErrorMessage name="password" /> 
                            
                    </div>  
                    <div className = "form-check">
                        <input className = 'form-check-input' type="radio" name="picked" value="admin" onChange={props.handleChange} id = "1"/>
                        <label className ="form-check-label" htmlFor="1">
                            Admin
                        </label>                      
                    </div>
                    <div className = "form-check">
                        <input className='form-check-input' type="radio" name="picked" value="power-user" onChange={props.handleChange} id ="2"/>
                        <label className ="form-check-label" htmlFor="2">
                            Power-user
                        </label> 
                    </div>
                    <div className = "form-group">
                        <button
                        className = "btn btn-primary btn-lg mt-3 py-2"
                        type="submit"
                        disabled={props.isSubmitting}> <h4>REGISTRERA ANVÄNDARE</h4>
                        </button>
                    </div> 

                </form>
                </div>
                </div>
                </div>

            )}
        </Formik>
        
    )}
}