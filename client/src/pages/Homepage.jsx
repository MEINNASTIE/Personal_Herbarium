import DummyCardGrid from "../components/dummy/DummGrid";
import Footer from "../components/sticky/Footer";
import Navbar from "../components/sticky/Navbar";

export default function Homepage() {
  return (
    <div className="flex flex-col h-screen justify-center text-center mx-auto lg:mx-[300px]">
      <div className="bg-gray-300 flex flex-col justify-between flex-grow">
        <Navbar />
        <div className="mx-auto">
          <h1 className="text-3xl text-gray-500">Welcome to our small Herbarium</h1>
          <p>Start creating your own collection</p>
          <DummyCardGrid />
        </div>
        <Footer />
      </div>
    </div>
  );
}

