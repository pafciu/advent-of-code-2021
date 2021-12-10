import {useEffect, useState} from "react";
import processData from "./processData";
import renderResults from "./renderResults";

const Day2 = ({title}) => {
    const [mul, setMul] = useState(-1);
    const [aim, setAim] = useState(-1);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        processData('day2.txt', text => {
            const re = /(forward|up|down) (\d)+/;
            const commands = text.split('\n').map(c => re.exec(c));
            let horizontal = 0;
            let depth = 0;
            for (let c of commands) {
                switch (c[1]) {
                    case 'forward':
                        horizontal += parseInt(c[2]);
                        break;
                    case 'up':
                        depth -= parseInt(c[2]);
                        break;
                    case 'down':
                        depth += parseInt(c[2]);
                        break;
                    default:
                }
            }
            setMul(horizontal * depth);
            horizontal = 0;
            depth = 0;
            let aim = 0;
            for (let c of commands) {
                console.log(c[1], c[2]);
                switch (c[1]) {
                    case 'forward':
                        horizontal += parseInt(c[2]);
                        depth += aim * parseInt(c[2]);
                        break;
                    case 'up':
                        aim -= parseInt(c[2]);
                        break;
                    case 'down':
                        aim += parseInt(c[2]);
                        break;
                    default:
                }
            }
            setAim(horizontal * depth);
        }, setError, setLoaded);
    }, []);

    return renderResults(error, loaded, title, () => {
       return (
           <>
               <p>Final horizontal position times final depth: <strong>{mul}</strong></p>
               <p>Final horizontal position times final depth (with aim): <strong>{aim}</strong></p>
           </>
       );
    });
}

export default Day2;
