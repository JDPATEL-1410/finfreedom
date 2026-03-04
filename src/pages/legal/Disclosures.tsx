import { Helmet } from 'react-helmet-async';
import PageHeader from '../../components/layout/PageHeader';
import { getImage } from '../../data/images';

const img = getImage('about');

export default function Disclosures() {
    return (
        <>
            <Helmet>
                <title>Disclosures & Regulatory Info | FinFreedom33 LLP</title>
            </Helmet>
            <PageHeader
                title="Regulatory Disclosures"
                subtitle="Important legal and regulatory information regarding our status and services"
                heroUrl={img.heroUrl}
                heroAlt="Regulatory info"
                breadcrumbs={[{ label: 'Disclosures' }]}
            />
            <section className="section bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-navy max-w-none text-gray-600">
                        <h2 className="text-navy">1. AMFI Registration</h2>
                        <p>FinFreedom33 LLP is an AMFI-registered Mutual Fund Distributor with ARN Number: [ARN No]. We earn commissions from Asset Management Companies (AMCs) for the mutual fund schemes we facilitate.</p>

                        <h2 className="text-navy">2. Mutual Fund Risk Disclosure</h2>
                        <p className="font-bold text-red-600">Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing.</p>
                        <p>The performance of any mutual fund scheme is not guaranteed and past performance is not indicative of future results.</p>

                        <h2 className="text-navy">3. Conflict of Interest</h2>
                        <p>While we strive to provide unbiased recommendations, as a distributor, we receive commissions from fund houses. We maintain a strict policy of recommending funds based on their merit and suitability for the client's risk profile.</p>

                        <h2 className="text-navy">4. Compliance Information</h2>
                        <p>We comply with all regulatory requirements set by SEBI, AMFI, and other relevant authorities. For any grievances, please contact our compliance officer at contact@finfreedom33.com.</p>
                    </div>

                    <div className="mt-12 p-8 bg-surface rounded-3xl border border-gray-100">
                        <h3 className="text-navy font-bold mb-4">Brokerage Disclosure</h3>
                        <p className="text-sm text-gray-500 mb-4">In accordance with SEBI Circular, following are the details of the commission/brokerage earned by FinFreedom33:</p>
                        <table className="w-full text-xs text-left">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-2">Category</th>
                                    <th className="py-2">Trailing Commission Range</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2 text-navy font-medium">Equity Funds</td>
                                    <td className="py-2 text-gray-500">0.50% - 1.25% p.a.</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2 text-navy font-medium">Debt Funds</td>
                                    <td className="py-2 text-gray-500">0.10% - 0.75% p.a.</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-2 text-navy font-medium">Hybrid Funds</td>
                                    <td className="py-2 text-gray-500">0.40% - 1.00% p.a.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
