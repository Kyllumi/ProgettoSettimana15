/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { url } from "../data/data.js";

export default function AuthorComp() {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  console.log(author);

  useEffect(() => {
    axios.get(url + `users/${id}`)
      .then((response) => {
        setAuthor(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    axios.get(url + `posts?author=${id}`)
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <div className='detailCont'>
        <button className='btn btn-primary ms-3' onClick={() => navigate(-1)}>Torna indietro</button>
      </div>
      <Container>

        {author && author.name &&
          <h2 className="mb-4 text-center">Articoli dell'autore:
            {author.avatar_urls && author.avatar_urls['48'] &&
              <img src={author.avatar_urls['48']} alt={author.name} />} <span> {author.name}</span></h2>
        }
        <ListGroup as="ol" numbered>
          {posts.map((post) => (
            <ListGroup.Item onClick={() => navigate(`/posts/${post.id}`)} action variant="dark" key={post.id}><span
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            /></ListGroup.Item>
          ))}
        </ListGroup>
      </Container >
    </>
  )


}
