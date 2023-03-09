class MailOptions{
    constructor(
        to,
        subject,
        html
    ){
        this.from = "eticaretangular@hotmail.com",
        this.to = to,
        this.subject = subject,
        this.html = html
    }
}

module.exports = MailOptions;