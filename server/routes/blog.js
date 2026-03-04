const express = require('express');
const router = express.Router();
const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'mediaContent', { keepArray: true }],
            ['enclosure', 'enclosure'],
            ['image', 'image'],
        ],
    },
});

// Economic Times Mutual Fund RSS Feed
const ET_MF_RSS = 'https://economictimes.indiatimes.com/mf/rssfeedsdefault.cms';

router.get('/latest', async (req, res) => {
    try {
        const feed = await parser.parseURL(ET_MF_RSS);

        // Transform feed to a cleaner format
        const posts = feed.items.map(item => {
            let imageUrl = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'; // Default fallback

            // Try to extract MSID from the link to build the ET thumbnail URL
            // link looks like: .../articleshow/128693792.cms
            const msidMatch = (item.link || '').match(/articleshow\/(\d+)\.cms/);
            if (msidMatch && msidMatch[1]) {
                imageUrl = `https://economictimes.indiatimes.com/thumb/msid-${msidMatch[1]},width-800,resizemode-4/img.jpg`;
            } else if (item.mediaContent && item.mediaContent[0] && item.mediaContent[0].$) {
                imageUrl = item.mediaContent[0].$.url;
            } else if (item.enclosure && item.enclosure.url) {
                imageUrl = item.enclosure.url;
            } else if (item.image) {
                imageUrl = item.image;
            } else {
                // Try extracting from content if it's an img tag
                const imgMatch = (item.content || '').match(/<img[^>]+src="([^">]+)"/);
                if (imgMatch && imgMatch[1]) {
                    imageUrl = imgMatch[1];
                }
            }

            return {
                id: item.guid || item.link,
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                content: item.contentSnippet || item.content,
                creator: item.creator || 'Economic Times',
                imageUrl: imageUrl
            };
        });

        res.json(posts);
    } catch (error) {
        console.error('Error fetching ET RSS feed:', error);
        res.status(500).json({ error: 'Failed to fetch blog feed' });
    }
});

module.exports = router;
