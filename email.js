const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '137443933748-nvtqhtv90pm099n64cj8opfjkbm5bn9s.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKKEN = '1//04MyGLZaOlAk3CgYIARAAGAQSNwF-L9IriNBdz36xsuulcpr9h6CnArgbVAtenWQhWfMQp_uwIAyhGn6Su_5e54S13YiSX4Whc6U'



let info = require('./answers.json');
console.log(info, "info")
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKKEN });

async function sendMail() {
    try {
        //const accessToken = await oAuth2Client.getAccessToken();
        const accessToken = 'ya29.a0Aa4xrXMlS-uVVFxRlfFy36t-6TCL0dFOPkPEblXDj-rmmmK2fNL6aYXA1JxhwKVGZ-bcJkWLZKW-dMYV_dE5pqCMykiH4C4vL9g9--TNf8vv3OX1qlrmFdPSHFG5dNZb5-ecXtxBzEDtP_kbdd2pu-YCqWPhaCgYKATASARMSFQEjDvL9nfGW49ALYLtt8wUboGR1pA0163'
        //refresh tokken
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'asufecpc@gmail.com',
                client_Id: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKKEN,
                accessToken: accessToken,
                tls: {
                    rejectUnauthorized: false
                },
            }
        });
        const gMeet = 'https://meet.google.com/edc-fsoe-qkz'
        let hrs = 8;
        let mins = 0;
        
        let non_tech = ["Director", "Multimedia", "Media Design", "Event Manager"];
        let tech = ["Mentor", "Instructor"]
        // for (x of info) {
        //     let t = false;
        //     let com = x.committe;
        //     for (s of tech) {
        //         if (com.includes(s))
        //             t = true;
        //     }
        //     if (t) {
        //         const mailOptions = {
        //             from: '<asufecpc@gmail.com>',
        //             to: `${x.email}`,
        //             //to: "mohammed84farouk@gmail.com",

        //             subject: 'ASUFECPC Recruitment',
        //             text: `Hello, Dear ${x.Name} !👋
        // Thanks for replying to us with your information about willing to join 
        // the technical team in ASUFE CPC 2022/23. 💻
        

        // you're committed to participating in the following two contests for filtration:

        // LEVEL 1 contest : https://vjudge.net/contest/521036  on Sunday 16th at 8:00 pm 🥊
        // LEVEL 2 contest : https://vjudge.net/contest/521040  on Monday 17th at 8:00 pm 🥊🥊
        
        
        // Good Luck, hero! 🦸🦸‍♀️
        
        // Regards,
        // ASUFE CPC Community 💌
        // Please feel free to contact us if you have any inquiries
        // Our Page link: https://www.facebook.com/ASUFECPC/`,
        //             //html :''
        //             //console.log(x);

        //         };
        //         const result = await transport.sendMail(mailOptions);
        //         console.log(result);

        //     }

        // }


        for (x of info) {
            let nt = false;
            let com = x.committe;
            for (s of non_tech) {
                if (com.includes(s))
                    nt = true;
            }
            if (nt) {
                const mailOptions = {
                    from: '<asufecpc@gmail.com>',
                    to: `${x.email}`,
                    //to: "oaayoubb@gmail.com",
                    subject: 'ASUFECPC Recruitment',
                    text: `In response to your request,
                    
                    we decided to let you choose your interview time slots. 🕑

                    So, fill in your preferred time slot via this sheet, and please be on time.
                    
                    https://docs.google.com/spreadsheets/d/1xW5Ds6y4Ygf2pLP7KKJ_9P3NPfhN3kFSW7SrzQ8o_Rs/edit?usp=sharing
                    
                    In case you didn't submit your name, your interview time will be declared randomly.
                    
                    Regards,
                    ASUFE CPC Community
                    Please feel free to contact us if you have any questions 🍀
                    Our Page link: https://www.facebook.com/ASUFECPC/`, 

                };
                const result = await transport.sendMail(mailOptions);
                console.log(result);


            }

        }


        





    }
    catch (err) {
        console.error(err, "error ....")
    }
}

sendMail().then(console.log("we sucesddeds"));