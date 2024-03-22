const userFormValidation = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status_code: 400, message: 'Email and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ status_code: 400, message: 'Password must be at least 6 characters' });
    }

    next();
};

const resendMailValidation = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ status_code: 400, message: 'Email is required' });
    }

    next();

}

const businessAndBankingValidation = (req, res, next) => {
    switch (Number(req.query.step)) {
        case 1:
            const {
                businessName,
                contactName,
                employerId,
                title,
                websiteUrl,
                businessStreetAddress,
                aptSteBldg,
                zipCode,
                city,
                state,
                mobile
            } = req.body;

            // Define required fields
            const requiredBusinessFields = ['businessName', 'contactName', 'employerId', 'title', 'businessStreetAddress', 'zipCode', 'city', 'state', 'mobile'];

            // Validate required fields
            const missingBusinessField = requiredBusinessFields.find(field => !req.body[field]);
            if (missingBusinessField) {
                return res.status(400).json({ success_code: 400, message: `${missingBusinessField} field is required` });
            }

            // Define field types
            const businessFieldTypes = {
                businessName: 'string',
                contactName: 'string',
                employerId: 'string',
                title: 'string',
                businessStreetAddress: 'string',
                zipCode: 'string',
                city: 'string',
                state: 'string',
                mobile: 'string',
                websiteUrl: 'string',
                aptSteBldg: 'string'
            };

            // Validate field types
            for (const field of Object.keys(businessFieldTypes)) {
                if (req.body[field] && typeof req.body[field] !== businessFieldTypes[field]) {
                    return res.status(400).json({ success_code: 400, message: `Invalid ${field}` });
                }
            }

            next();
            break;

        case 2:
            const {
                bankingAccount,
                routingNumber,
                einNumber
            } = req.body;

            // Define required fields
            const requiredBankingFields = ['bankingAccount', 'routingNumber', 'einNumber'];

            // Validate required fields
            const missingBankingField = requiredBankingFields.find(field => !req.body[field]);
            if (missingBankingField) {
                return res.status(400).json({ success_code: 400, message: `${missingBankingField} field is required` });
            }

            // Define field types
            const bankingFieldTypes = {
                bankingAccount: 'string',
                routingNumber: 'string',
                einNumber: 'string'
            };

            // Validate field types
            for (const field of Object.keys(bankingFieldTypes)) {
                if (req.body[field] && typeof req.body[field] !== bankingFieldTypes[field]) {
                    return res.status(400).json({ success_code: 400, message: `Invalid ${field}` });
                }
            }

            next();
            break
    }
};

module.exports = { userFormValidation, resendMailValidation, businessAndBankingValidation };