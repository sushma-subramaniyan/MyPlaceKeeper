import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';

function NavButtons({ setShowComponent }) {
    const { user } = useContext(AuthContext);

    const handleClickInstructions = () => {
        setShowComponent({
            collection: false,
            login: false,
            register: false,
            instruction: true,
            collectionPinsList: false
        });
    };

    return (
        <>
            {user ? (
                <div className="buttons">
                    <button className="helpbutton" onClick={() => setShowComponent({ login: false, register: false, collection: true, instruction: false })}>
                        Help
                    </button>
                    <button
                        className="button collections"
                        onClick={() => {
                            setShowComponent({ login: false, register: false, collection: true, instruction: false })
                            setShowNewPlacePopup(false);
                            setCurrentPlaceId(null);
                        }
                        }
                    >
                        Collections
                    </button>

                    <button className="logoutbutton" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            ) : (
                <div className="buttons">
                    <button
                        className="button login"
                        onClick={() => {
                            setShowComponent({ login: true, register: false, collection: false, instruction: false })
                            setShowNewPlacePopup(false);
                            setCurrentPlaceId(null);
                        }
                        }
                    >
                        Log in
                    </button>
                    <button
                        className="button register"
                        onClick={() => {
                            setShowComponent({ login: false, register: true, collection: false, instruction: false })
                            setShowNewPlacePopup(false);
                            setCurrentPlaceId(null);
                        }
                        }
                    >
                        Register
                    </button>
                </div>
            )}
        </>
    );
}

export default NavButtons;