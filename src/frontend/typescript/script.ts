import { DynamicCounter } from "./components/DynamicCounter.js";

const COUNT_ELEMENT = document.querySelector('.dynamic-counter');
if(COUNT_ELEMENT instanceof HTMLElement) {
    const DYNAMIC_COUNTER = new DynamicCounter(COUNT_ELEMENT);
    DYNAMIC_COUNTER.start();
}
