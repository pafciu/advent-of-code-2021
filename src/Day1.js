import {useEffect, useState} from "react";

const Day1 = ({title}) => {
    const [increases, setIncreases] = useState(-1);
    const [windows, setWindows] = useState(-1);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/day1.txt')
            .then(res => res.text())
            .then(
                res => {
                    const depths = res.split('\n').map(d => parseInt(d));
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
                    setLoaded(true);

                },
                error => {
                    setError(error);
                    setLoaded(true);
                }
            );
    }, []);

    if (error) {
        return(
            <>
                <h2>{title}</h2>
                <p>Error: <strong>{error.message}</strong></p>
            </>
        );
    } else if (!loaded) {
        return(
            <>
                <h2>{title}</h2>
                <p>Loading depth measurements...</p>
            </>
        );
    } else {
        return (
            <>
                <h2>{title}</h2>
                <p>Number of measurement increases: <strong>{increases}</strong></p>
                <p>Number of sliding window increases: <strong>{windows}</strong></p>
            </>
        );
    }
}

export default Day1;
