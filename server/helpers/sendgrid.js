const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
); // JGN lUPA MASUKIN ENV

module.exports = {
  sendgrid(email, password) {
    const msg = {
      to: `${email}`,
      from: "noreply.nbainfo@mail.com",
      subject: "Thank you for register in NBA INFO.",
      html: `
              Congratulations you've created an account in NBA INFO ! </br>
              </br>
              </br>
             Here is your password, please don't share it to anyone.
              </br>
              </br>
              PASSWORD : </br>
              </br>
                ${password}
              </br>
              </br>
              </br>
              <strong>NBA INFO</strong>`
    };
    return sgMail.send(msg);
  }
};
