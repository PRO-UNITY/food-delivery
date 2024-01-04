import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <div className="container body-main d-flex justify-content-center align-items-center py-5">
      <Button variant="warning" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>
  );
};

export default Loader;
