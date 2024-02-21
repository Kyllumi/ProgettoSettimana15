import { url } from "../data/data.js";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';

export default function PostComp() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.rendered.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [search, posts]);


  useEffect(() => {
    axios.get(url + "posts?_embed&per_page=12")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-3">
        <Form.Control type="text"
          placeholder="Cerca..."
          className="mr-sm-2 w-75 mx-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
      </Form>

      <div className="d-flex flex-wrap justify-content-center justify-items-start">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="col-lg-3 col-md-5 col-sm-12 mx-lg-2 mx-md-2 mx-sm-1 my-2 shadow-lg homePostCard"
              style={{ minHeight: "16rem", width: "25rem", borderRadius: "7px" }}>
              {post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"].length > 0 && (
                <Card.Img
                  variant="top"
                  src={post._embedded['wp:featuredmedia']['0'].source_url}
                  style={{ height: "14rem", borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }}
                />
              )}
              <Card.Body style={{ height: "100%", position: "relative" }}>
                <Card.Title className="text-center font-weight-bold">
                  <span
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </Card.Title>
                <Card.Text>
                  <span
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </Card.Text>
                <div>
                  <Card.Text className="text-end">
                    <Link to={`/author/${post.author}`} className='fw-bold text-decoration-none'>{post._embedded.author[0].name}</Link>: {post.date.slice(0, -9)}
                  </Card.Text>
                  <Button onClick={() => navigate(`/posts/${post.id}`)}
                    variant="primary position-absolute bottom-0 my-2"
                    style={{ borderRadius: "15px" }}
                  >
                    Scopri di piu!
                  </Button>
                </div>
              </Card.Body>
            </Card>

          ))
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </Spinner>
        )}
      </div>



    </div>
  );

}

