import AvailableDownloads from "@/components/AvailableDownloads";
import { Herosection } from "@/components/Herosection";
import Reviews from "@/components/Reviews";
import Usecases from "@/components/Usecases";

function Home() {
  return (
    <div>
      <Herosection />
      <Usecases />
      <Reviews />
      <AvailableDownloads />
    </div>
  );
}

export default Home;
