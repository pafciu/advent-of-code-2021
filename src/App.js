import './App.css';
import Day1 from './Day1';
import Day2 from './Day2';
import Day3 from "./Day3";
import Day4 from "./Day4";

const App = () => {
    return (
        <>
            <h1>Advent of Code 2021</h1>
            <Day1 title="Sonar Sweep" />
            <Day2 title="Dive!" />
            <Day3 title="Binary Diagnostic" />
            <Day4 title="Giant Squid" />
        </>
    );
}

export default App;
