function createElement(type: string): HTMLElement {
    return document.createElement(type);
}

function createChild(parent: HTMLElement, type: string): HTMLElement {
    const element = document.createElement(type);
    parent.appendChild(element);
    return element;
}

function createChildWithText(parent: HTMLElement, type: string, text: string): HTMLElement {
    const child = createChild(parent, type);
    child.textContent = text;
    return child;
}

export default {
    getById: (id: string): HTMLElement => {
        return document.getElementById(id);
    },
    getByClass: (className: string): Element[] => {
        return Array.from(document.getElementsByClassName(className));
    },
    query: (query: string): Element[] => {
        return Array.from(document.querySelectorAll(query));
    },
    getChildren: (element: Element): Element[] => {
        return Array.from(element.children);
    },
    createElement,
    createChild,
    createChildWithText
}
