import {useEffect, useState} from "react";
import processData from "./processData";
import renderResults from "./renderResults";

const Day4 = ({title}) => {

    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [score, setScore] = useState(-1);

    useEffect(() => processData('day4.txt', text => {
        const lines = text.split('\n');
        const numbers = lines[0].split(',');
        setScore(numbers.length);
    }, setError, setLoaded), []);

    return renderResults(error, loaded, title, () => {
        return (
            <>
                <p>Final score: <strong>{score}</strong></p>
            </>
        );
    });
};

export default Day4;
