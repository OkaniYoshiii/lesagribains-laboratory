export { DynamicCounter };
class DynamicCounter {
    #element;
    #updatesPerSecond = 20;
    #animationDurationInMs = 1000;
    #count = 0;
    constructor(element) {
        this.#element = element;
    }
    start() {
        const COUNT_STR = this.#element.textContent;
        if (COUNT_STR === null || Number.isNaN(Number(COUNT_STR)))
            throw new Error('Cannot use a counter with a value which is not of type "number"');
        const COUNT = Number(COUNT_STR);
        const INTERVAL = 1 / this.#updatesPerSecond * 1000;
        const COUNT_SCALE = COUNT / this.#animationDurationInMs * INTERVAL;
        this.#loop((requestID) => {
            this.#count += COUNT_SCALE;
            this.#element.textContent = Math.ceil(this.#count).toString();
            if (this.#count >= COUNT) {
                this.#element.textContent = COUNT.toString();
                window.cancelAnimationFrame(requestID);
            }
        }, INTERVAL);
    }
    #loop(callback, interval) {
        let start;
        let elapsedTimeSum = 0;
        let requestID;
        function update(timestamp, callback, requestID) {
            if (start === undefined) {
                start = timestamp;
            }
            const ELLAPSED_TIME = timestamp - start;
            elapsedTimeSum += ELLAPSED_TIME;
            start = timestamp;
            requestID = requestAnimationFrame((timestamp) => update(timestamp, callback, requestID));
            if (elapsedTimeSum > interval) {
                // Code goes here
                callback(requestID);
                elapsedTimeSum = 0;
            }
        }
        requestID = requestAnimationFrame((timestamp) => update(timestamp, callback, requestID));
    }
}
