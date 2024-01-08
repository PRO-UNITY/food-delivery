const CreateEmployee = (props) => {
  const {
    usernameRef,
    firstnameRef,
    lastnameRef,
    emailRef,
    passwordRef,
    passwordRef2,
    phoneRef,
    latitudeRef,
    longitudeRef,
    handleSubmit,
  } = props;

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <input
          ref={firstnameRef}
          type="text"
          placeholder="firstname"
          className="form-control mb-2"
        />
        <input
          ref={lastnameRef}
          type="text"
          placeholder="lastname"
          className="form-control mb-2"
        />
        <input
          ref={usernameRef}
          type="text"
          placeholder="username"
          className="form-control mb-2"
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="email"
          className="form-control mb-2"
        />
        <input
          ref={phoneRef}
          type="text"
          placeholder="phone"
          className="form-control mb-2"
        />
        <input
          ref={latitudeRef}
          type="text"
          placeholder="latitude"
          className="form-control mb-2"
        />
        <input
          ref={longitudeRef}
          type="text"
          placeholder="longitude"
          className="form-control mb-2"
        />
        <input
          ref={passwordRef}
          type="text"
          placeholder="password"
          className="form-control mb-2"
        />
        <input
          ref={passwordRef2}
          type="text"
          placeholder="confirm password"
          className="form-control mb-2"
        />
        <button type="submit" className="btn-orange">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
