import {useEffect, useState} from "react";

const Day1 = ({title}) => {
    const [measurements, setMeasurements] = useState(-1);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/day1.txt')
            .then(res => res.text())
            .then(
                res => {
                    setLoaded(true);
                    const depths = res.split('\n');
                    const meas = depths.reduce((prev, curr, idx, arr) => {
                        if (idx === 0) {
                            return {depth: parseInt(curr), meas: 0};
                        } else {
                            return {depth: parseInt(curr), meas: parseInt(curr) > prev.depth ? prev.meas + 1 : prev.meas};
                        }
                    }, {depth: -1, meas: 0}).meas;
                    setMeasurements(meas);
                },
                error => {
                    setLoaded(true);
                    setError(error);
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
                <p>Number of measurement increases: <strong>{measurements}</strong></p>
            </>
        );
    }
}

export default Day1;
