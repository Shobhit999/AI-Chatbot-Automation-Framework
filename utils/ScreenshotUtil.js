const fs = require('fs');

async function takeScreenshot(
    driver,
    fileName
) {

    // Create screenshots folder
    // if not exists
    if (
        !fs.existsSync(
            'screenshots'
        )
    ) {

        fs.mkdirSync(
            'screenshots'
        );
    }

    // Capture screenshot
    let image =
        await driver.takeScreenshot();

    // Save screenshot
    fs.writeFileSync(
        `screenshots/${fileName}.png`,
        image,
        'base64'
    );
}

module.exports =
    takeScreenshot;