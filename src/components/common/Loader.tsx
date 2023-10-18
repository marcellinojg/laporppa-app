import { Oval } from "react-loader-spinner"


interface SpinnerProps {
    primaryColor?: string
    secondaryColor?: string
    height: number
}

export function SpinnerOval(props: SpinnerProps) {
    const { primaryColor = "#212A3E", secondaryColor = "#FFFFFF", height } = props
    return <Oval height={height} color={primaryColor} secondaryColor={secondaryColor} wrapperClass="flex justify-center items-center" />
}


export function FullPageLoader() {
    return <div className='min-w-screen min-h-screen w-screen h-screen fixed bg-black flex justify-center items-center bg-opacity-[0.7] z-[100000]'>
        <SpinnerOval primaryColor="white" secondaryColor="black" height={32} />
    </div>
}