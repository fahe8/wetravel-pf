import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage } from "../../../redux/action";
import NavBar from "../../navBar/NavBar";
import { Link } from "react-router-dom";

export const UserImages = () => {
  const dispatch = useDispatch();
  const { images } = useSelector(state => state);
  
  useEffect(() => {
    dispatch(getImage());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div>
        <Link to="/huesped">
          <button>Regresar a mi perfil</button>
        </Link>
      </div>
      <br />
      <div>
        <h1>Mis fotos</h1>
      </div>
      <br />
      <div>
        <br />
        <div className="flex flex-wrap d-flex justify-content-around border border-primary" >
          {images?.map(el => {
            return (
              <div key={el.id} className="border border-success rounded justify-center items-center" >
                {/* <p>El usuario <strong>{el.nameUser}</strong> compartio la siguente imagen:</p> */}
                  {
                    el?.images?.map(el => {
                      // console.log('IMG USER:', el)
                      return (
                        <div className="d-flex align-items-center justify-content-around w-[350px] h-[250px]" >
                          <img src={el} alt='img not found' />
                          <br />
                        </div>
                      )
                    })
                  }
                  <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
