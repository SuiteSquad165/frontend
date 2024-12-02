import LoadingCards from "@/components/card/LoadingCards";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <section>
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer />
      </Suspense>
    </section>
  );
};

export default HomePage;
