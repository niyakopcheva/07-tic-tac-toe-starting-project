import { useState } from "react"

function Player({ initialName, symbol, isActive }) {
    const [name, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing(editing => !editing);  //don't pass dorectly !isEditing - can cause problems because of React scheduling, this way editing always gets updated/latest state value - callback()
    }

    function handleChange(event) {
        console.log(event);
        setName(event.target.value);
    }

    const editablePlayerName = isEditing ?
        <input type="text" required value={name}
            onChange={(event) => handleChange(event)}   //we get event obj automatically from onChange
        // onClick={() => setName('')}
        />
        : <span className="player-name">{name}</span>;

    const btnText = !isEditing ? 'Edit' : 'Save';
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnText}</button>
        </li>
    )
}

export default Player