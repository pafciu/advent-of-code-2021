import {useEffect, useState} from "react";
import processData from "./processData";
import renderResults from "./renderResults";

const Day3 = ({title}) => {

    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [power, setPower] = useState(-1);
    const [life, setLife] = useState(-1);

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
        let i = 0;
        let o2prefix = '';
        let o2numbers = numbers;
        do {
            let count = {'0': 0, '1': 0};
            for (const n of o2numbers) {
                count[n[i]] = count[n[i]] + 1;
            }
            if (count['0'] > count['1']) {
                o2prefix += '0';
            } else if (count['1'] > count['0']) {
                o2prefix += '1';
            } else {
                o2prefix += '1';
            }
            o2numbers = o2numbers.filter(n => n.startsWith(o2prefix));
            i += 1;
        } while (o2numbers.length !== 1);
        i = 0;
        let co2prefix = '';
        let co2numbers = numbers;
        do {
            let count = {'0': 0, '1': 0};
            for (const n of co2numbers) {
                count[n[i]] = count[n[i]] + 1;
            }
            if (count['0'] < count['1']) {
                co2prefix += '0';
            } else if (count['1'] < count['0']) {
                co2prefix += '1';
            } else {
                co2prefix += '0';
            }
            co2numbers = co2numbers.filter(n => n.startsWith(co2prefix));
            i += 1;
        } while (co2numbers.length !== 1);
        setLife(parseInt(o2numbers[0], 2) * parseInt(co2numbers[0], 2))
    }, setError, setLoaded), []);

    return renderResults(error, loaded, title, () => {
        return (
            <>
                <p>Power consumption: <strong>{power}</strong></p>
                <p>Life support rating: <strong>{life}</strong></p>
            </>
        );
    });
};

export default Day3;
