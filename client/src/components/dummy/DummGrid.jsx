import { useState, useEffect } from 'react';
import DummyCard from './DummyCard';

const DummyCardGrid = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // DUMMY FETCH
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCards = Array.from({ length: 4 }, (_, index) => index + 1);
      setCards(newCards);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {cards.map(cardId => (
          <DummyCard id={cardId} key={`card_${cardId}`} />
        ))}
      </div>
      {loading && <p className="text-center py-4">Loading...</p>}
    </div>
  );
};

export default DummyCardGrid;

