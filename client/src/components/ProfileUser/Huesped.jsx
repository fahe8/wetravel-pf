import React from 'react'
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "reactstrap";
import Dropzone from "react-dropzone";
import { useState } from "react";
import axios from "axios";

const Huesped = () => {
  const { user } = useAuth0();
  console.log('USER HUESPED:', user)

  const initialState = {
    name: "",
    description: "",
    stars: "",
    price: "$",
    services: [],
    photos: [],
    continent: "",
    location: "",
    city: "",
    review: "",
    comments: [],
    user: "",
  };

  const [input, setInput] = useState(initialState);

  const [loading, setLoading] = useState('');

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
          {input.photos.length <= 0
            ? "No hay imagenes"
            : input.photos.map((image) => {
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
        <h1>Mi perfil</h1>
      </div>
      <div>
        <img src={user.picture} alt="userImage" />
      </div>
      <div>
        <h1>{user.name}</h1>
      </div>
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
                  </div>
                </section>
              </div>
            )}
          </Dropzone>
          {imagePreview()}
        </Container>
      </div>
      <br />
      <div>
        <Link to="/home">
          <button>Ver los diferentes hoteles disponibles</button>
        </Link>
      </div>
    </div>
  );
};

export default Huesped;