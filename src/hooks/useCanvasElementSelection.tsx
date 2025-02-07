import { Canvas } from 'fabric';
import { useEffect, useState } from 'react';

interface UseCanvasElementSelectionProps {
    canvasObj?: Canvas;
}

const useCanvasElementSelection = ({ canvasObj }: UseCanvasElementSelectionProps) => {
    const [selectedElement, setSelectedElement] = useState<any>(null);
    const [selectedElementColor, setSelectedElementColor] = useState<string | undefined>(undefined);

    useEffect(() => {
        
        const handleDocumentClick = () => {
            const element = canvasObj?.getActiveObject();
            if (element) {
                setSelectedElement(element);
                setSelectedElementColor((element as any)?.fill);
            } else {
                setSelectedElement(undefined);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [canvasObj]);

    return {
        selectedElement,
        selectedElementColor,
        setSelectedElement,
        setSelectedElementColor
    };
};

export default useCanvasElementSelection;
