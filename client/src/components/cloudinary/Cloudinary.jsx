import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, FormGroup, Input } from "reactstrap";
// import { useState } from "react";

const PostImagens = (props) => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const uploadImage = async (e) => {
    const files = e.target.files[0]; //variable de documentos
    const data = new FormData(); //data que recibo
    data.append("file", files[0]);
    data.append("upload_preset", "wetravel");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/def1vr4gx/image/upload",

      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(res);
    setImage(file.secure_url);
    // console.log(file.secure_url);
    setLoading(false);
  };

  // const handleCloudy = (e) => {
  //   dispatch(uploadImage(e.target.files[0]));
  // };

  return (
    <div>
      <Container style={{ textAlign: "center" }}>
        <h1>subiendo imagenes</h1>
        <FormGroup>
          <Input
            type="file"
            name="file"
            placeholder="sube tu imagen aqui"
            onChange={uploadImage}
            // onClick={(e) => handleCloudy(e)}
          >
            {loading ? (
              <h3>cargando imagenes</h3>
            ) : (
              <img src={image} style={{ width: "300px" }} />
            )}
          </Input>
        </FormGroup>
      </Container>
    </div>
  );
};

export default PostImagens;
