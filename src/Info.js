import './Info.css'
import React from 'react'

const Info = () => {
    return (
        <div className='info-grid'>
            <div className='info-title'>WELCOME TO CODENAMES! (Angelina's version)</div>
            <h2 classname='instructions'>
                <br/>
                HOW TO PLAY (4+ PLAYERS RECOMMENDED):
                <br/> <br/>
                SPYMASTERS: Toggle to ‘Spymaster view’ to see which cards belong to your team. Give one word clues followed by the number of words your team should guess based on your clue. 
                <br /> <br/>
                FIELD OPERATIVES: Stay in ‘Player view’ and discuss the clue given by your spymaster. Click cards to reveal them.
                <br /> <br/>
                SETUP: Share this link with your group. Each player can choose their own view mode. One team is pink and the other is blue, with one spymaster on each team and the rest of the participants field operatives.
                <br /> <br/>
                OBJECTIVE: Each team to reveal all their cards wins. Avoid the black assassin card! 
            </h2>
        </div>
    )
}

export default Info