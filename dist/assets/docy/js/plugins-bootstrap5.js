/*!
Mailchimp Ajax Submit
Vanilla JavaScript Plugin (Bootstrap 5 Compatible)
Author: Siddharth Doshi (Modified for Bootstrap 5)

Use:
===
ajaxChimp.init('form_id', options);

- Form should have one <input> element with attribute 'type=email'
- Form should have one label element with attribute 'for=email_input_id' (used to display error/success message)
- All options are optional.

Options:
=======
options = {
    language: 'en',
    callback: callbackFunction,
    url: 'http://blahblah.us1.list-manage.com/subscribe/post?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f'
}

Notes:
=====
To get the mailchimp JSONP url (undocumented), change 'post?' to 'post-json?' and add '&c=?' to the end.
For e.g. 'http://blahblah.us1.list-manage.com/subscribe/post-json?u=5afsdhfuhdsiufdba6f8802&id=4djhfdsh99f&c=?',
*/

(function () {
    'use strict';

    var ajaxChimp = {
        responses: {
            'You are sent to a welcome message and will be being sent our latest newsletters time to time'                                             : 0,
            'Please enter a value'                                                              : 1,
            'An email address must contain a single @'                                          : 2,
            'The domain portion of the email address is invalid (the portion after the @: )'    : 3,
            'The username portion of the email address is invalid (the portion before the @: )' : 4,
            'This email address looks fake or invalid. Please enter a real email address'       : 5
        },
        translations: {
            'en': null
        },
        init: function (selector, options) {
            var form = document.querySelector(selector);
            if (form) {
                this.setupForm(form, options);
            }
        },
        setupForm: function (form, options) {
            var email = form.querySelector('input[type=email]');
            var label = form.querySelector('label[for=' + email.id + ']');

            var settings = this.extend({
                'url': form.getAttribute('action'),
                'language': 'en'
            }, options);

            var url = settings.url.replace('/post?', '/post-json?').concat('&c=?');

            form.setAttribute('novalidate', 'true');
            email.setAttribute('name', 'EMAIL');

            var self = this;
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                self.handleSubmit(form, email, label, settings, url);
            });
        },
        handleSubmit: function (form, email, label, settings, url) {
            var msg;
            var self = this;

            function successCallback(resp) {
                if (resp.result === 'success') {
                    msg = 'You are sent to a welcome message and will be being sent our latest newsletters time to time.';
                    label.classList.remove('error');
                    label.classList.add('valid');
                    email.classList.remove('error');
                    email.classList.add('valid');
                } else {
                    email.classList.remove('valid');
                    email.classList.add('error');
                    label.classList.remove('valid');
                    label.classList.add('error');
                    var index = -1;
                    try {
                        var parts = resp.msg.split(' - ', 2);
                        if (parts[1] === undefined) {
                            msg = resp.msg;
                        } else {
                            var i = parseInt(parts[0], 10);
                            if (i.toString() === parts[0]) {
                                index = parts[0];
                                msg = parts[1];
                            } else {
                                index = -1;
                                msg = resp.msg;
                            }
                        }
                    }
                    catch (e) {
                        index = -1;
                        msg = resp.msg;
                    }
                }

                // Translate and display message
                if (
                    settings.language !== 'en'
                    && self.responses[msg] !== undefined
                    && self.translations
                    && self.translations[settings.language]
                    && self.translations[settings.language][self.responses[msg]]
                ) {
                    msg = self.translations[settings.language][self.responses[msg]];
                }

                label.textContent = msg;

                // Call callback if provided
                if (settings.callback) {
                    settings.callback(resp);
                }
            }

            // Create JSONP request
            var script = document.createElement('script');
            script.src = url + '&EMAIL=' + encodeURIComponent(email.value);
            
            script.onload = function () {
                document.body.removeChild(script);
            };
            
            script.onerror = function () {
                document.body.removeChild(script);
                successCallback({ result: 'error', msg: 'Network error occurred' });
            };

            document.body.appendChild(script);
        },
        extend: function (obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
            return obj3;
        }
    };

    // Make ajaxChimp available globally
    window.ajaxChimp = ajaxChimp;

    // Initialize forms when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        var forms = document.querySelectorAll('form[data-ajaxchimp]');
        forms.forEach(function (form) {
            var options = {};
            if (form.dataset.ajaxchimpOptions) {
                try {
                    options = JSON.parse(form.dataset.ajaxchimpOptions);
                } catch (e) {
                    console.warn('Invalid ajaxchimp options:', form.dataset.ajaxchimpOptions);
                }
            }
            ajaxChimp.init('#' + form.id, options);
        });
    });

})();
