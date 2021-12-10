import {useEffect, useState} from "react";
import processData from "./processData";
import renderResults from "./renderResults";

const Day3 = ({title}) => {

    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [power, setPower] = useState(-1);

    useEffect(() => processData('day3.txt', text => {
        const numbers = text.split('\n');
        let significantBits = [];
        for (const n of numbers) {
            for (let i = 0; i < n.length; i++) {
                if (!significantBits[i]) {
                    significantBits[i] = { '0': 0, '1': 0 };
                }
                switch (n[i]) {
                    case '0':
                        significantBits[i]['0'] = significantBits[i]['0'] + 1;
                        break;
                    case '1':
                        significantBits[i]['1'] = significantBits[i]['1'] + 1;
                        break;
                }
            }
        }
        let gamma = 0, epsilon = 0;
        for (let bit of significantBits) {
            if (bit['0'] > bit['1']) {
                epsilon += 1;
            } else {
                gamma += 1;
            }
            epsilon *= 2;
            gamma *= 2;
        }
        setPower(gamma * epsilon / 4);
    }, setError, setLoaded), []);

    return renderResults(error, loaded, title, () => {
        return (
            <>
                <p>Power consumption: <strong>{power}</strong></p>
            </>
        );
    });
};

export default Day3;
