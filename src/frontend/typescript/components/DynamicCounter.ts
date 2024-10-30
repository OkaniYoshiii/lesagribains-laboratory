export { DynamicCounter };

class DynamicCounter
{
    readonly #element : HTMLElement;
    readonly #updatesPerSecond : number = 20;
    readonly #animationDurationInMs : number = 1000;
    #count : number = 0;

    public constructor(element : HTMLElement)
    {
        this.#element = element;
    }

    start() : void
    {
        const COUNT_STR = this.#element.textContent?.trim().replaceAll(' ', '');

        if(COUNT_STR === null || Number.isNaN(Number(COUNT_STR))) throw new Error('Cannot use a counter with a value which is not of type "number"');

        const COUNT = Number(COUNT_STR);
        const INTERVAL = 1 / this.#updatesPerSecond * 1000;
        const COUNT_SCALE = COUNT / this.#animationDurationInMs * INTERVAL;

        this.#loop((requestID : number) => {
            this.#count += COUNT_SCALE;
            this.#element.textContent = Math.ceil(this.#count).toString();
            if(this.#count >= COUNT) {
                this.#element.textContent = COUNT.toLocaleString();
                window.cancelAnimationFrame(requestID);
            }
        }, INTERVAL);
    }

    #loop(callback : CallableFunction, interval : number)  : void
    {
        let start : number;
        let elapsedTimeSum = 0;
        let requestID : number;
        function update(timestamp : number, callback : CallableFunction, requestID : number) {
            if (start === undefined) {
                start = timestamp;
            }

            const ELLAPSED_TIME = timestamp - start
            elapsedTimeSum += ELLAPSED_TIME;
            start = timestamp;

            requestID = requestAnimationFrame((timestamp) => update(timestamp, callback, requestID));

            if(elapsedTimeSum > interval) {
                // Code goes here
                callback(requestID);

                elapsedTimeSum = 0;
            }

        }
        requestID = requestAnimationFrame((timestamp) => update(timestamp, callback, requestID));
    }
}