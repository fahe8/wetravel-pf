import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../redux/action/index";
import { Loading } from "../Loading/Loading";
import NavBar from "../navBar/NavBar";

const Detail = (props) => {
  const {
    match: {
      params: { id },
    },
  } = props;
  const dispatch = useDispatch();
  const selectedHotel = useSelector((state) => state.detail);
  const loading = useSelector((state) => state.loading);
  console.log("LOADING:", loading);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(getDetail(""));
    };
  }, [dispatch, id]);

  console.log(selectedHotel);

  return (
    <div>
      <NavBar />
        <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Link to={"/home"}>
            <button>Volver</button>
          </Link>
          <div>
            <div>
              <div>
                <img src={selectedHotel.photos} alt="hotel" />
                {/* Carrusel de imágenes */}
              </div>
              <div>
                <h2>{selectedHotel.name}</h2>
                <h3>{selectedHotel.stars}</h3>
                <h3>
                  {selectedHotel.location}, {selectedHotel.city}
                </h3>
                |<h3>{selectedHotel.size}</h3>
                <h3>{selectedHotel.price}</h3>
                <br />
                <div>
                  <h2>Description: </h2>
                  <hr />
                  <p>{selectedHotel.description}</p>
                </div>
                <br />
                <div>
                  <h2>What does the place affter</h2>
                  <hr />
                </div>
                <div>
                  <p> {selectedHotel.comments}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Detail;
