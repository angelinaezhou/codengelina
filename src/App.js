import React, { useState, useEffect } from "react";
import {Eye, EyeOff, RotateCcw, Users, CircleQuestionMark, ToggleLeft, ToggleRight } from "lucide-react"
import GameCard from "./GameCard";
import GameStatus from "./GameStatus";
import './App.css';
import { ref, onValue, set, serverTimestamp } from 'firebase/database';
import { database } from "./firebase";
import Info from "./Info";

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

const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 8).toLowerCase();
}

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
    pinkRemaining: startingTeam === 'pink' ? 9 : 8, 
    blueRemaining: startingTeam === 'blue' ? 9 : 8, 
    createdAt: serverTimestamp()
  };
};

function App() {
  const [game, setGame] = useState(null); 
  const [spymasterView, setSpymasterView] = useState(false); 
  const [roomId, setRoomId] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  // initialize room and sync with firebase
  useEffect(() => {
    console.log("useEffect started");
    
    // get room ID from URL or create new one
    const urlParams = new URLSearchParams(window.location.search);
    let currentRoomId = urlParams.get('room');
    
    if (!currentRoomId) {
      currentRoomId = generateRoomId();
      window.history.pushState({}, '', `?room=${currentRoomId}`);
    }
    
    console.log("Room ID:", currentRoomId);
    setRoomId(currentRoomId);
  
    // set up firebase listener
    const gameRef = ref(database, `games/${currentRoomId}`);
    console.log("Setting up Firebase listener for:", `games/${currentRoomId}`);
    
    const unsubscribe = onValue(gameRef, (snapshot) => {
      console.log("Firebase data received:", snapshot.val());
      
      const data = snapshot.val();
      if (data) {
        console.log("Using existing game data");
        setGame(data);
      } else {
        console.log("No game exists, creating new one");
        // no game exists, create new one
        const newGame = generateGame();
        console.log("New game created:", newGame);
        set(gameRef, newGame);
        setGame(newGame);
      }
      console.log("Setting loading to false");
      setLoading(false);
    }, (error) => {
      console.error("Firebase error:", error);
      setLoading(false);
    });
  
    return () => {
      console.log("Cleaning up Firebase listener");
      unsubscribe();
    };
  }, []);

  const newGame = () => {
    if (!roomId) return; 

    const newGameState = generateGame(); 
    setSpymasterView(false)

    const gameRef = ref(database, `games/${roomId}`);
    set(gameRef, newGameState); 
  };

  const endTurn = () => {
    if (!game || game.gameOver || !roomId) return; 

    const updatedGame = {
      ...game, 
      currentTeam: game.currentTeam === 'pink' ? 'blue' : 'pink'
    }; 

    const gameRef = ref(database, `games/${roomId}`);
    set(gameRef, updatedGame); 
  };

  const revealCard = (cardId) => {
    if (spymasterView) return;

    if (!game || game.gameOver || !roomId) return;

    const revealedCard = game.cards.find(card => card.id === cardId); 
    if (revealedCard.revealed) return ; // already revealed

    const newCards = game.cards.map(card => 
      card.id === cardId ? { ...card, revealed: true } : card
    ); 

    let newGameOver = false; 
    let newWinner = null; 
    let newCurrentTeam = game.currentTeam; 
    let newPinkRemaining = game.pinkRemaining; 
    let newBlueRemaining = game.blueRemaining; 

    if (revealedCard.type === 'assassin') {
      newGameOver = true; 
      newWinner = game.currentTeam === 'pink' ? 'blue' : 'pink';
    } else if (revealedCard.type === 'pink') {
      newPinkRemaining--; 
      if (newPinkRemaining === 0) {
        newGameOver = true; 
        newWinner = 'pink'; 
      } else if (game.currentTeam !== 'pink') {
        newCurrentTeam = game.currentTeam === 'pink' ? 'blue' : 'pink';
      }
    } else if (revealedCard.type === 'blue') {
      newBlueRemaining--; 
      if (newBlueRemaining === 0) {
        newGameOver = true; 
        newWinner = 'blue';
      } else if (game.currentTeam !== 'blue') {
        newCurrentTeam = game.currentTeam === 'pink' ? 'blue' : 'pink';
      }
    } else {
      newCurrentTeam = game.currentTeam === 'pink' ? 'blue' : 'pink';
    }

    const updatedGame = {
      ...game, 
      cards: newCards, 
      currentTeam: newCurrentTeam, 
      gameOver: newGameOver, 
      winner: newWinner, 
      pinkRemaining: newPinkRemaining, 
      blueRemaining: newBlueRemaining
    };

    const gameRef = ref(database, `games/${roomId}`); 
      set(gameRef, updatedGame); 
  };

  if (loading || !game) {
    return (
      <div className='loading'>
        <div>LOADING GAME...</div>
        {roomId && <div>room: {roomId}</div>}
      </div>
    );
  }

  return (
    <>
    <div className='header'>
      <div className='title'>
        <span className='codengelina'>CODENGELINA</span>
        <CircleQuestionMark className="question" onClick={() => setShowInfo(true)} style={{cursor: 'pointer'}}/>
      </div>
      <div className='room-info'>
        room:  {roomId}  |  share this link to play with friends!
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
        <RotateCcw color='white' size={20} className="replay" />
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
            gameOver={game.gameOver}
            onCardClick={revealCard}
            colors={COLORS}
          />
        )))}
      </div>
    </div>

    {showInfo && (
      <div className="modal-overlay" onClick={() => setShowInfo(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button 
            className="close-button" 
            onClick={() => setShowInfo(false)}
          >
            ×
          </button>
          <Info />
        </div>
      </div>
    )}
    </>
  )
}

export default App;
