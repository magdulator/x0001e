    import React from "react";
    import auth from '../services/auth';
    import { Formik,ErrorMessage} from 'formik';
    import { useHistory } from "react-router-dom";
    

    import * as Yup from 'yup';
    import {PersonCircle} from 'react-bootstrap-icons';


   const LoginForm = () => {

        let history = useHistory();

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

                    if(await auth.login(values.email, values.password) === false) {
                        alert('Wrong password or email')
                    }
                    else history.push('/home')
                    
                }}
                validator={() => ({})}>
                    { props => (
                    <div className="container py-5">
                        <div className="card mx-auto">
                            <div className="card-header text-center">
                                <h4>Logga in</h4>
                            </div>
                            <div className = "card-body text-center">
                                <PersonCircle size = "80"></PersonCircle>

                                <form onSubmit =  {props.handleSubmit} >

                                    <div className="form-group input-group-lg">
                                        <label htmlFor="email" className= " col-form-label"></label>
                                        <input name="email" type="email" placeholder="Email adress" className = "form-control" value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur}  />
                                        <ErrorMessage name="email" />
                                    </div>
                                    <div className="form-group input-group-lg">
                                        <label htmlFor="password" className= "col-form-label" ></label>
                                        <input name="password" type="password" placeholder="Lösenord" className = "form-control" value={props.values.password} onChange={props.handleChange} onBlur={props.handleBlur}/>
                                        <ErrorMessage name="password" /> 
                                    </div>                                 
                                    <div className = "form-group">
                                        <button
                                        className = "btn btn-primary btn-lg mt-3 py-2"
                                        type="submit"
                                        disabled={props.isSubmitting}> <h4>LOGGA IN</h4>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
            
        )}
    export{LoginForm}