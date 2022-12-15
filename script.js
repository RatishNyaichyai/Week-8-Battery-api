const batteryIndicator = document.getElementById('batteryIndicator');
const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");

const batteryIndicatorBefore = window.getComputedStyle(batteryIndicator, '::before');

navigator.getBattery()
    .then((battery) => {
        function updateAllBatteryInfo() {
            updateChargingInfo();
            updateLevelInfo();
        }
        updateAllBatteryInfo();

        //When the charging status changes
        battery.addEventListener("chargingchange", () => {
            updateAllBatteryInfo();
        });

        //When the Battery Level Changes
        battery.addEventListener("levelchange", () => {
            updateAllBatteryInfo();
        });

        function updateChargingInfo() {
            if (battery.charging) {
                charge.classList.add("active");
            } else {
                charge.classList.remove("active");
            }
        }

        function updateLevelInfo() {
            let batteryLevel = `${parseInt(Math.floor(battery.level * 100))}%`;
            charge.style.width = batteryLevel;
            chargeLevel.textContent = batteryLevel;
        }
    });

const mql = matchMedia('(max-width: 375px)');

mql.onchange = e => {
    if (e.matches) {

        batteryIndicator.style = `
            transform: rotate(-90deg)
        `
        chargeLevel.style = `
               transform: rotate(90deg)
           `
    } else {
        batteryIndicator.style = `
            transform: rotate(0deg)
        `
        chargeLevel.style = `
            tranform: rotate(0deg)
        `

    }


}

