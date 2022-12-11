import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';


const App = () => {
    return (
        <div>
            <HookSwitcher/>
        </div>
    )
};

const HookSwitcher = () => {
    const [color, setColor] = useState('white');

    const [fontSize, setFontSize] = useState(14);


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                padding: '10px',
                backgroundColor: color,
                fontSize: `${fontSize}px`,
                display: 'flex',
                flexDirection: 'row'
            }}>
                Приветики!!!</div>

            <button
                onClick={() => setColor('black')}
            >Dark
            <
          /button>
            <button
                onClick={() => setColor('white')}
            >Light
            <
          /button>
            <button
                onClick={()=> setFontSize((s)=> s + 2)}>
                +
            </button>
            <button
                onClick={()=> setFontSize((s)=> s - 2)}>
                -
            </button>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App/>
);


