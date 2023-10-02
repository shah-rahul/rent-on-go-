import Navbar from "../../components/navbar/navbar";
import SingleItem from "../../components/singleItem/singleItem";
import './home.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSomeData } from "../../redux/listing/listingManagers";

function Home() {
  const dispatch = useDispatch();
  const someData = useSelector((state) => state.storeManager.someData);


  useEffect(() => {
    dispatch(fetchSomeData());
  }, [dispatch]);



  return (
    <div className="Home">
      <Navbar/>
      <div className="cont flex flex-row flex-wrap ">
      {
        someData && someData.map((item) => (
          <SingleItem key={item['id']} item={item} />
        ))
      }
      </div>
   
    </div>
  );
}
export default Home;



