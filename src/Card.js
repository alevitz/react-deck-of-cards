import './Card.css';
import { useState} from 'react';

function Card({image}) {

  const [rotate, setRotate] = useState(Math.round(Math.random()*360)); 

return (
    <div className="card" style={{transform: `rotate(${rotate}deg)`}}>
    <img src={image} alt="card"/>
    </div>
  );
}

export default Card;