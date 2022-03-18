import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios"
import { API } from '../api'
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export function Signup() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    
    function handleSubmit(values, { resetForm }) {
        setLoading(true)
        axios.post(API.auth.signup, values)
            .then(res => {
                resetForm()
                setSuccess(true)
            })
            .finally(() => setLoading(false))
    }

    return (
        <div style={{ background: '#1365af', height : "90vh"}}><br /><br />
        <container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Link to="/"><img src={logo}></img></Link>
        </container><br /><br /><br />
            {success && "You will receive a verification email."}
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    email: '',
                    password1: '',
                    password2: '',
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <Form>
                        <Field name="email">
                            {({ field, form }) => (
                                <label className="mt-3 block" style={{ marginLeft: "630px"}}>
                                    <span className="text-white" style={{ fontSize: "1.2em"}}>Email:</span>
                                    <input
                                    {...field}
                                    type="text"
                                    className="
                                        mt-1
                                        block
                                        
                                        rounded-md
                                        border-gray-300
                                        shadow-sm
                                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "
                                    placeholder=""
                                    style={
                                        form.touched.email && form.errors.email ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field>

                        <Field name="password1">
                            {({ field, form }) => (
                                <label className="mt-3 block" style={{ marginLeft: "630px"}}>
                                    <span className="text-white" style={{ fontSize: "1.2em"}}>Password:</span>
                                    <input
                                    {...field}
                                    type="password"
                                    className="
                                        mt-1
                                        block
                                        
                                        rounded-md
                                        border-gray-300
                                        shadow-sm
                                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "
                                    placeholder=""
                                    style={
                                        form.touched.password1 && form.errors.password1 ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field>

                        <Field name="password2">
                            {({ field, form }) => (
                                <label className="mt-3 block" style={{ marginLeft: "630px"}}>
                                    <span className="text-white" style={{ fontSize: "1.2em"}}>Confirm Password:</span>
                                    <input
                                    {...field}
                                    type="password"
                                    className="
                                        mt-1
                                        block
                                       
                                        rounded-md
                                        border-gray-300
                                        shadow-sm
                                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "
                                    placeholder=""
                                    style={
                                        form.touched.password2 && form.errors.password2 ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field>
                        <br />
                        <button style={{ marginLeft: "690px"}} className="mt-3 bg-orange-400 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-500" 
                            type="submit">
                            Signup
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )

}