import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { url } from "../data/data.js";
import { Card, Container } from 'react-bootstrap';

export default function DetailComp() {
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  
  console.log(detail)

  useEffect(() => {
    fetch(url + `posts/${id}?_embed`)
      .then((response) => response.json())
      .then((data) => setDetail(data));
  }, [id])


  return (
    <Container>
      {detail.title &&
        <Card className="my-5">
          <Card.Body>
            <Card.Title className="text-center"> {detail.title.rendered} </Card.Title>
            <div className='d-flex justify-content-between align-items-center'>
              <Card.Img variant="top" src={detail._embedded["wp:featuredmedia"][0].source_url} alt={detail.title.rendered} style={{ height: "15rem", width: "60%", margin: "1rem" }} />
              <Card.Text className='d-flex flex-column justify-content-between'>
                <span dangerouslySetInnerHTML={{ __html: detail.excerpt.rendered }} />
                <div className='text-end'>
                  <Card.Link href="#" className='text-decoration-none text-secondary'>{detail.date.slice(0, -9)}</Card.Link>
                  <Card.Link onClick={() => navigate(`/author/${detail.id}`)} className='text-decoration-none text-dark'>{detail.yoast_head_json.author}</Card.Link>
                </div>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      }
    </Container >


  )
}
