import { useContext, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios"
import { API } from '../api'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom"
import loginpage from "../assets/images/LoginPage.png";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export function Login() {
    const [loading, setLoading] = useState(false)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()

    function handleSubmit(values) {
        setLoading(true)
        axios.post(API.auth.login, values)
            .then(res => {
                login(res.data.key)
                navigate('/')
            })
            .finally(() => setLoading(false))
    }

    return (
        <div style={{ background: '#1365af', height : "90vh"}}><br /><br />
        <container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Link to="/"><img src={logo}></img></Link>
        </container><br /><br /><br />
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
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
                                                { border: '2px solid var(--primary-red)' }
                                            ) : null
                                        }
                                    />
                                </label>
                            )}
                        </Field>
                        <Field name="password">
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
                                            form.touched.password && form.errors.password ? (
                                                { border: '2px solid var(--primary-red)' }
                                            ) : null
                                        }
                                    />
                                </label>
                            )}
                        </Field>
                        <br />
                        <button style={{ marginLeft: "690px"}} className="mt-3 bg-orange-400 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-orange-500"
                            type="submit">
                            Login
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )

}