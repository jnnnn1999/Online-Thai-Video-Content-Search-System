import { useEffect, useState } from "react"
import axios from "axios"
import { API } from "../api"
import { NavLink } from "react-router-dom"


function FileListItem({ file }) {
    return (
        <div className="border border-gray-200 px-3 py-3 shadow-sm rounded-sm" style={{ background: '#1365af'}}>
            <div className="flex items-center justify-between" >
                <NavLink to={`/files/${file.id}`}>
                    <h3 className="text-2xl text-white font-semibold" style={{ marginLeft: "100px"}}>{file.title}</h3>
                </NavLink>
                <div className='text-white' style={{ marginRight: "100px"}}>
                    Added on{" "}
                    {new Date(file.date_created).toDateString()}
                </div>
            </div>

            <p className="mt-1 italic text-sm text-blue-200" style={{ marginLeft: "100px"}}>
                {file.youtube_website}
                <a className="ml-3 hover:text-white text-sm" href={file.youtube_website} target="_blank" rel="noopener noreferrer">
                    Visit link
                </a>
            </p>
        </div>
    )
}

export function FileList() {
    const [files, setfiles] = useState(null)

    useEffect(() => {
        function fetchfiles() {
            axios.get(API.files.list, )
                .then(res => {
                    console.log(res.data)
                    setfiles(res.data)
                })
        }
        fetchfiles()
    }, [])

    return (
        <div>
            {!files && "Loading..."}
            {files && files.map(file => {
                return < FileListItem key={file.id} file={file} />
            })}
        </div>
    );
}

