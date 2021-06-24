
import { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from 'axios';
import { v4 as uuidv4, v4 } from 'uuid';
import './CardBoard.css';

function CardBoard() {
  const [cards, setCards] = useState([]);
  const [drawn, setDrawn] = useState(0);
  const [shuffled, setShuffled] = useState(0);
  const [displayShuffleBtn, setDisplayShuffleBtn] = useState(true);

  const deckId = useRef('new');

  useEffect(function fetchDataWhenMounted(){
    async function getData(){
      const dataResult = await axios.get(
        `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`        
        );      
          deckId.current = dataResult.data.deck_id;
          console.log(dataResult);
        }            
    getData();
  },[]);

  useEffect(function fetchCardAfterMounted(){
    if(deckId.current !== 'new'){
      async function getCard(){
        const cardResult = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`
          );      
            if(cardResult.data.remaining === 0){
                alert("No cards remaining!!!");
            } else {
              const card = cardResult.data.cards[cardResult.data.cards.length-1];
              let newCard = {...card, id:v4() }
              setCards(cards => [...cards, newCard]);
              console.log(card);
              console.log(cardResult); 
            }            
          }            
      getCard();
    }    
  },[drawn]);

  useEffect(function shuffleExistingDeck(){
    if(deckId.current !== 'new'){
    async function shuffle(){
      setCards([]);
      setDisplayShuffleBtn(false);
      const shuffledDeck = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId.current}/shuffle/?deck_count=1`        
        );
        console.log(shuffledDeck);
        setDisplayShuffleBtn(true);
    }
    shuffle()
  } 
  },[shuffled]);

  const drawCard = () => {
    setDrawn(cards => cards + 1);
  }

  const shuffleCards = () => {
    setShuffled(shuffled => shuffled + 1);
  }

  const cardResults = cards.map(card => {
    return (
    <div className="cards">
    <Card 
    image={card.image}
    key={card.id}  
    id={card.id}
    />
    </div>
    )
  })

return (
    <div >
    <button onClick={drawCard}>Draw Card!</button>
    {displayShuffleBtn ? 
    <button onClick={shuffleCards}>Shuffle Deck</button>
    : null}   
    {cardResults}
    </div>    
  );
}

export default CardBoard;