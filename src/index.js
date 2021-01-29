import _ from 'lodash';
import LoomSE from 'loomse';
import text from './story-script.json';
import './style.css';

function component() {
    const element = document.createElement('div');
    element.setAttribute("id", "loom-se")
    element.innerHTML = _.join(['Hello', 'LoomSE'], ' ');

    const parent = element;
    const loomSE = new LoomSE(parent, {
        width: 800,
        height: 600
    });
    loomSE.startScript(text);

    loomSE.el.addEventListener('director:sceneevent', ({ detail }) => {
        const { group, action, payload } = detail;

        if (action !== 'start') {
            const contentContainerElement = document.querySelector('#content-container');
            contentContainerElement.remove();
            return;
        }

        if(group === 'skipTo') {
            loomSE.skipTo(payload.nextScene);
        }

        if(group === 'showContent') {
            const contentElement = document.createElement('div');
            contentElement.id = "content";
            contentElement.classList.add("text-content");

            const textContent = document.createTextNode(payload.text);
            contentElement.appendChild(textContent);

            const contentContainerElement = document.createElement('div');
            contentContainerElement.id = "content-container";
            contentContainerElement.appendChild(contentElement);

            parent.appendChild(contentContainerElement);
            console.log(payload);
        }
    });

    return element;
}

document.body.appendChild(component());
