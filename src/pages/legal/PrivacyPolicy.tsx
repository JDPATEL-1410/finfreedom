import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const img = getImage('about');

export default function PrivacyPolicy() {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | FinFreedom33 LLP</title>
            </Helmet>
            <PageHeader
                title="Privacy Policy"
                subtitle="How we protect and manage your personal and financial information"
                heroUrl={img.heroUrl}
                heroAlt="Legal policy"
                breadcrumbs={[{ label: 'Privacy Policy' }]}
            />
            <section className="section bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-navy max-w-none text-gray-600">
                        <h2 className="text-navy">1. Information Collection</h2>
                        <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, financial goals, and other details provided during consultations.</p>

                        <h2 className="text-navy">2. Use of Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, including personalization of financial advice, processing transactions, and communicating with you about updates or promotional offers.</p>

                        <h2 className="text-navy">3. Data Security</h2>
                        <p>We implement industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

                        <h2 className="text-navy">4. Sharing of Information</h2>
                        <p>We do not share your personal information with third parties except as necessary to provide our services (e.g., with AMCs for mutual fund processing) or as required by law.</p>

                        <h2 className="text-navy">5. Your Rights</h2>
                        <p>You have the right to access, correct, or delete your personal information. Please contact us at contact@finfreedom33.com for any such requests.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
