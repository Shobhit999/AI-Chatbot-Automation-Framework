
const { Builder }
    = require('selenium-webdriver');

require('chromedriver');

const assert = require('assert');

const ChatbotPage =
    require('../pages/ChatbotPage');

const takeScreenshot =
    require('../utils/ScreenshotUtil');

const browser =
    process.env.BROWSER || 'chrome';


describe(
    'Chatbot Parallel Tests',
    function () {

    this.timeout(30000);

    const testCases = [

        {
            input: "hello",
            expected:
                "Hi, how can I help you?"
        },

        {
            input: "help",
            expected:
                "Available options"
        },

        {
            input: "payment",
            expected:
                "Payment support"
        },

        {
            input: "bye",
            expected:
                "Goodbye"
        }
    ];

    testCases.forEach((test) => {

        it(
            `Validate ${test.input}`,
            async () => {

            // New Browser Per Test
            let driver =
                await new Builder()
                    .forBrowser(browser)
                    .build();

            try {

                // Open chatbot
                await driver.get(
                    'https://amazing-chatbot.netlify.app/'
                );

                let chatbot =
                    new ChatbotPage(driver);

                // Enter Message
                await chatbot.enterMessage(
                    test.input
                );

                // Click Send
                await chatbot.clickSend();

                // Get Response
                let response =
                    await chatbot.getLastBotMessage();

                console.log(
                    `Response for ${test.input}:`,
                    response
                );

                // Validation
                assert.ok(
                    response.includes(
                        test.expected
                    )
                );

            } catch(error) {

                await takeScreenshot(
                    driver,
                    test.input
                );

                throw error;

            } finally {

                // Close Browser
                await driver.quit();
            }
        });
    });
});