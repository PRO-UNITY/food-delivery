

const DeliveryHistory = () => {
    return(
    <div class="d-flex justify-content-start flex-column align-items-start gap-2 w-100 vh-100 p-1">
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Food</th>
                <th scope="col">Count</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
                <tr className="align-middle">
                    <th>1</th>
                    <td>Hot Dog</td>
                    <td>2</td>
                    <td>18 000</td>
                    <td><img style={{width:"50px", height:"50px", objectFit:"contain"}} src="https://t3.ftcdn.net/jpg/05/85/99/60/360_F_585996070_hzWAqLeQLfgla0tG6njZZBSVmdaY9LhP.jpg" alt="" /></td>
                    <td>36 000</td>
                </tr>
            </tbody>
          </table>
          <h3 className="text-end px-5">200 000 so'm</h3>
        </div>
        <div class="border p-3 rounded-2 w-100">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">N</th>
                <th scope="col">Name Food</th>
                <th scope="col">Count</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">Total Price</th>
              </tr>
            </thead>
            <tbody>
                <tr className="align-middle">
                    <th>1</th>
                    <td>Hot Dog</td>
                    <td>2</td>
                    <td>18 000</td>
                    <td><img style={{width:"50px", height:"50px", objectFit:"contain"}} src="https://t3.ftcdn.net/jpg/05/85/99/60/360_F_585996070_hzWAqLeQLfgla0tG6njZZBSVmdaY9LhP.jpg" alt="" /></td>
                    <td>36 000</td>
                </tr>
            </tbody>
          </table>
          <h3 className="text-end px-5">200 000 so'm</h3>
        </div>
    </div>
    )
}

export default DeliveryHistory