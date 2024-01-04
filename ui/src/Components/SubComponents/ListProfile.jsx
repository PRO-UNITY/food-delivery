const ListProfile = (props) => {
  const { username, first_name, last_name, email, phone } = props;
  return (
    <ul className="list-group w-100 mb-3">
      <li className="list-group-item">Username : {username}</li>
      <li className="list-group-item">Firstname : {first_name}</li>
      <li className="list-group-item">Lastname : {last_name}</li>
      <li className="list-group-item">Email : {email}</li>
      <li className="list-group-item">
        Phone number : {phone ? phone : "No number yet"}
      </li>
    </ul>
  );
};

export default ListProfile;
