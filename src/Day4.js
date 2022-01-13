import {useEffect, useState} from "react";
import processData from "./processData";
import renderResults from "./renderResults";

export class BingoBoard {

    #numbers;
    #indices;
    #marks;
    #lines;

    constructor(rows) {
        this.#numbers = rows.map(r => r.split(' ').filter(s => s !== '').map(n => parseInt(n))).reduce((acc, a) => acc.concat(a), []);
        this.#indices = new Map();
        this.#numbers.forEach((e, i) => this.#indices.set(e, i));
        this.#marks = new Array(25).fill(' ');
        this.#lines = [
            [0, 1, 2, 3, 4],
            [5, 6, 7, 8, 9],
            [10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19],
            [20, 21, 22, 23, 24],
            [0, 5, 10, 15, 20],
            [1, 6, 11, 16, 21],
            [2, 7, 12, 17, 22],
            [3, 8, 13, 18, 23],
            [4, 9, 14, 19, 24]
        ];
    }

    mark(n) {
        if (this.#indices.has(n)) {
            this.#marks[this.#indices.get(n)] = 'x';
        }
    }

    win() {
        return this.#lines.some(indices => indices.map(i => this.#marks[i]).every(m => m === 'x'));
    }

    unmarked() {
        return this.#numbers.filter((e, i) => this.#marks[i] !== 'x').reduce((acc, n) => acc + n);
    }

    dump() {
        console.log(this.#marks);
    }
};

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
