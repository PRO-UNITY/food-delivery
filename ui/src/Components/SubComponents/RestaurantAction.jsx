const RestaurantAction = (props) => {
  const {data, nameRef, descriptionRef, openref, closeref, latituderef, longitudref, handleSubmit, imgRef} = props;
  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={data?.name}
          ref={nameRef}
          type="text"
          placeholder="name"
          className="form-control mb-2"
        />
        <input
          defaultValue={data?.description}
          ref={descriptionRef}
          type="text"
          placeholder="description"
          className="form-control mb-2"
        />
        <input ref={imgRef} type="file" className="form-control mb-2" />
        <input
          defaultValue={data?.open_time}
          ref={openref}
          type="text"
          placeholder="open_time"
          className="form-control mb-2"
        />
        <input
          defaultValue={data?.close_time}
          ref={closeref}
          type="text"
          placeholder="close_time"
          className="form-control mb-2"
        />
        <input
          defaultValue={data?.latitude}
          ref={latituderef}
          type="text"
          placeholder="latitude"
          className="form-control mb-2"
        />
        <input
          defaultValue={data?.longitude}
          ref={longitudref}
          type="text"
          placeholder="longitude"
          className="form-control mb-2"
        />
        <button type="submit" className="btn-orange">
          save
        </button>
      </form>
    </div>
  );
};

export default RestaurantAction;
