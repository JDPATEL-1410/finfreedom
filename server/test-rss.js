const Parser = require('rss-parser');
const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'mediaContent', { keepArray: true }],
            ['media:thumbnail', 'mediaThumbnail'],
            ['enclosure', 'enclosure'],
            ['image', 'image'],
        ],
    },
});

(async () => {
    try {
        const feed = await parser.parseURL('https://economictimes.indiatimes.com/mf/rssfeedsdefault.cms');
        console.log('Feed Title:', feed.title);
        if (feed.items.length > 0) {
            console.log('First Item keys:', Object.keys(feed.items[0]));
            console.log('First Item Title:', feed.items[0].title);
            console.log('First Item Content:', feed.items[0].content ? feed.items[0].content.substring(0, 200) : 'None');
            console.log('First Item mediaContent:', feed.items[0].mediaContent);
            console.log('First Item mediaThumbnail:', feed.items[0].mediaThumbnail);
            console.log('First Item enclosure:', feed.items[0].enclosure);
        }
    } catch (e) {
        console.error(e);
    }
})();
