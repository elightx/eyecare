import HomeCard from "./HomeCard";
import { HomeCard4b } from "./HomeCard4";
import HomeCard6 from "./HomeCard6";
import HomeCard7 from "./HomeCard7";
import HomeCard8 from "./HomeCard8";
// import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {
  HomeDetails,
  HomeDetails6,
  HomeDetails7,
  HomeDetails12,
  HomeDetails15
} from "./HomeDetails";
import { Image, Box } from "@chakra-ui/react";
const Home = () => {
  return (
    <Box>
      {/* <Navbar /> */}
      <HomeCard type={HomeDetails} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <HomeCard4b
        text="OUR BRANDS"
        src="https://cdn.cemah.net/wp-content/uploads/sites/22/2023/08/eyeware-brand-logos.png"
      />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails6} heading="EYEGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails7} heading="SUNGLASSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard6 type={HomeDetails12} heading="COLOR CONTACT LENSES" />
      <br />
      <br />
      <br />
      <br />
      <HomeCard7 />
      <HomeCard8 type={HomeDetails15} />
      <Footer />
    </Box>
  );
};

export default Home;
