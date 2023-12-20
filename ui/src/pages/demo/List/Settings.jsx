import { useEffect, useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"
import { BASE_URL, getDataWithToken } from "../../../functions/function"
import { Link } from "react-router-dom"


const Settings = () => {
    const [search, setSearch] = useState('')


    return ( 
        <DemoLayout setSearch={setSearch}>
            <div className=" body-main w-100 p-5">
               <h4>Settings</h4>
            </div>
        </DemoLayout>
    )
}

export default Settings