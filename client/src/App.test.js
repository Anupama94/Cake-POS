// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
//
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });


// test('Fake Test', () => {
//     expect(true).toBeTruthy();
// })

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<App debug />);

       // expect(component).toMatchSnapshot();
        expect(component).toMatchSnapshot();
    });

    it('should render a anchor tag', () => {
        const wrapper = shallow(
            <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
            >
            Learn React
        </a>
        );

        // expect(component).toMatchSnapshot();
        expect(wrapper).toMatchSnapshot();
    });
});