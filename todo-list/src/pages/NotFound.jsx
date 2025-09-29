import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <p>Page Not found</p>
      <Link to="/home" />
    </>
  );
}
