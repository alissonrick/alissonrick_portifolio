import { useState } from "react";
import Image from "next/image";
import styles from "../styles/Project.module.css";

export default function FullscreenImage({ src, onClose }) {
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    // 🔹 Zoom com rolagem do mouse
    const handleWheelZoom = (e) => {
        e.preventDefault();
        setZoom((prev) => Math.max(1, prev + e.deltaY * -0.002));
    };

    // 🔹 Iniciar arrasto
    const handleMouseDown = (e) => {
        e.preventDefault();
        setDragging(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    // 🔹 Arrastar imagem
    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    };

    // 🔹 Parar arrasto
    const handleMouseUp = () => setDragging(false);

    return (
        <div
            className={styles.fullscreenOverlay}
            onWheel={handleWheelZoom}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {/* 🔹 Botão de fechar */}
            <button className={styles.closeButton} onClick={onClose}>✕</button>

            {/* 🔹 Instruções de interação (AGORA ACIMA DA IMAGEM) */}
            <div className={styles.instructions}>
                <p>Scroll or pinch to zoom, drag to move</p>
            </div>

            {/* 🔹 Imagem em tela cheia com zoom */}
            <div
                style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    transition: dragging ? "none" : "transform 0.2s ease-out"
                }}
                className={styles.fullscreenImageContainer}
            >
                <Image src={src} alt="Fullscreen Image" width={1600} height={900} className={styles.fullscreenImage} />
            </div>
        </div>
    );
}
