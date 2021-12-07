import { useState } from "react"


export default function TodoInput({onTask}){
    const [text, setText] = useState("")

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleClick = () => {
        onTask(text)
        setText("")
    }

    return(
        <div>
        <input type="text"
            value={text}
            placeholder="Write something..."
            onChange={handleChange}

        />
        <button onClick={handleClick}>+</button>
        </div>

    )
}