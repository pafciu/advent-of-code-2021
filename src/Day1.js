import {useEffect, useState} from "react";
import processData from "./processData";
import renderResults from "./renderResults";

const Day1 = ({title}) => {
    const [increases, setIncreases] = useState(-1);
    const [windows, setWindows] = useState(-1);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        processData('day1.txt', text => {
            const depths = text.split('\n').map(d => parseInt(d));
            let inc = 0;
            for (let i = 1; i < depths.length; i++) {
                if (depths[i] > depths[i - 1]) {
                    inc += 1;
                }
            }
            setIncreases(inc);
            let sli = 0;
            for (let i = 1; i < depths.length - 2; i++) {
                if (depths[i] + depths[i + 1] + depths[i + 2] > depths[i - 1] + depths[i] + depths[i + 1]) {
                    sli += 1;
                }
            }
            setWindows(sli);
        }, setError, setLoaded);
    }, []);

    return renderResults(error, loaded, title, () => {
        return (
            <>
                <p>Number of measurement increases: <strong>{increases}</strong></p>
                <p>Number of sliding window increases: <strong>{windows}</strong></p>
            </>
        );
    });
}

export default Day1;
