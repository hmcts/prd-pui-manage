export default {
    idPrefix: 'tbc',
    name: 'sraNumber',
    header: "SRA number",
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'sraNumber',
            text: 'Enter SRA number',
            href: '/register/rsa-number',
        },
    ],
    groups: [
        {
            hiddenInput: {
                control: 'pageId',
                value: 'check',
            },
        },
        {
            input: {
                validators: ['required'],
                validationError: {
                    value: 'Enter RSA number',
                    controlId: 'sraNumber',
                },
                control: 'sraNumber',
                classes: '',
            },
        },
        {
            button: {
                control: 'createButton',
                value: 'Continue',
                type: 'submit',
                classes: '',
                onEvent: 'continue',
            },
        },
    ],
}