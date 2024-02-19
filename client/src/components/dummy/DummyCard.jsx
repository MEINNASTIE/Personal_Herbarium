// DUMMY CARD PLEASE DISPOSE OF ME LATER POLITELY

export default function DummyCard({ id }) {
    return (
      <div key={id} className="w-full md:w-1/2 lg:w-full xl:w-full p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg font-semibold">Card {id}</p>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    );
  }