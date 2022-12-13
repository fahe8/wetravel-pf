import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImages, getImage } from "../../../redux/action";
import NavBar from "../../navBar/NavBar";
import { Link, useHistory } from "react-router-dom";

export const UserImages = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { images } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getImage());
    dispatch(deleteImages());
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
        <h1><strong>Mis fotos</strong></h1>
      </div>
      <br />
      <div>
        <br />
        <div className="flex flex-wrap d-flex justify-content-around border border-primary">
          {images?.map((el) => {
            return (
              <div
                key={el.id}
                className="border border-success rounded justify-center items-center"
              >
                {el.images.length > 0 ? (
                  el.images.map((el) => {
                    return (
                      <div className="d-flex align-items-center justify-content-around w-[350px] h-[250px]">
                        <img src={el} alt="img not found" />
                        <br />
                        <div className="p-1 d-flex align-items-center">
                          <button
                            className="bg-red-400 text-white text-xl  rounded-xl"
                            onClick={() => {
                              dispatch(deleteImages(el.id));
                              history.go(0);
                            }}
                          >
                            Delete This pic
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h2>No has subido ninguna imagen</h2>
                )}
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
