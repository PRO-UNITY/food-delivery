const TableDeliveries = (props) => {
    const {} = props
    return (
        <div className="border p-3 rounded-2 w-100">
            <h4>Managers</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">N</th>
                  <th scope="col">Full name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Select</th>
                </tr>
              </thead>
              <tbody>
                {delivery?.map((item, index) => (
                  <tr className="align-middle" key={item.id}>
                    <th>{index + 1}</th>
                    <td>{`${item.first_name} ${item.last_name}`}</td>
                    <td>{item.username}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedItems[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleAddDeliver}
              className="btn btn-outline-primary float-end"
            >
              add manager
            </button>
          </div>
    )
}

export default TableDeliveries