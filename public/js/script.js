import { DynamicCounter } from "./components/DynamicCounter.js";
const COUNTER_ELEMENTS = document.querySelectorAll('.dynamic-counter');
COUNTER_ELEMENTS.forEach((counterElement) => {
    if (counterElement instanceof HTMLElement) {
        const DYNAMIC_COUNTER = new DynamicCounter(counterElement);
        DYNAMIC_COUNTER.start();
    }
});
