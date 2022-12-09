import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Dropzone from "react-dropzone";
import { BiImageAdd } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImage, postImage } from "../../redux/action";
import NavBar from "../navBar/NavBar";

export const Images = () => {
  const { user } = useAuth0();
  const initialState = {
    nameUser: user?.name,
    images: [],
  };
  const dispatch = useDispatch();
  const [input, setInput] = useState(initialState);
  const [loading, setLoading] = useState("");
  const { images } = useSelector(state => state);
  
  useEffect(() => {
    let allImages = images.map(el => el.images);
    if (allImages.length >= 1) {
      dispatch(postImage(input));
    }
    dispatch(getImage());
  }, [dispatch]);

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
          console.log("arrayImage:", arrayImage);
          setInput({...input, nameUser: user?.name, images: arrayImage })
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
        <div className="flex flex-wrap gap-5">
          {input.images?.map((image) => {
            return (
              <div>
                <p>Imagen:</p>
                <img src={image} alt="img not found" className="w-[180px] " />
              </div>
            );
          })}
        </div>
      );
    }
  };
  
  // console.log('INPUT:', input)
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (input.images.length === 0) {
      alert("No has subido ninguna imagen");
    } else {
      dispatch(postImage(input));
      setInput({ nameUser: user?.name, images: [], })
    }
  }

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
        <h1>Comparte aqui tus fotos</h1>
      </div>
      <br />
      <div>
        <form onClick={(e) => handlerSubmit(e)} >
          <div>
            <Container>
              <Dropzone
                onDrop={submitImage}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps({ className: "dropzone" })} >
                      <div className=" flex justify-start items-center cursor-pointer" >
                        <input {...getInputProps()} />
                        <BiImageAdd className="w-[40px] h-[40px]" />
                        <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
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
          <div>
            <button onClick={handlerSubmit} >Subir imagenes</button>
          </div>
        </form>
        <br />
        <div className="flex flex-wrap d-flex justify-content-around border border-primary" >
          {images?.map(el => {
            return (
              <div key={el.id} className="border border-success rounded justify-center items-center" >
                <p>{el.nameUser} compartio la siguente imagen:</p>
                  {
                    el?.images?.map(el => {
                      return (
                        <div className="d-flex justify-content-around w-[350px] h-[250px]" >
                          <img src={el} alt='img not found' />
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
