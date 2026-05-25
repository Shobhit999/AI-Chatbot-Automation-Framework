const fs = require('fs');

async function takeScreenshot(
    driver,
    fileName
) {

    let image =
        await driver.takeScreenshot();

    fs.writeFileSync(
        `screenshots/${fileName}.png`,
        image,
        'base64'
    );
}

module.exports = takeScreenshot;