import { useState } from "react"

function Player({ name, symbol }) {
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(editing => !editing);  //don't pass dorectly !isEditing - can cause problems because of React scheduling, this way editing always gets updated/latest state value - callback()
    }

    const playerName = isEditing ?
        <input type="text" value={name} />
        : <span className="player-name">{name}</span>;

    const btnText = !isEditing ? 'Edit' : 'Save';
    return (
        <li>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnText}</button>
        </li>
    )
}

export default Player