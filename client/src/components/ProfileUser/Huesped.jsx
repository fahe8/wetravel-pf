import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import { useState } from "react";
import axios from "axios";
import { postUser } from "../../redux/action";
import { useDispatch } from "react-redux";

const Huesped = () => {
  const dispatch = useDispatch();
  const { user, logout } = useAuth0();
  console.log("USER HUESPED:", user);

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

  const handleChange = (e) => {
    e.target.name === "photos"
      ? setInput({
          ...input,
          [e.target.name]: [e.target.value],
        })
      : setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
  };

  const handleSubmit = (e) => {
    if (!input.photos.length) {
      e.preventDefault();
      alert("No has subido ninguna imagen!!!");
    } else {
      e.preventDefault();
      dispatch(postUser(input));
      console.log(input);
      alert("Felicidades has agregado nuevas imagenes a tu perfil!!");
      setInput(initialState);
      // history.push("/home");
    }
  };

  return (
    <div>
      <div>
        <h1>
          <strong>Mi perfil</strong>
        </h1>
      </div>
      <div>
        <img src={user?.picture} alt="userImage" />
      </div>
      <div>
        <h1>
          <strong>Usuario: </strong>
          {user?.name}
        </h1>
      </div>
      <div>
        <form>
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
                  <div>
                    <section>
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <br />
                        <span>Icono de carpeta</span>
                        <br />
                        <br />
                        <p>Comparte las imagenes de tus experiencias aquí</p>
                        <br />
                      </div>
                    </section>
                  </div>
                )}
              </Dropzone>
              {imagePreview()}
            </Container>
          </div>
          <button
            onClick={handleSubmit}
            className="cursor-pointer"
            type="submit"
            form="form"
          >
            Subir imagenes
          </button>
        </form>
      </div>
      <br />
      <div>
        <Link to="/home">
          <button>Ver los diferentes hoteles disponibles</button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <button>Return to login</button>
        </Link>
        <br />
        <button>Actualizar datos</button>
        <button
          className="bg-black border-2 p-2 text-white rounded focus:bg-[#00B4FF] focus:rounded text-xl"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Log-out
        </button>
        {
          input.photos?.map(el => {
            return (
              <div>
                <img src={el} alt='img not found' />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Huesped;
