import { Injectable } from '@nestjs/common';
const RSS = require('rss');

@Injectable()
export class RssService {


    public feed =  new RSS({
        title: 'Muj feed',
        description: 'Muj prvni rss feed.',
        feed_url: 'http://belligerator.cz:5015/api/feeds',
        site_url : 'http://belligerator.cz:5015',
    });

    private counter: number = 0;

    constructor() {
        this.addFeed();
        this.addFeed();
        this.addFeed();
    }

    public getFeed(response): any {
        var xml = this.feed.xml({indent: true});
        console.log(xml);
        response.send(xml);
    }

    public addFeed(): string {
        this.counter++;
        console.log('Adding feed - ' + this.counter);
        this.feed.item({
            title: 'Feed ' + this.counter,
            description : `<strong>Feed ${this.counter}</strong> popis`,
            url : 'http://belligerator.cz:5015/api/feeds/' + this.counter,
            guid : this.counter,
            date: new Date(),
        });
        return 'Adding feed - ' + this.counter;
    }

}
