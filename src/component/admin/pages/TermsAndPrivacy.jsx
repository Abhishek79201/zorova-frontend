import React, { useState } from 'react';

const TermsAndPrivacy = () => {
    const [terms, setTerms] = useState(`
        Terms and Conditions
        Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website.

        1. Acceptance of Terms
        By accessing this website, you are agreeing to be bound by these website Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.

        2. Privacy Policy
        Our Privacy Policy outlines how we collect, use, and protect your personal information.
    `);
    const [privacyPolicy, setPrivacyPolicy] = useState(`
        Privacy Policy
        Your privacy is important to us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information.

        Information Collection
        We may collect personal information, such as your name, email address, and contact details when you interact with our website.

        Information Usage
        We may use your information to improve our services and send you relevant updates and offers.
    `);

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Add Terms and Privacy Policy</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-white">
                            Terms and Condition
                        </div>
                        <div className="card-body">
                            <textarea
                                id="termsTextarea"
                                className="form-control"
                                value={terms}
                                onChange={(e) => setTerms(e.target.value)}
                                style={{ height: '300px' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-white">
                            Privacy Policy
                        </div>
                        <div className="card-body">
                            <textarea
                                id="privacyPolicyTextarea"
                                className="form-control"
                                value={privacyPolicy}
                                onChange={(e) => setPrivacyPolicy(e.target.value)}
                                style={{ height: '300px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndPrivacy;
