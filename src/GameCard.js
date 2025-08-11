import React from 'react'; 
import './GameCard.css'

const GameCard = ({ card, spymasterView, onCardClick, colors}) => {
    const getCardStyle = () => {
        if (card.revealed) {
            switch (card.type) {
                case 'pink':
                    return { backgroundColor: colors.pink.active };
                case 'blue': 
                    return { backgroundColor: colors.blue.active };
                case 'neutral':
                    return { backgroundColor: colors.neutral.active }; 
                case 'assassin':
                    return { backgroundColor: colors.assassin.active };
                default: 
                    return {backgroundColor: '#EEEEEE'};
            }
        }

        if (spymasterView) {
            switch (card.type) {
                case 'pink':
                    return { backgroundColor: '#EEEEEE' };
                case 'blue': 
                    return { backgroundColor: '#EEEEEE' };
                case 'neutral':
                    return { backgroundColor: '#EEEEEE' }; 
                case 'assassin':
                    return { backgroundColor:  '#616161'};
                default: 
                    return {backgroundColor: '#EEEEEE'};
            }
        }

        return { backgroundColor: '#EEEEEE'};
    };

    const getTextColor = () => {
        if (card.revealed || (spymasterView && card.type === 'assassin')) {
            return 'white';
        } else if (spymasterView) {
            
        }
        return '#000000';
    };

    return (
        <button
        className='game-card'
        style={{
            ...getCardStyle(),
            color: getTextColor()
        }}
        onClick={() => onCardClick(card.id)}
        disabled={card.revealed && !spymasterView}
        >
            {card.word}
        </button>
    )
}

export default GameCard;