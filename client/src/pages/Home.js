import { Col, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function Home() {
  const [filter, setFilter] = useState('')
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/movies/get-all-movies");
      dispatch(HideLoading());
      if (response.data.success) {
        setMovies(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      <div className="my-3 py-1">
        <Row gutter={10} align="center">
          <Col lg={12} sm={24}>
            <input
              type="text"
              placeholder="Nombre Pelicula..."

              onChange={(e) => setFilter(e.target.value)}
            />
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[15, 15]}>
          {
            movies.filter(mov => mov.name.toLowerCase().includes(filter.toLowerCase())).map(movie => (
                <Col lg={6} xs={24} sm={24}>
                  <Movie movie={movie} />
                </Col>
            ))
          }
        </Row>
      </div>
    </div>
  );
}

export default Home;
