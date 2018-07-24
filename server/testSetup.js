const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

process.env.NODE_ENV = 'test';

require('babel-register')();

require.extensions['.css'] = function () { return null; };
require.extensions['.png'] = function () { return null; };
require.extensions['.jpg'] = function () { return null; };

var { JSDOM } = require('jsdom');

var exposedProperties = ['window', 'navigator', 'document'];

var { document } = (new JSDOM('')).window;

global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

documentRef = document; //eslint-disable-line no-undef
