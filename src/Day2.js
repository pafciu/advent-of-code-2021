import {useEffect, useState} from "react";

const Day2 = ({title}) => {
    const [mul, setMul] = useState(-1);
    const [aim, setAim] = useState(-1);
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/day2.txt')
            .then(res => res.text())
            .then(
                res => {
                    const re = /(forward|up|down) (\d)+/;
                    const commands = res.split('\n').map(c => re.exec(c));
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
                <p>Final horizontal position times final depth: <strong>{mul}</strong></p>
                <p>Final horizontal position times final depth (with aim): <strong>{aim}</strong></p>
            </>
        );
    }
}

export default Day2;
