import DemoLayout from "../../../Layout/Demoproject"

const FoodOrder = () => {
    return (
        <DemoLayout>
                <div className="w-100">
                <table className="table">
                    <tr>
                        <th>N</th>
                        <th>Name</th>
                        <th>Count</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Pzza</td>
                        <td>1</td>
                        <td>80.000</td>
                    </tr>
                </table>
                </div>
        </DemoLayout>
    )
}

export default FoodOrder