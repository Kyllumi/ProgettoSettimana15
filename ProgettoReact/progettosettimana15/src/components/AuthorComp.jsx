import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function AuthorComp() {

  const { id } = useParams();
  console.log(id);

  return (
    <Container>
      HEYYYYY
    </Container >
  )
}
