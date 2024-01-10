const FoodAction = (props) => {
  const {
    data,
    nameRef,
    descriptionRef,
    imgRef,
    priceRef,
    kitchenref,
    categoryref,
    category,
    kitchen,
    setSelectcategory,
    setSelectkitchen,
    selectcategory,
    selectkitchen,
    handleSubmit,
  } = props;

  return (
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <input
          defaultValue={data.name}
          ref={nameRef}
          type="text"
          placeholder="name"
          className="form-control mb-2"
        />
        <input
          defaultValue={data.description}
          ref={descriptionRef}
          type="text"
          placeholder="description"
          className="form-control mb-2"
        />
        <input ref={imgRef} type="file" className="form-control mb-2" />
        <input
          defaultValue={data.price}
          ref={priceRef}
          type="text"
          placeholder="price"
          className="form-control mb-2"
        />
        <select
          onChange={(e) => setSelectkitchen(e.target.value)}
          value={selectkitchen}
          ref={kitchenref}
          name=""
          id=""
          className="form-control mb-2"
        >
          <option hidden>select restaurant</option>
          {kitchen.map((item) => (
            <option key={item.id} value={item.id} className="form-control">
              {item.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setSelectcategory(e.target.value)}
          value={selectcategory}
          ref={categoryref}
          name=""
          id=""
          className="form-control mb-2"
        >
          <option hidden value="">
            category name
          </option>
          {category.map((item) => (
            <option key={item.id} value={item.id} className="form-control">
              {item.name}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-orange">
          save
        </button>
      </form>
    </div>
  );
};

export default FoodAction;
