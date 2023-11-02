import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './PinCard.css';
import StarIcon from '@mui/icons-material/Star';
import { format } from 'timeago.js';

function PinCard({ pin }) {
    const { user } = useContext(AuthContext);

    return (
        <div className='card'>
            <label>Place</label>
            <p className="place">{pin.title}</p>
            <label>Review</label>
            <p className="review">{pin.desc}</p>
            <label>Rating</label>
            <div className='star'>
                {Array(pin.rating).fill(0).map((_, index) => (
                    <StarIcon key={index} className='star' />
                ))}

            </div>
            <label>Created By</label>
            <span className="username">
                {pin.username}  {format(pin.createdAt)}
            </span>
            {user &&
                <button type="button" className="submit-button" onClick={() => handleAddPinToCollection(pin._id)}>
                    Add Pin to Collection
                </button>
            }
        </div>
    );
}

export default PinCard;