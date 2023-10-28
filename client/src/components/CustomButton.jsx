import { useSnapshot } from "valtio"
import { state } from "../store"
import { getContrastingColor } from "../config/helpers"
const CustomButton = ({ title, type, handleClick, styles }) => {
    const snap = useSnapshot(state)
    const generateStyle = (type) => {
        if (type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        } else if (type === "outlined") {
            return {
                borderWidth: "1px",
                borderColor: snap.color,
                color: snap.color
            }
        }
    }
    return (
        <button style={generateStyle(type)} className={`px-2 py-1.5 flex-1 rounded-md ${styles}`} onClick={handleClick}>
            {title}
        </button>
    )
}

export default CustomButton