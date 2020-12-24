"use strict";


class Alkalinity {
    constructor(reading) {
        this.reading = reading,
            this.checkLevel = () => {
                let alertVal;
                if (this.reading < 90) {
                    return alertVal = "Low";
                } else if (this.reading > 110) {
                    return alertVal = "High";
                } else {
                    return alertVal = "Green";
                }
            },
            this.generateReading = () => {
                return (Math.random() * (125 - 75) + 75).toFixed(1);
            };
    }
};


class PH {
    constructor(reading) {
        this.reading = reading,
            this.checkLevel = () => {
                let alertVal;
                if (this.reading < 7.4) {
                    return alertVal = "Low";
                } else if (this.reading > 7.6) {
                    return alertVal = "High";
                } else {
                    return alertVal = "Green";
                }
            },
            this.generateReading = () => {
                return (Math.random() * (8 - 7) + 7).toFixed(1);
            };
    }
};


class Chlorine {
    constructor(reading) {
        this.reading = reading,
            this.checkLevel = () => {
                let alertVal;
                if (this.reading <= 1) {
                    return alertVal = "Low";
                } else if (this.reading > 3) {
                    return alertVal = "High";
                } else {
                    return alertVal = "Green";
                }
            },
            this.generateReading = () => {
                return (Math.random() * 4).toFixed(1);
            };
    }
};

module.exports = {
    Alkalinity: Alkalinity,
    PH: PH,
    Chlorine: Chlorine
};