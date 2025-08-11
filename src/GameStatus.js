import React from "react";
import './GameStatus.css'

const GameStatus = ({ game, colors }) => {
    return (
        <div className="game-status">
            <div className="team-scores">
                <div 
                    className="pink-score"
                    style= {{
                        color: game.currentTeam === 'pink'? colors.pink.active : colors.pink.hidden, 
                    }}
                >pink: {game.pinkRemaining}</div>

                <div
                    className="blue-score"
                    style={{
                        color: game.currentTeam === 'blue'? colors.blue.active : colors.blue.hidden
                    }}
                >blue: {game.blueRemaining}</div>
            </div>
        </div>
    )
}

export default GameStatus