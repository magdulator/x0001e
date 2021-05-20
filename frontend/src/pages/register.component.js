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
                email: Yup.string().email(<div className = "alert alert-danger">Email invalid</div>).required(<div className = "alert alert-danger">Email is required</div>),
                password: Yup.string().min(3, <div className = "alert alert-danger">Password needs to be at least 6 characters</div>).required(<div className = "alert alert-danger">Password is required</div>)
            })}
            onSubmit={ async values  => {
                await auth.register("hej", values.email, values.password, values.picked)
                window.location.reload();
            }}
            validator={() => ({})}>
                { props => (
                    <div className="main">
                        <div className = "register py-5">
                            <div className="card mx-auto">
                                <div className="card-header text-center">
                                    <h4>Registrera en ny användare</h4>
                                </div>
                                <div className = "card-body text-center">
                                <PersonCircle size = "50"></PersonCircle>
                                <form onSubmit = {props.handleSubmit} >
                                    <h5 className = "py-2">Email adress:</h5>
                                    <div className="input-group input-group-lg">
                                        <input name="email" type="email" className = "form-control" value={props.values.email || ''} onChange={props.handleChange} onBlur={props.handleBlur}  />
                                    </div>
                                    <ErrorMessage name="email"/>
                                    <h5 className = "py-2">Lösenord:</h5>
                                    <div className="input-group input-group-lg">
                                        <input name="password" type="password" className = "form-control" value={props.values.password || ''} onChange={props.handleChange} onBlur={props.handleBlur}/>
                                    </div>
                                    <ErrorMessage name="password" /> 

                                    <div className = "radio-container">  
                                    <div className = "form-check py-2">
                                        <input className = 'form-check-input' type="radio" name="picked" value="admin" onChange={props.handleChange} id = "1"/>
                                        <label className ="check-label" htmlFor="1">
                                            Admin
                                        </label>                      
                                    </div>
                                    <div className = "form-check py-2">
                                        <input className='form-check-input' type="radio" name="picked" value="power-user" onChange={props.handleChange} id ="2"/>
                                        <label className ="check-label" htmlFor="2">
                                            Power-user
                                        </label> 
                                    </div>
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
            </div>
            )}
        </Formik> 
    )}
}