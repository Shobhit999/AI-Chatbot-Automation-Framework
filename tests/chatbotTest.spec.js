const { Builder }
    = require('selenium-webdriver');

require('chromedriver');
require('geckodriver');
require('edgedriver');

const assert = require('assert');

const ChatbotPage =
    require('../pages/ChatbotPage');

const takeScreenshot =
    require('../utils/ScreenshotUtil');

const browser = process.env.BROWSER || 'chrome';

describe('Chatbot Automation Tests', function () {

    this.timeout(30000);

    let driver;

    let chatbot;

    before(async () => {

        driver =
            await new Builder()
                .forBrowser(browser)
                .build();

        chatbot =
            new ChatbotPage(driver);

        await driver.get(
            'http://127.0.0.1:5500/index.html'
        );
    });

    after(async () => {

        await driver.sleep(5000);

        await driver.quit();
    });

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
            `Validate chatbot response for ${test.input}`,
            async () => {

            await chatbot.enterMessage(
                test.input
            );

            await chatbot.clickSend();


            let response =
                await chatbot.getLastBotMessage();

            console.log(
                "Bot Response:",
                response
            );

            try {

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
            }
        });
    });
});