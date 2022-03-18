import { Formik, Field, Form } from 'formik';
import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, container } from 'react';
import logo from "../assets/images/logo.png";

export function FileCreate() {
    const [loading, setLoading] = useState(false)
    const { user: { token } } = useContext(AuthContext)

    function handleSubmit(values) {
        console.log(values)
        setLoading(true)
        axios.post(API.files.create, values, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div style={{ background: '#1365af', height : "90vh"}}>
            <br /><br />
            <container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={logo}></img>
            </container><br /><br /><br />
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    title: '',
                    youtube_website: '',
                    youtube_id_db: '',
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <container>
                    <Form>
                        <Field name="title">
                            {({ field, form }) => (
                                <label className="mt-3 block" style={{ marginLeft: "630px"}}>
                                    <span className="text-white" style={{ fontSize: "1.2em"}}>Title:</span>
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
                                        placeholder="My video"
                                        style={
                                            form.touched.title && form.errors.title ? (
                                                { border: '2px solid var(--primary-red)' }
                                            ) : null
                                        }
                                    />
                                </label>
                            )}
                        </Field><br />

                        <Field name="youtube_website">
                            {({ field, form }) => (
                                <label className="mt-3 block" style={{ marginLeft: "630px"}}>
                                    <span className="text-white" style={{ fontSize: "1.2em"}}>Youtube Link URL:</span>
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
                                    placeholder="https://www..."
                                    style={
                                        form.touched.youtube_website && form.errors.youtube_website ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field><br />

                        <Field name="youtube_id_db">
                            {({ field, form }) => (
                                <label className="mt-3 block" style={{ marginLeft: "630px"}}>
                                    <span className="text-white" style={{ fontSize: "1.2em"}}>Youtube ID:</span>
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
                                    placeholder="ID"
                                    style={
                                        form.touched.youtube_id_db && form.errors.youtube_id_db ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field><br />

                        <button type="submit" style={{ marginLeft: "690px"}} className="items-center mt-3 bg-orange-400 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-orange-500 ">Submit</button>
                    </Form>
                    </container>
                )}

            </Formik>
        </div>
    )

}