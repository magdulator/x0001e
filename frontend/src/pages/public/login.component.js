    import React from "react";
    import auth from '../../services/auth';
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
                    password: '',
                    status: false
                }}
                validationSchema ={Yup.object().shape( {
                    email: Yup.string().email(<div className = "alert alert-danger">Email invalid</div>).required(<div className = "alert alert-danger">Email is required</div>),
                    password: Yup.string().min(3, <div className = "alert alert-danger">Password needs to be at least 6 characters</div>).required(<div className = "alert alert-danger">Password is required</div>)
                })}
                onSubmit={ async values  => {

                    if(await auth.login(values.email, values.password) === false) {
                        alert('Wrong password or email')
                    }
                    else {
                        values.status = true;
                        history.push('/home')
                    }
                }}
                validator={() => ({})}>
                    { props => (
                        <div className = "main">
                            <div className = "login d-flex justify-content-center">
                                <div className="card w-100">
                                    <div className="card-header text-center">
                                        <h4>Logga in</h4>
                                    </div>
                                    <div className = "card-body text-center">
                                        <PersonCircle size = "80"></PersonCircle>

                                        <form onSubmit =  {props.handleSubmit} >

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

                                            <div className = "form-group">
                                                <button
                                                className = "btn btn-primary btn-lg btn-block my-3 py-3 px-2"
                                                type="submit"
                                                disabled={props.isSubmitting}> <h4>LOGGA IN</h4>
                                                </button>
                                            </div> 
                                            {props.values.status  && (
                                                <div className = "alert alert-success" role="alert">
                                                    <h5>Lyckad inloggning</h5>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </Formik> 
        )}
    export{LoginForm}