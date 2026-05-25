const {
    By,
    until
} = require('selenium-webdriver');

class ChatbotPage {

    constructor(driver) {

        this.driver = driver;

        this.inputBox =
            By.id('user-input');

        this.sendButton =
            By.id('send-btn');

        this.botMessages =
            By.className('bot-message');
    }

    async enterMessage(message) {

        let input =
            await this.driver.findElement(
                this.inputBox
            );

        await input.sendKeys(message);
    }

    async clickSend() {

        let button =
            await this.driver.findElement(
                this.sendButton
            );

        await button.click();
    }

    async getLastBotMessage() {

    // Wait until bot message appears
    await this.driver.wait(

        until.elementLocated(
            this.botMessages
        ),

        10000
    );

    let messages =
        await this.driver.findElements(
            this.botMessages
        );

    return await messages[
        messages.length - 1
    ].getText();
    }

}

module.exports = ChatbotPage;