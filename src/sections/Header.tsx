import { memo } from "react"

const Header = () => {
    return (
        <div>
            <h1 className='text-red-300 text-center w-full'>Let's play with the canvas</h1>
            <h4 className='text-white text-center w-full my-4'>Demo using Fabic.js</h4>
        </div>

    )
}

export default memo(Header)