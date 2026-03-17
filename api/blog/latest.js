// Vercel Serverless Function - /api/blog/latest
// Self-contained: no require(), uses native fetch + simple XML parsing

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const ET_MF_RSS = 'https://economictimes.indiatimes.com/mf/rssfeedsdefault.cms';
    const FALLBACK_IMG = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80';

    try {
        const response = await fetch(ET_MF_RSS, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; FinFreedom33-Bot/1.0)',
                'Accept': 'application/rss+xml, application/xml, text/xml, */*',
            },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            throw new Error(`RSS fetch failed: ${response.status}`);
        }

        const xmlText = await response.text();

        // Parse items from RSS XML
        const items = [];
        const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/g) || [];

        for (const itemXml of itemMatches.slice(0, 10)) {
            const get = (tag) => {
                const m = itemXml.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i'));
                return m ? m[1].trim() : '';
            };
            const getAttr = (tag, attr) => {
                const m = itemXml.match(new RegExp(`<${tag}[^>]+${attr}="([^"]+)"`, 'i'));
                return m ? m[1] : '';
            };

            const title = get('title');
            const link = get('link') || getAttr('link', 'href');
            const pubDate = get('pubDate');
            const guid = get('guid') || link;
            const description = get('description');
            const contentEncoded = get('content:encoded') || get('content');

            // Image extraction strategy (multiple fallbacks)
            let imageUrl = FALLBACK_IMG;

            // 1. ET's own URL pattern — extract MSID from article link → build thumb URL
            //    ET article link: /articleshow/128693792.cms  OR  /mf/.../articleshow/128693792.cms
            const msidMatch = link.match(/articleshow\/(\d+)\.cms/);
            if (msidMatch) {
                imageUrl = `https://economictimes.indiatimes.com/thumb/msid-${msidMatch[1]},width-800,resizemode-4/img.jpg`;
            }

            // 2. media:content or media:thumbnail
            if (imageUrl === FALLBACK_IMG) {
                const mediaUrl = getAttr('media:content', 'url') || getAttr('media:thumbnail', 'url');
                if (mediaUrl) imageUrl = mediaUrl;
            }

            // 3. enclosure
            if (imageUrl === FALLBACK_IMG) {
                const encUrl = getAttr('enclosure', 'url');
                if (encUrl) imageUrl = encUrl;
            }

            // 4. <img> tag inside description or content
            if (imageUrl === FALLBACK_IMG) {
                const combined = description + contentEncoded;
                const imgMatch = combined.match(/<img[^>]+src=["']([^"']+)["']/i);
                if (imgMatch && imgMatch[1] && !imgMatch[1].includes('1x1')) {
                    imageUrl = imgMatch[1];
                }
            }

            if (title && link) {
                items.push({
                    id: guid,
                    title,
                    link: link.startsWith('http') ? link : `https://economictimes.indiatimes.com${link}`,
                    pubDate,
                    content: description.replace(/<[^>]+>/g, '').slice(0, 200),
                    creator: 'Economic Times',
                    imageUrl,
                });
            }
        }

        // Cache for 6 hours (so content refreshes ~4 times a day)
        res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=3600');
        return res.status(200).json(items);

    } catch (error) {
        console.error('ET RSS Error:', error.message);
        return res.status(500).json({ error: 'Failed to fetch RSS feed', message: error.message });
    }
}
