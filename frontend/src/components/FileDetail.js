import axios from "axios"
import { useEffect, useState,useContext } from "react"
import { useParams } from "react-router"
import { NavLink } from "react-router-dom"
import { API } from "../api"
import { AuthContext } from "../contexts/AuthContext";

export function FileDetail() {
    const [file, setfiles] = useState(null)
    const { id } = useParams()
    const { user: { token } } = useContext(AuthContext)


    useEffect(() => {
        function fetchfiles() {
            axios.get(API.files.retrieve(id), {
                headers: {
                    "Authorization": `Token ${token}`
                }
            })
                .then(res => {
                    console.log(res.data)
                    setfiles(res.data)
                })
        }
        fetchfiles()
    }, [id, token])

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
                    <br />
                    <div className="mt-3 flex items-center" style={{ marginLeft: "100px"}}>
                        <NavLink to={`/files/${id}/update`}
                            className="bg-blue-300 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-400 ">
                            Update
                        </NavLink>
                        <br />
                        <NavLink to={`/search/custom`}
                            className="ml-2 bg-green-300 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-green-400 ">
                            Search
                        </NavLink>
                        <br />
                        <NavLink to={`/files/${id}/delete`}
                            className="ml-2 bg-red-300 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-red-400 ">
                            Delete
                        </NavLink>

                    </div>
                </div>

            )}

        </div>
    )
}