import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { url } from "../data/data.js";
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

export default function DetailComp() {
  const [detail, setDetail] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log(detail);

  useEffect(() => {
    axios.get(url + `posts/${id}?_embed`)
      .then((response) => { setDetail(response.data); setLoading(false); })
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
      {detail.title &&
        <div className='container my-5'>

          <h2 className='text-center mb-4'><span
                    dangerouslySetInnerHTML={{ __html: detail.title.rendered }}
                  /></h2>
          <div className='d-flex justify-content-center align-items-center my-3'>
            {detail._embedded?.['wp:featuredmedia']?.[0]?.source_url &&
              <div className='mx-3' style={{ width: '40%' }}>
                <img className='w-100' src={detail._embedded['wp:featuredmedia']['0'].source_url} alt={detail.title.rendered} style={{ width: "auto", maxHeight: "20rem" }} />
              </div>
            }
            <div className='w-50 mx-3 align-self-start'>
              <span
                dangerouslySetInnerHTML={{ __html: detail.excerpt.rendered }}
              />
              <span>Pubblicato il {detail.date.slice(0, -9)} da <Link to={`/author/${detail.author}`} className='fw-bold text-decoration-none'>{detail._embedded.author[0].name} </Link></span>
              <br />
              <span>Categoria: <span> {detail._embedded['wp:term']['0']['0']?.name}</span></span>
            </div>

          </div>

        </div>
      }
    </>


  )
}
