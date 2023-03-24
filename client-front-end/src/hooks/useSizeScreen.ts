import { useEffect, useState } from "react";

interface ISizeProps {
    height: number;
    width: number;
}

export const useSizeScreen = (): ISizeProps => {
    const initialState = {
        width: window.screen.width,
        height: window.screen.height,
    };
    const [size, setSize] = useState<ISizeProps>(initialState);
    const changeSize = () => {
        const width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        const height =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        setSize({ width, height });
    };
    useEffect(() => {
        changeSize();
        window.addEventListener("resize", changeSize);
    }, []);
    return size;
};
