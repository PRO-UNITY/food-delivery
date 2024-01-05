import { useState } from "react"
import DemoLayout from "../../../Layout/Demoproject"

const KitchenDashboard = () => {
    const [search, setSearch] = useState('')
    return (
        <DemoLayout setSearch={setSearch}>
        <div className="body-main w-100 p-5">
            <h3>Wellcome you dashboard you can manage your system with sidebar</h3>
        </div>
        </DemoLayout>
    )
}

export default KitchenDashboard