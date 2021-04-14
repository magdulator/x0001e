import React, { Component } from "react";
import auth from '../services/auth';
import { Formik,ErrorMessage} from 'formik';
import * as Yup from 'yup';

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
                    <form onSubmit = {props.handleSubmit} >

                    <div className="form-group mb-2">
                        <h2>Registrera en ny användare</h2>
                        <label htmlFor="email" className= "col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">

                            <input name="email" type="email" className = "form-control" value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur}  />
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password" className= "col-sm-2 col-form-label" >Password</label>
                        <div className="col-sm-10">

                            <input name="password" type="password" className = "form-control" value={props.values.password} onChange={props.handleChange} onBlur={props.handleBlur}/>
                            <ErrorMessage name="password" /> 
                        </div>
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
                    <div>Picked: {props.values.picked}</div>

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