class Notifier{

    //new address can be set in a constructor instead
    updateAddressNotice(newAddress){
        return (
        {
            from: {value: [
                    {
                        name: 'Email updated to: ' + newAddress,
                        address: 'internal@MinusMail.com'
                    }],
                   text :'internal@MinusMail.com',
                  },
           
            subject: 'new email address',
            text: 'You have successfully changed your email to: ' + newAddress})
        
    }
    
    getNotice(noticeRequested){
        const Notices = {
            defaultNotice : {
                    from: {value: [
                            {
                                name: 'notification',
                                address: 'tips@MinusMail.com'
                            }],
                           text :'tips@MinusMail.com',
                          },

                    subject: 'How to change your temporary email address',
                    text: 'Your current email address is default@MinusMail.com\nIn the toolbar above you can click the change link next to your email to update it'} ,

           welcomeNotice : {
                    from: {value: [
                            {
                                name: 'Welcome To Temp Mail',
                                address: 'greeter@MinusMail.com'
                            }],
                           text :'greeter@MinusMail.com',
                          },

                    subject: 'Welcome',
                    text: 'Use the inbox on the left to read your emails'},
            supportNotice : {
                    from: {value: [
                            {
                                name: 'Support Temp Mail',
                                address: 'sponsors@MinusMail.com'
                            }],
                           text :'sponsors@MinusMail.com',
                          },

                    subject: 'Support our sponsors',
                    text: 'Take a look at our sponsors\nSponsor 1 WOW\nSponsor 2 Even Better!\nSponsor 3 Gotta click this\n This is a one time notice. We won\'t fill your inbox up with anything else'},
            updateAddressNotice : {
                    from: {value: [
                            {
                                name: 'Email updated',
                                address: 'internal@MinusMail.com'
                            }],
                           text :'internal@MinusMail.com',
                          },

                    subject: 'new email address',
                    text: 'You have successfully changed your email'},
            deleteNotice : {
                    from: {text :'internal@MinusMail.com'},
                    subject: 'Email Deleted',
                    text: 'Email deleted.'}
        }
        return Notices[noticeRequested]
    }
}

export default Notifier