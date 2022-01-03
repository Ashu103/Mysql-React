import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
const CustomCard = styled(Card)`
  margin-bottom: 18px;
  border: 1px solid green;
  display: flex;
  box-shadow: 10px 10px 20px teal;
`;
const CustomCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

const image = [
  {
    imgid: 1,
    imgsrc:
      "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
  },
  {
    imgid: 2,
    imgsrc: "https://i.ytimg.com/vi/L2iOSqZq1U4/maxresdefault.jpg",
  },
];

const Doctor = () => {
  const [doctor, setDoctor] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/doctor/byStateId/${id}`)
      .then((response) => {
        setDoctor(response.data);
      }, []);
  });
  const img1 = image.filter((value) => {
    console.log(value);
    console.log(id);
    return value.imgid === id;
  });
  console.log(img1);

  return (
    <div>
      <h1>Doctors To Consult Near Your Region</h1>
      {img1 ? <img src={img1.imgsrc} alt="city" /> : null}
      {doctor.map((value, key) => {
        return (
          <CustomCard key={key} sx={{ maxwidth: "350" }}>
            <CardMedia
              component="img"
              height="200"
              image="https://cdn5.vectorstock.com/i/1000x1000/74/49/background-template-design-with-happy-doctor-vector-29987449.jpg"
            />
            <CustomCardContent>
              <BadgeIcon />
              <h3> {value.docname} </h3>
              <br />
              <WorkIcon />
              {value.experience + "years"}
              <br />
              <HomeIcon />
              <h3> {value.address} </h3>
            </CustomCardContent>
          </CustomCard>
        );
      })}
    </div>
  );
};

export default Doctor;
