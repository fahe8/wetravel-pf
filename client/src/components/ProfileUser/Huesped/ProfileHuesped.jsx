import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import NavBar from "../../navBar/NavBar";
import { Footer } from "../../footer/Footer";
import { postImage } from "../../../redux/action/index";
import { useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import Dropzone from "react-dropzone";

//import { AiOutlineCloudUpload } from "react-icons/ai";

export const ProfileHuesped = () => {
  const { user, logout } = useAuth0();
  // console.log("USER HUESPED:", user);
  
  const initialState = {
    nameUser: user?.name,
    images: [],
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState(initialState);
  const [loading, setLoading] = useState("");

  const submitImage = (files) => {
    const upLoader = files.map((file) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "up-image");
      setLoading("true");
      return axios
        .post("https://api.cloudinary.com/v1_1/dll9vsr6c/image/upload", data)
        .then((res) => {
          let url = res.data.secure_url;
          let arrayImage = input.images;
          arrayImage.push(url);
          const newObj = { ...input, arrayImage };
          setInput(newObj);
          // console.log("arrayImage:", arrayImage);
          // setInput({ ...input, nameUser: user?.name, images: arrayImage });
          // console.log("INPUT:", input);
        })
        .catch((error) => console.log("CLOUDINARY ERROR:", error));
    });
    axios.all(upLoader).then(() => {
      setLoading("false");
    });
  };

  const imagePreview = () => {
    if (loading === "true") {
      return <h3>Cargando Imagenes...</h3>;
    }
    if (loading === "false") {
      return (
        <div className="flex-wrap gap-5 flex justify-center items-center p-3 border">
          {input.images?.map((image) => {
            return (
              <div className=" bg-slate-400  rounded-xl relative mt-2">
                <div
                  onClick={() => handleDeletePhotos(input.images, image)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py px-2 rounded cursor-pointer w-[fit-content] absolute right-0"
                >
                  X
                </div>
                <img
                  src={image}
                  alt="img not found"
                  className="w-[180px] h-[120px] "
                />
              </div>
            );
          })}
        </div>
      );
    }
  };


  const handleDeletePhotos = (inputP, image, ) => {

    let newArrPhotos= inputP.filter((c) => c !== image)
      setInput({
        ...input,
        images: newArrPhotos,
      });
  };
  // console.log('INPUT:', input)
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input.images.length === 0) {
      alert("No has subido ninguna imagen");
    } else {
      dispatch(postImage(input));
      setInput({ nameUser: user?.name, images: [] });
      history.push('/images')
      history.go(0)

    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="bg-slate-50 mx-44 mt-16 pb-3 rounded-3xl shadow-md">
        <div className="font-bold text-5xl pt-8">
          <h1>Hola {user?.name}</h1>
        </div>

        <div className="m-8">
          <img
            className="m-auto w-60 h-60 rounded-3xl"
            src={user?.picture}
            alt="userImage"
          />
        </div>
        <div className="text-xl">
          <h1>
            <strong>Usuario: </strong>
            {user?.name}
          </h1>
          <br />
          <h1>
            <strong>mail: </strong>
            {user?.email}
          </h1>
          <br />
          <h1>
            <strong>Estado</strong> Huesped
          </h1>
          <br />
          <h1>
            <strong>Sube aquí tus fotos</strong>
          </h1>
        </div>
        <br />
        <div>
          <form>
            <div >
              <Container >
                <Dropzone onDrop={submitImage}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <div >
                          <input {...getInputProps()} />
                         
                          <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Ingresar imagen
                          </p>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {imagePreview()}
              </Container>
            </div>
            <br />
            
          </form>
          <div className="text-xl mb-3">
              <button
                onClick={handlerSubmit}
                className="rounded-xl w-80 bg-slate-200 hover:bg-slate-300 p-2"
              >
                Subir imagenes
              </button>
            </div>
        </div>
      </div>
      <br />

      <div className="text-2xl m-4 font-medium">
        <Link to="/home">
          <button className="rounded-xl w-80 bg-slate-150 hover:bg-slate-200 p-2">
            Ver los diferentes hoteles disponibles
          </button>
        </Link>
      </div>

      <div className="text-2xl m-4 font-medium">
        <Link to="/login">
          <button className="rounded-xl w-80 bg-slate-150 hover:bg-slate-200 p-2">
            Return to login
          </button>
        </Link>
      </div>

      <div className="text-2xl m-4 font-medium">
        <Link to={`/user-images`}>
          <button className="rounded-xl w-80 bg-slate-200 hover:bg-slate-300 p-2">
            Mis imagenes
          </button>
        </Link>
        <br />
        <br />
        <button
          className="bg-red-400 w-60 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log-out
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
