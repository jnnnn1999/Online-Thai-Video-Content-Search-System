import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect } from 'react';
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

export function FileDelete() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loadingFile, setLoadingFile] = useState(false)
    const [file, setfiles] = useState(null)
    const { id } = useParams()

    const { user: { token } } = useContext(AuthContext)

    console.log(file)

    useEffect(() => {
        setLoadingFile(true)
        function fetchfiles() {
            axios.get(API.files.retrieve(id))
                .then(res => {
                    setfiles(res.data)
                })
                .finally(() => {
                    setLoadingFile(false)
                })
        }
        fetchfiles()
        return () => null
    }, [id])

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        axios.delete(API.files.delete(id), {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                navigate(`/files`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            {!file && "Loading..."}
            {file && (
                <div >
                    <div className="border border-gray-200 px-3 py-3 shadow-sm rounded-sm" style={{ background: '#1365af'}}>
                    <br />
                        <div className="flex items-center justify-between" >
                            <NavLink to={`/files/${file.id}`}>
                                <h3 className="text-2xl text-white font-semibold" style={{ marginLeft: "100px"}}>{file.title}</h3>
                            </NavLink>
                            <div className='text-white' style={{ marginRight: "100px"}}>
                                Added on{" "}
                                {new Date(file.date_created).toDateString()}
                            </div>
                        </div>

                        <p className="mt-1 italic text-sm text-gray-200" style={{ marginLeft: "100px"}}>
                            {file.youtube_website}
                            <a className="ml-3 hover:text-white text-sm" href={file.youtube_website} target="_blank" rel="noopener noreferrer">
                                Visit link
                            </a>
                        </p>
                        <br />
                    </div>
                </div>

            )}
            {loading && "Submitting..."}
            {loadingFile && "Fetching Link Details..."}
            {file && (
                <form onSubmit={handleSubmit}>
                    <br />
                    <button
                        style={{ marginLeft: "120px"}}
                        className="mt-3 bg-red-300 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-red-400"
                        type="submit">
                        Delete
                    </button>

                </form>
            )}
        </div>
    )

}