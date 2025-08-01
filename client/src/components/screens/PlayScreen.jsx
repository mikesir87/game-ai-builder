import { useEffect, useState } from "react";
import { Screen } from "./Screen";
import { useGameState } from "../../GameState";

export function PlayScreen() {
    const { stats, hasMadeFirstPoint } = useGameState();

    return (
        <Screen align="end" showScoreboard>
            <div id="results">
                { stats.clickStream.map((result, index) => (
                    <ClickResult key={index} result={result} />
                )) }
            </div>
            <div id="instructions" className={hasMadeFirstPoint ? "hidden" : ""}>
                Click on the box below with the matching icon.
                <br />The timer will start after your first click.
            </div>
        </Screen>
    )
}

function ClickResult({ result }) {
    const [hiding, setHiding] = useState(false);
    const [hide, setHide] = useState(false);
    
    useEffect(() => {
        const t = setTimeout(() => setHiding(true), 200);
        return () => clearTimeout(t);
    }, [setHiding]);
    
    useEffect(() => {
        const t = setTimeout(() => setHide(true), 500);
        return () => clearTimeout(t);
    }, [setHide]);

    if (hide) return null;

    return (
        <span className={`click-result ${hiding ? " hiding" : ""}`}>
            { result > 0 ? "✅" : (result < 0 ? "❌" : "") }
        </span>
    );
}
