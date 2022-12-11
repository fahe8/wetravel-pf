import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImage } from "../../redux/action";
import NavBar from "../navBar/NavBar";

export const Images = () => {
  const dispatch = useDispatch();
  const { images } = useSelector(state => state);
  
  useEffect(() => {
    dispatch(getImage());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div>
        <Link to="/home">
          <button>Regresar</button>
        </Link>
      </div>
      <br />
      <div>
        <h1>Visualiza todas las fotos compartidas</h1>
      </div>
      <br />
      <div>
        <br />
        <div className="flex flex-wrap d-flex justify-content-around border border-primary" >
          {images?.map(el => {
            return (
              <div key={el.id} className="border border-success rounded justify-center items-center" >
                <p>El usuario <strong>{!el.nameUser ? 'anonymous' : el.nameUser}</strong> compartio la siguente imagen:</p>
                  {
                    el?.images?.map(el => {
                      return (
                        <div className="d-flex justify-content-around w-[350px] h-[250px]" >
                          <img src={el && el} alt='img not found' />
                        </div>
                      )
                    })
                  }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
