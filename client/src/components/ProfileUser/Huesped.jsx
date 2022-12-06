import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import NavBar from "../navBar/NavBar";
import { Footer } from "../footer/Footer";
//import { AiOutlineCloudUpload } from "react-icons/ai";

const Huesped = (props) => {
  let { id } = props.match.params;
  // console.log("ID HUESPED:", id);
  const { user, logout } = useAuth0();
  // console.log("USER HUESPED:", user);

  const initialState = {
    name: "",
    email: "",
    email_verified: false,
    status: "",
    photos: [],
  };

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
          let arrayImage = input.photos;
          arrayImage.push(url);
          const newObj = { ...input, arrayImage };
          setInput(newObj);
          console.log("INPUT:", input);
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
        <h3>
          {input.photos?.map((image) => {
            return (
              <div>
                <p>Imagen:</p>
                <img src={image} alt="img not found" />
              </div>
            );
          })}
        </h3>
      );
    }
  };

  return (
    <div>
      <div>
        <NavBar/>
      </div>

      <div className="bg-slate-50 mx-44 mt-16 rounded-3xl shadow-md">

      <div className="font-bold text-5xl pt-8">
        <h1>
          Hola {user?.name}
        </h1>
      </div>

      <div className="m-8">
        <img className="m-auto w-60 h-60 rounded-3xl" src={user?.picture} alt="userImage" />
      </div>
      <div className="text-xl">
        <h1>
          <strong>Usuario: </strong>
          {user?.name}
        </h1>
        <br/>
        <h1>
          <strong>mail: </strong>
          {user?.email}
        </h1>
        <br/>

        <h1><strong>Estado</strong>  Huesped </h1>
        
      </div>

      <div>
        <div>
          <Container>
            <Dropzone
              onDrop={submitImage}
              setInput={setInput}
              input={input.photos}
              onChange={(e) => setInput(e.target.files[0])}
              value={input.photos}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="text-xl">
                  <section>
                    <div  {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <br />
                      <span> Sube tus imágenes acá</span>
                      <br />
                      <br />
                      <p>Se esta trabajando para que los usuarios puedan compartir sus experiencias!!</p>
                      <br />
                    </div>
                  </section>
                </div>
              )}
            </Dropzone>
            {imagePreview()}
          </Container>
        </div>
        </div>
        </div>
      <br />

      <div className="text-2xl m-4 font-medium">
        <Link to="/home">
          <button className="rounded-xl w-80 bg-slate-150 hover:bg-slate-200 p-2">Ver los diferentes hoteles disponibles</button>
        </Link>
      </div>


      <div className="text-2xl m-4 font-medium">
        <Link to="/login">
          <button className="rounded-xl w-80 bg-slate-150 hover:bg-slate-200 p-2">Return to login</button>
        </Link>
        </div>

      <div className="text-2xl m-4 font-medium">
        <Link to={`/users/${id}`}>
          <button className="rounded-xl w-80 bg-slate-200 hover:bg-slate-300 p-2">
          Actualizar datos
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
        <Footer/>
      </div>
    </div>
  );
};

export default Huesped;
