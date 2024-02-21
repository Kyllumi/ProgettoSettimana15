import axios from "axios";
import { useEffect, useState } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
import { url } from "../data/data";

export default function AuthorPage() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(url + "users")
            .then((response) => {
                setAuthors(response.data);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    })


    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container>
            <h2 className="mb-4 text-center">Tutti i nostri autori</h2>
            <ListGroup as="ol" className="w-50 mx-auto text-center">
                {authors.map((author) => (
                    <ListGroup.Item key={author.id} action variant="dark" href={`/author/${author.id}`} >{author.name}</ListGroup.Item>
                ))}
            </ListGroup>
        </Container >
    )
}
