import React, { useState, useEffect } from "react";
import {Eye, EyeOff, RotateCcw, Users, CircleQuestionMark, ToggleLeft, ToggleRight } from "lucide-react"
import GameCard from "./GameCard";
import GameStatus from "./GameStatus";
import './App.css'

const WORDS = [
  "AFRICA", "AGENT", "AIR", "ALIEN", "ALPS", "AMAZON", "AMBULANCE", "AMERICA", "ANGEL", "ANTARCTICA",
  "APPLE", "ARM", "ATLANTIS", "AUSTRALIA", "AZTEC", "BACK", "BALL", "BAND", "BANK", "BAR",
  "BARK", "BAT", "BATTERY", "BEACH", "BEAR", "BEAT", "BED", "BEIJING", "BELL", "BELT",
  "BERLIN", "BERMUDA", "BERRY", "BILL", "BLOCK", "BOARD", "BOLT", "BOMB", "BOND", "BOOM",
  "BOOT", "BOTTLE", "BOW", "BOX", "BRIDGE", "BRUSH", "BUCK", "BUFFALO", "BUG", "BUGLE",
  "BUTTON", "CALF", "CANADA", "CAP", "CAPITAL", "CAR", "CARD", "CARROT", "CASINO", "CAST",
  "CAT", "CELL", "CENTAUR", "CENTER", "CHAIR", "CHANGE", "CHARGE", "CHECK", "CHEST", "CHICK",
  "CHINA", "CHOCOLATE", "CHURCH", "CIRCLE", "CLIFF", "CLOAK", "CLUB", "CODE", "COLD", "COMIC",
  "COMPOUND", "COMPUTER", "CONCERT", "CONDUCTOR", "CONTRACT", "COOK", "COPPER", "COTTON", "COURT", "COVER",
  "CRANE", "CRASH", "CRICKET", "CROSS", "CROWN", "CYCLE", "CZECH", "DANCE", "DATE", "DAY",
  "DEATH", "DECK", "DEGREE", "DIAMOND", "DICE", "DINOSAUR", "DISEASE", "DOCTOR", "DOG", "DRAFT",
  "DRAGON", "DRESS", "DRILL", "DROP", "DUCK", "DWARF", "EAGLE", "EGYPT", "ENGINE", "ENGLAND",
  "EUROPE", "EYE", "FACE", "FAIR", "FALL", "FAN", "FENCE", "FIELD", "FIGHTER", "FIGURE",
  "FILE", "FILM", "FIRE", "FISH", "FLUTE", "FLY", "FOOT", "FORCE", "FOREST", "FORK",
  "FRANCE", "GAME", "GAS", "GENIUS", "GERMANY", "GHOST", "GIANT", "GLASS", "GLOVE", "GOLD",
  "GRACE", "GRASS", "GREECE", "GREEN", "GROUND", "HAM", "HAND", "HAWK", "HEAD", "HEART",
  "HELICOPTER", "HIMALAYAS", "HOLE", "HOLLYWOOD", "HONEY", "HOOD", "HOOK", "HORN", "HORSE", "HORSESHOE",
  "HOSPITAL", "HOTEL", "ICE", "ICE CREAM", "INDIA", "IRON", "IVORY", "JACK", "JAM", "JET",
  "JUPITER", "KANGAROO", "KETCHUP", "KEY", "KID", "KING", "KIWI", "KNIFE", "KNIGHT", "LAB",
  "LAP", "LASER", "LAWYER", "LEAD", "LEMON", "LEPRECHAUN", "LIFE", "LIGHT", "LIMOUSINE", "LINE",
  "LINK", "LION", "LITTER", "LOCH NESS", "LOCK", "LOG", "LONDON", "LUCK", "MAIL", "MAMMOTH",
  "MAPLE", "MARBLE", "MARCH", "MASS", "MATCH", "MERCURY", "MEXICO", "MICROSCOPE", "MILLIONAIRE", "MINT",
  "MISSILE", "MODEL", "MOLE", "MOON", "MOSCOW", "MOUNT", "MOUSE", "MOUTH", "MUD", "MUMMY",
  "NAIL", "NASA", "NATURE", "NAVY", "NET", "NEW YORK", "NIGHT", "NINJA", "NOTE", "NOVEL",
  "NURSE", "NUT", "OCTOPUS", "OIL", "OLIVE", "OLYMPUS", "OPERA", "ORANGE", "ORGAN", "PALM",
  "PAN", "PANTS", "PAPER", "PARACHUTE", "PARK", "PART", "PASS", "PASTE", "PENGUIN", "PHOENIX",
  "PIANO", "PIE", "PILOT", "PIN", "PIPE", "PIRATE", "PISTOL", "PIT", "PITCH", "PLANE",
  "PLASTIC", "PLATE", "PLATYPUS", "PLAY", "PLOT", "POINT", "POISON", "POLE", "POLICE", "POOL",
  "PORT", "POST", "POUND", "PRESS", "PRINCESS", "PUMPKIN", "PUPIL", "PYRAMID", "QUEEN", "RABBIT",
  "RACKET", "RAY", "REVOLUTION", "RING", "ROBIN", "ROBOT", "ROCK", "ROME", "ROOT", "ROSE",
  "ROULETTE", "ROUND", "ROW", "RULER", "SATELLITE", "SATURN", "SCALE", "SCHOOL", "SCIENTIST", "SCORPION",
  "SCREEN", "SCUBA DIVER", "SEAL", "SERVER", "SHADOW", "SHAKESPEARE", "SHARK", "SHIP", "SHOE", "SHOP",
  "SHOT", "SINK", "SKYSCRAPER", "SLIP", "SLUG", "SMUGGLER", "SNOW", "SNOWMAN", "SOCK", "SOLDIER",
  "SOUL", "SOUND", "SPACE", "SPELL", "SPIDER", "SPIKE", "SPINE", "SPOT", "SPRING", "SPY",
  "SQUARE", "STADIUM", "STAFF", "STAR", "STATE", "STICK", "STOCK", "STRAW", "STREAM", "STRIKE",
  "STRING", "SUB", "SUIT", "SUPERHERO", "SWING", "SWITCH", "TABLE", "TABLET", "TAG", "TAIL",
  "TAP", "TEACHER", "TELESCOPE", "TEMPLE", "THEATER", "THIEF", "THUMB", "TICK", "TIE", "TIME",
  "TOKYO", "TOOTH", "TORCH", "TOWER", "TRACK", "TRAIN", "TRIANGLE", "TRIP", "TRUCK", "TRUNK",
  "TUBE", "TURKEY", "UNDERTAKER", "UNICORN", "UNIFORM", "UNION", "VACUUM", "VAN", "VET", "WAKE",
  "WALL", "WAR", "WASHER", "WASHINGTON", "WATCH", "WATER", "WAVE", "WEB", "WELL", "WHALE",
  "WHIP", "WIND", "WITCH", "WIZARD", "WOOD", "WOOL", "WORM", "YARD"
];

const COLORS = {
  pink: {
    active:'#C84D7E',
    hidden:'#E8C3D2'
  }, 
  blue: {
    active: '#4D65C8', 
    hidden: '#C4CDF2'
  }, 
  neutral: {
    active: '#A19797', 
    hidden: '#EEEEEE'
  },
  assassin: {
    active: '#000000'
  }
};

const generateGame = ()  => {
  const shuffled = [...WORDS].sort(() => Math.random() - 0.5); 
  const gameWords = shuffled.slice(0, 25); 

  const startingTeam = Math.random() < 0.55 ? 'pink' : 'blue'; 
  
  // create card assignments
  const assignments = []; 

  // 9 cards for starting team, 8 for second
  for (let i = 0; i < 9; i++) assignments.push(startingTeam); 
  for (let i = 0; i < 8; i++) assignments.push(startingTeam === 'pink' ? 'blue' : 'pink'); 

  // 7 neutral cards
  for (let i = 0; i < 7; i++) assignments.push('neutral')

  // 1 assassin card
  assignments.push('assassin')

  // shuffle assignments
  assignments.sort(() => Math.random() - 0.5); 

  // create cards 
  const cards = gameWords.map((word, index) => ({
    id: index, 
    word,
    type: assignments[index],
    revealed: false
  }));

  return {
    cards,
    currentTeam: startingTeam, 
    gameOver: false,
    winner: null,
    pinkRemaining: 9, 
    blueRemaining: 8
  };
};

function App() {
  const [game, setGame] = useState(() => generateGame()); 
  const [spymasterView, setSpymasterView] = useState(false); 

  const newGame = () => {
    setGame(generateGame())
  };

  const endTurn = () => {
    if (game.gameOver) return; 

    setGame(prevGame => ({
      ...prevGame, 
      currentTeam: prevGame.currentTeam === 'pink' ? 'blue' : 'pink'
    }));
  }

  const revealCard = (cardId) => {
    if (game.gameOver) return; 

    setGame(prevGame => {
      const newCards = prevGame.cards.map(card =>
        card.id === cardId? { ...card, revealed: true } : card
      );

      const revealedCard = prevGame.cards.find(card => card.id === cardId); 
      if (revealedCard.revealed) return prevGame; // already revealed

      let newGameOver = false; 
      let newWinner = null; 
      let newCurrentTeam = prevGame.currentTeam; 
      let newPinkRemaining = prevGame.pinkRemaining; 
      let newBlueRemaining = prevGame.blueRemaining; 

      // check what was revealed
      if (revealedCard.type === 'assassin') {
        newGameOver = true; 
        newWinner = prevGame.currentTeam === 'pink' ? 'blue' : 'pink'; 
      } else if (revealedCard.type === 'pink') {
        newPinkRemaining--;
        if (newPinkRemaining === 0) {
          newGameOver = true; 
          newWinner = 'pink'; 
        } else if (prevGame.currentTeam !== 'pink') {
          newCurrentTeam = 'blue';
        }
      }  else if (revealedCard.type === 'blue') {
        newBlueRemaining--;
        if (newBlueRemaining === 0) {
          newGameOver = true; 
          newWinner = 'blue'; 
        } else if (prevGame.currentTeam !== 'blue') {
          newCurrentTeam = 'pink';
        }
      } else {
        newCurrentTeam = prevGame.currentTeam === 'pink' ? 'blue' : 'pink';
      }

      return {
        ...prevGame, 
        cards: newCards,
        currentTeam: newCurrentTeam,
        gameOver: newGameOver, 
        winner: newWinner, 
        pinkRemaining: newPinkRemaining, 
        blueRemaining: newBlueRemaining
      };
    });
  };

  return (
    <>
    <div className='header'>
      <div className='title'>
        <span className='codengelina'>CODENGELINA</span>
        <CircleQuestionMark className="question" />
      </div>
      <div className="view-description">
        {spymasterView ? "Spymaster View - You Can See All Card Colors" : "Field Operative View - Click Cards to Reveal"}
      </div>
      
      <div className='subheader'>
      <div className='controls'>
        <div className="player-side">Player</div>
        <button className='toggle-button'
          onClick={() => setSpymasterView(!spymasterView)}
        >{spymasterView ? (
          <ToggleRight color='white' className="toggle" />
        ) : (
          <ToggleLeft color='white' className="toggle" />
        )}</button>
        <div className='spymaster-side'>Spymaster</div>
      </div>

      <button className="new-game" onClick={newGame}>
        <RotateCcw color='white' size={30} className="replay" />
        <div className="new-game-text">new game</div>
      </button>
    </div>
    </div>

    <div className="status">
      <GameStatus game={game} colors={COLORS} className='score'/>

      {!game.gameOver && (
        <button
          className="end-turn"
          onClick={endTurn}
          style={{
            backgroundColor: game.currentTeam === 'pink' ? COLORS.pink.active : COLORS.blue.active
          }}
        >end {game.currentTeam}'s turn</button>
      )}
    </div>

    <div className="grid-container">
      <div className="grid">
        {game.cards.map((card => (
          <GameCard
            key={card.id}
            card={card}
            spymasterView={spymasterView}
            onCardClick={revealCard}
            colors={COLORS}
          />
        )))}
      </div>
    </div>
    </>
  )
}

export default App;
