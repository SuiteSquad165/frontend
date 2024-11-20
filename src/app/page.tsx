import LoadingCards from "@/components/card/LoadingCards";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import RoomCard from "@/components/reservation/room-card";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <section>
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer/>
      </Suspense>
    </section>
  );
};

/*revert back to this: 
<h1>Trending Page</h1>
<PropertiesContainer />
*/
export default HomePage;
