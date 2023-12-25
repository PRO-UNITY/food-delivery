import DemoLayout from "../../../Layout/Demoproject"
import { useState } from "react"

const FavouriteDetails = () => {
    const [search, setSearch] = useState('')

    return (
        <DemoLayout setSearch={setSearch}>
            <div className="w-100 body-main p-5">
                salom
            </div>
        </DemoLayout>
    )
}

export default FavouriteDetails