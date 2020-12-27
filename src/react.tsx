import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Index = () => {
    return <div>Hello React!</div>;
};

function bounceOut () {
    ReactDOM.render(<Index />, document.getElementById('app'));

}

window.addEventListener('DOMContentLoaded', bounceOut, false);

// npx tsc