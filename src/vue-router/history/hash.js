import { History } from "./base";




class HashHistory extends History{
    constructor(router) {
        super(router);
        ensureSlash()
    }

    getCurrentLocation() {
        return getLocation();
    }

    setupListener() {
        window.addEventListener("hashchange", () => {
            this.transitionTo(getLocation());
        })
    }

    push(location) {
        // 先去获取最新route和currentRoute比较，然后再hash
        this.transitionTo(location, () => {
            window.location.hash = location;
        })
    }
}

const getLocation = () => window.location.hash.slice(1);


function ensureSlash() {
    if (!window.location.hash) window.location.hash = '/'
}

export default HashHistory;