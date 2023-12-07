import { Link } from "react-router-dom"

const FoodDetails = () => {

    

    return (
        <div class="d-flex justify-content-start align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Shashlik</td>
                    <td>200</td>
                    <td>15min</td>
                    <td>See</td>
                    <td>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                       <button type="button" class="btn btn-primary">Foods</button>
                    </div>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default FoodDetails