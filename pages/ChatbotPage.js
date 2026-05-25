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

        // Wait until typing disappears
        await this.driver.wait(
            async () => {

                let messages =
                    await this.driver.findElements(
                        this.botMessages
                    );

                let lastText =
                    await messages[
                        messages.length - 1
                    ].getText();

                return !lastText.includes(
                    "Bot is typing..."
                );

            },

            10000
        );

        // Get latest messages
        let messages =
            await this.driver.findElements(
                this.botMessages
            );

        // Return latest bot response
        return await messages[
            messages.length - 1
        ].getText();

    }

}

module.exports = ChatbotPage;