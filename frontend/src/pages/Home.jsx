import React from "react";
import ContributeCardButton from "../components/common/ContributeCardButton";
import { useSelector } from "react-redux";
import ImageCard from "../components/common/ImageCard.jsx";
import Image from "../assets/images/mock_1.jpg";
import ImageTwo from "../assets/images/mock_2.jpg";
import ImageThree from "../assets/images/mock_3.jpg";

const Home = () => {
  const { user } = useSelector((state) => state.user);

  const imageData = [
    {
      _id: 1,
      user: {
        fullName: "Kaif Soomro",
        profileImage:
          "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg",
        email: "kaifsoomro82@gmail.com",
      },
      image_url: Image,
      available: false
    },

    {
      _id: 2,
      user: {
        fullName: "Basit Soomro",
        profileImage:
          "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
        email: "basitsoomro822@gmail.com",
      },
      image_url: ImageTwo,
      available: true
    },

    {
      _id: 3,
      user: {
        fullName: "Sarim",
        profileImage:
          "",
        email: "sarim@gmail.com",
      },
      image_url: ImageThree,
      available: true
    },
  ];
  return (
    <div className="max-w-7xl mx-auto">
      {user && (
        <div className="mt-8">
          <ContributeCardButton />
        </div>
      )}
      <div className="mt-10 columns-3 gap-7">
        {
          imageData?.map((value, index) => (
            <ImageCard key={index} value={value}/>
          ))
        }
      </div>
    </div>
  );
};

export default Home;
