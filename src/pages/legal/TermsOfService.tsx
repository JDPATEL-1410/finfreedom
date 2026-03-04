import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const img = getImage('about');

export default function TermsOfService() {
    return (
        <>
            <Helmet>
                <title>Terms of Service | FinFreedom33 LLP</title>
            </Helmet>
            <PageHeader
                title="Terms of Service"
                subtitle="The rules and guidelines for using our website and services"
                heroUrl={img.heroUrl}
                heroAlt="Terms of service"
                breadcrumbs={[{ label: 'Terms of Service' }]}
            />
            <section className="section bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-navy max-w-none text-gray-600">
                        <h2 className="text-navy">1. Acceptance of Terms</h2>
                        <p>By accessing or using the FinFreedom33 website and services, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our site.</p>

                        <h2 className="text-navy">2. Service Description</h2>
                        <p>FinFreedom33 LLP is an AMFI registered Mutual Fund Distributor. We provide investment facilitation and financial planning services. We are not a SEBI registered Investment Advisor unless explicitly stated.</p>

                        <h2 className="text-navy">3. User Responsibilities</h2>
                        <p>You are responsible for providing accurate information and maintaining the confidentiality of any account credentials. You agree to use our services only for lawful purposes.</p>

                        <h2 className="text-navy">4. Limitation of Liability</h2>
                        <p>Investments are subject to market risks. FinFreedom33 is not liable for any losses incurred based on the use of our website or services. Always read scheme related documents carefully.</p>

                        <h2 className="text-navy">5. Intellectual Property</h2>
                        <p>All content on this website, including logos, text, and graphics, is the property of FinFreedom33 LLP and protected by intellectual property laws.</p>
                    </div>
                </div>
            </section>
        </>
    );
}
