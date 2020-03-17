import Link from "next/link";
import notpage from "../assets/images/404.gif";
import Header from "../components/shared/Header";
import { Button } from "reactstrap";
import Col from "reactstrap/lib/Col";
function Error() {
  return (
    <div>
      <Header />
      <div className="NotPage">
        <img src={notpage} />
        <Col md="6" className="pt-4">
          <Button className="btn btn-block">
            <Link href="/" className="text-capitalize">
              <a className="nav-link text-white">Go To Home</a>
            </Link>
          </Button>
        </Col>
      </div>
    </div>
  );
}

export default Error;
